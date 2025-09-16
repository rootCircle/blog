---
title: bgit internals 
description: Struggling with Git? bgit is a new, FLOSS command-line tool for beginners that simplifies the Git workflow aimed for beginners. In this post we deep dive into how bgit works, and its underlying architecture. 
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:image
      content: https://www.myconfinedspace.com/wp-content/uploads/2017/06/Yellow-Crab.jpg
  - - meta
    - name: twitter:card
      content: summary_large_image
---

# How bgit works

In the first part of this series, we explored what `bgit` is and how its user-friendly, interactive approach helps simplify Git for beginners. Now, it's time to pop the hood.

If you're new to the project and want to understand its user-facing features and philosophy first, we highly recommend reading Part 1: **[bgit: One Command for Most of git](./bgit)**.

This post is for the curious developer, the aspiring contributor, or the Rust enthusiast who wants to understand how `bgit` works internally. We won't be covering user features here; instead, we'll dissect the engine that powers them. At its core, `bgit` is a workflow engine with a pipeline architecture that orchestrates tasks via a chain-of-responsibility pattern, wrapped in an FSM-inspired API for clean, explicit state transitions—built in Rust on top of the `git2-rs` library. Let's dive in.

## The Foundation: `git2-rs`

A fundamental design decision in `bgit` was to avoid spawning `git` as a separate command-line process. While that approach can work, it comes with the overhead of managing processes, tracking progress, and parsing plain text output, which can be brittle.

Instead, `bgit` is built on **`git2-rs`**, a library that provides safe, programmatic Rust bindings for `libgit2`, a powerful C implementation of Git's core functions. This gives us direct, granular control over every Git operation. For example, creating a commit with `git2-rs` looks like this:

```rust
repo.commit(
    Some("HEAD"),      // Update HEAD
    &signature,        // Author
    &signature,        // Committer
    message,           // Commit message
    &tree,             // Tree
    &[&parent_commit], // Parents
).unwrap();
```

While this level of control is essential, it also exposes the raw complexity of Git. A core goal of `bgit` is to wrap this power in a safe, user-friendly architecture. Maintained by the Rust project itself, `git2-rs` is the solid foundation that makes this possible.

## The Core Architecture: Workflow Engine

At its heart, `bgit` is a workflow engine that drives a pipeline of steps. When you run the `bgit` command, you aren't just running a script; you enter the start of a `WorkflowQueue`. This queue represents an ordered pipeline (that can branch) of possible steps, and `bgit` orchestrates progression using a chain-of-responsibility pattern based on the state of your repository and your input. The public API is FSM-inspired to keep transitions explicit and predictable—but the execution model is pipeline-first, not a classic state machine.

A typical step in the workflow is defined by this enum:

```rust
pub(crate) enum Step {
    Start(Task),
    Stop,
    Task(Task),
}
```

Each `Step` can either be the start of a workflow, the end of a workflow (`Stop`), or contain another `Task`. A `Task`, in turn, is one of two types:

```rust
pub(crate) enum Task {
    ActionStepTask(Box<dyn ActionStep>),
    PromptStepTask(Box<dyn PromptStep>),
}
```

This distinction is the key to `bgit`'s interactive nature:

* An **`ActionStepTask`** is automated. It makes a decision based only on the environment (e.g., checking if Git is installed).
* A **`PromptStepTask`** is interactive. It depends on user input to proceed (e.g., asking the user if they want to stage unstaged files).

Together, these components create a guided workflow that can branch into multiple paths, handle complex scenarios, and always end in a defined state.

![bgit architecture](/project/bgit/bgit_architecture.png)

### The Building Blocks: From Command to Action

Now that we understand the workflow engine and pipeline concept, let's look at the individual components that bring it to life. `bgit`'s architecture is a clear chain of responsibility, where each component has a single, well-defined job.

![bgit default workflow](/project/bgit/bgit_default_complete_workflow.png)

Here’s the corrected flow of how the pieces fit together:

1. A **`task`** (from a `step` in the workflow) determines what needs to happen next.
2. Before doing anything, the `task` validates the action by checking the necessary **`rules`**.
3. If the rules pass, the system executes the corresponding **`pre-hook` script**, allowing for custom user actions before the event.
4. The `task` then dispatches the **`event`**, which is the small, atomic unit of work responsible for making the call to `git2-rs`.
5. After the `event` successfully completes its `git2-rs` operation, the corresponding **`post-hook` script** is executed.

This creates a robust, predictable, and extensible data flow:
`task` → `rule` check → `pre-hook` → `event` (calls `git2-rs`) → `post-hook`

## A Closer Look: Rules, Events, and Hooks

The real "magic" of `bgit` happens at the lowest levels of its abstraction, where rules, events, and hooks interact to create a safe and powerful system.

### The Power of Rules

In `bgit`, rules are intelligent guardrails checked by a `task` *before* an `event` is ever dispatched. This ensures that no invalid action is even attempted. A rule is a simple struct defining its conditions, but its most powerful feature is the `try_fix()` method. This is where `bgit`'s "helper" personality comes from. A rule doesn't just fail; it can contain logic to **offer a solution**, like automatically unstaging a file that violates a size constraint.

```rust
pub(crate) struct NoLargeFile {
    name: String,
    description: String,
    level: RuleLevel,
    threshold_bytes: u64,
}
```

```rust
fn try_fix(&self) -> Result<bool, Box<BGitError>> 
```

### Events and Hooks: The Action Core

Once the rules are satisfied, the action begins. The **`event`** is the final, smallest unit of work that makes the direct call to the `git2-rs` library.

This is also where the user-configurable hooks we discussed in our first blog post come into play. The `hook_executor` is designed to wrap the `event`:

* The **`pre-hook`** script runs immediately before the `event`'s logic.
* The **`post-hook`** script runs immediately after the `event`'s logic successfully completes.

This powerful combination means that the core, compiled `bgit` logic is bracketed by flexible, user-defined scripts, allowing for incredible customization while maintaining a safe and validated core.

## A Deep Dive: The `hook_executor` and Cross-Platform Hooks

One of `bgit`'s core architectural challenges was handling Git hooks. The underlying `libgit2` library, for performance and safety reasons, does not natively invoke the standard Git hooks found in `.git/hooks/`. However, many developers rely on these hooks for their workflows. `bgit` bridges this gap with a sophisticated, hybrid approach managed by its `hook_executor`.

### The Solution: A Hybrid Hook System

The `hook_executor` is designed to provide the best of both worlds: the portability of version-controlled hooks and compatibility with the most common native hooks.

1. **Portable `bgit` Hooks:** This is the preferred method in `bgit`. Hooks are placed in a `.bgit/hooks/` directory within the repository.

      * **Benefits:** They are version-controlled, shared across the entire team, and designed to be cross-platform from the ground up.
      * **Naming:** They follow the `[pre|post]_[event_name]` pattern, covering a wide range of `bgit` events.

2. **Native Git Hooks:** For compatibility, `bgit` provides best-effort support for the most critical native hooks.

      * **Location:** The standard `.git/hooks/` directory.
      * **Supported:** `bgit` explicitly looks for and executes **`pre-commit`** and **`post-commit`**.
      * **Unsupported:** It detects other native hooks (like `pre-push` or `commit-msg`) and logs a warning, encouraging users to migrate their logic to the more robust `.bgit/hooks` system.

For the critical commit event, `bgit` orchestrates a clear and predictable sequence:

1. `.bgit/hooks/pre_git_commit` (Portable `bgit` hook)
2. Standard Git `pre-commit` (Native hook)
3. **The Commit Action is Performed**
4. `.bgit/hooks/post_git_commit` (Portable `bgit` hook)
5. Standard Git `post-commit` (Native hook)

### The Cross-Platform Challenge

The true complexity of the `hook_executor` is revealed in how it handles cross-platform execution, especially on Windows.

On **Unix-like systems (Linux/macOS)**, the process is straightforward: `bgit` simply ensures the hook scripts in `.bgit/hooks/` are executable (`chmod +x`) and runs them.

On **Windows**, however, the `hook_executor` becomes a far more sophisticated piece of logic. It intelligently finds the correct way to run a script by following a detailed execution strategy:

1. **It checks for hooks by extension precedence:** It first looks for a script with no extension, then `.bat`, `.cmd`, `.ps1`, and finally `.exe`.
2. **It chooses the right runner:**
      * `.ps1` files are run with PowerShell.
      * `.bat` and `.cmd` files are run with `cmd.exe`.
      * `.exe` files are executed directly.
3. **It intelligently finds Bash:** If a script has a shebang (`#!/bin/bash`), the executor searches for a Bash interpreter in common locations (Git Bash, MSYS2, WSL) or in the system `PATH`.
4. **It has a fallback:** If all else fails, it attempts to run the script with `cmd.exe`.

This robust strategy ensures that hooks defined by a team on Linux will work as expected for a teammate on Windows, solving a common pain point in cross-platform development.

## The `config` System: Explicit and Separated by Design

As we discussed in the first post, `bgit`'s configuration system is built on a principle of strict separation to avoid confusion and ensure predictable behavior.

1. **Global Config (`~/.config/bgit/config.toml`):** This file is **exclusively** for your personal, user-specific settings that apply across all projects. Think of authentication, API keys, and other personal preferences.

2. **Local Config (`.bgit/config.toml`):** This file is **exclusively** for project-specific settings that are version controlled and shared with the team. This includes things like workflow rules and behaviors for the repository.

A setting designed for the global file will not work in the local file, and vice versa. Because of this strict separation, one file cannot override the other—they simply manage completely different sets of options. This design is a deliberate choice to make a project's behavior explicit and prevent it from being modified by a hidden global setting.

**Example Global Config (Only User-Specific Keys):**

```toml
# Keys related to you, the user.
[auth]
preferred = "ssh"
key_file = "/home/user/.ssh/id_ed25519"
```

**Example Local Config (Only Project-Specific Keys):**

```toml
# Keys related to the project's rules.
[rules.default]
NoSecretsStaged = "Error"
```

## Conclusion: How to Contribute

To recap, `bgit` is more than just a simple script. It's a workflow engine with a pipeline architecture and chain-of-responsibility task orchestration, wrapped in an FSM-inspired API—built in Rust on top of `git2-rs` for programmatic Git access. Its architecture flows from tasks to rules, then wraps core events with a cross-platform hook executor. All of this is designed for a single purpose: to create a safe, predictable, and helpful experience for the end-user.

Now that you understand the core concepts of workflows, tasks, events, and rules, you're well-equipped to dive into the codebase. We welcome contributions of all kinds and believe that the best tools are built by the community. Whether it's by tackling an existing issue, proposing a new rule, or improving the documentation, we'd love your help.

### Project Details & Links

* **Source Code:** [rootCircle/bgit on GitHub](https://github.com/rootCircle/bgit)
* **Package:** [bgit on Crates.io](https://crates.io/crates/bgit)
* **License:** MIT License
* **Platforms:** Windows, macOS, & Linux
* **Current Status:** Pre-alpha (Contributions are highly welcome!)

We're excited to see what you'll build with us.

## Meta

* [What is bgit?](./bgit)
* [github.com/rootCircle/bgit](https://github.com/rootCircle/bgit)
* [bgit docs](https://github.com/rootCircle/bgit/tree/main/docs)
* [crates.io/crates/bgit](https://crates.io/crates/bgit)
