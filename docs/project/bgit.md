---
title: bgit 
description: Struggling with Git? bgit is a new, FLOSS command-line tool that simplifies the Git workflow for beginners. Learn how to add, commit, and push with one easy command—and avoid common mistakes with "smart rules".
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

# Introducing bgit: One Command for Most of Git

![bgit logo](/project/bgit/bgit_logo.png)

Let's be honest: we've all felt that flash of panic before hitting enter on a Git command. Is this going to work, or am I about to break everything? Git is essential, but it shouldn't be terrifying. I built a tool to act as a friendly guide, inspired by the exact moments of confusion I saw while mentoring at a college hackathon.

## Let's Talk About Git Fumbles

Last year, I was a mentor at HackOFiesta, our college's annual hackathon. My main job was helping folks with Git. I saw it all: from `git push` with no internet connection to the classic "I pushed the entire node_modules directory to GitHub."

Many of these problems were simple mistakes, but they all pointed to a common theme: a fragile workflow. Most participants were new to version control. For them, the Git universe was a three-command loop: `git add`, `git commit`, `git push`. Anything beyond that, and they'd often turn to a UI, missing out on the power of the command line.

This experience sparked the idea for bgit. I wanted to build a tool that was simple, intuitive, and smart, yet configurable enough to grow with the user. I didn't want to create just _yet another shell script wrapper_—those are hard to test and maintain.

Instead, bgit became a framework built around rules, events, and workflows. The goal? A tool with almost no learning curve. A tool that's easy, and dare I say, fun to use.

### A Quick Word on Git

![Git logo](/project/bgit/git_logo.png)

Before we dive into `bgit`, let's quickly cover what Git is. In short, Git is a **Distributed Version Control System (DVCS)**.

Think of it like save points for your code. You create "commits"-checkpoints you can jump back to when an experiment goes sideways.

Git also lets teams work in parallel without stepping on each other's toes. It's insanely useful, but the interface can feel like a boss fight when you're just starting out. That's the first mile `bgit` aims to smooth over.

## What is `bgit`?

`bgit` is a command-line tool, written in Rust, that simplifies the Git workflow for beginners.

_If you're already a Git power user, this tool might not be for you_, and that's okay! `bgit` is designed for the student, the new developer, or anyone who just wants to get their "hello world" website on GitHub without falling down the rabbit hole of advanced version control concepts. It aims to be a better first step than the "Add files to upload" button on the GitHub website.

Instead of requiring you to memorize subcommands, you just run `bgit`. It intelligently detects the state of your repository—staged files, uncommitted changes, and stashes—and guides you with simple prompts.

## Getting Started: Installation

Let's get it installed. It's a single command.

- **Linux/macOS**

    ```bash
    curl -fsSL https://raw.githubusercontent.com/rootCircle/bgit/main/scripts/install.sh | bash
    ```

- **Windows (PowerShell)**

    ```powershell
    iwr -useb https://raw.githubusercontent.com/rootCircle/bgit/main/scripts/install.ps1 | iex
    ```

## How to Use `bgit` (and its Goodness)

![bgit workflow run](/project/bgit/bgit_default.png)

Using `bgit` is as simple as typing the command in your terminal:

```bash
bgit
```

That's it—no complex subcommands or weird flags. From there, `bgit` works by asking you simple questions. It uses yes/no prompts, multiple-choice questions, and occasional text inputs to guide your workflow. Want to commit but have unstaged files? `bgit` will ask you what to do with them. Accidentally staging a secret `.env` file? `bgit` will catch it.

The power remains with you, but the process is safer and heavily focused on best practices.

## The `bgit` Philosophy: Simplicity over Configurability

Git is incredibly powerful, but its endless flexibility can be a curse for beginners. The fear of running the wrong command can be paralyzing. While this configurability is a blessing for power users, it also opens extra room for stupidity for those less experienced (including me). On the other hand, too little configurability can make the tool rigid and unsuitable for diverse needs.

`bgit` takes a strong stance here: it intentionally limits configuration to create a straightforward, safe path. We handle the "great responsibility" so you can focus on your code.

However, for those who need it, `bgit` offers two levels of configuration:

1. **Global:** Located at `~/.config/bgit/config.toml` for user-wide settings (like auth keys).
2. **Repo:** Located in your project's `.bgit/config.toml` for repo-specific rules.

## `bgit`'s config.toml: Configuration When You Really Need It

By default, `bgit` is a "zero-config" tool. It's designed to work out of the box with sensible, safe defaults to protect beginners. However, for those who need more control, `bgit` offers a simple and powerful configuration system.

The most important rule is that global and local settings are completely separate and non-overlapping.

1. **Global Config (`~/.config/bgit/config.toml`):**
    This file is exclusively for your personal, user-specific settings that apply across all projects. Think of authentication, API keys, and other personal preferences.

    _Example Global `config.toml`:_

    ```toml
    [auth]
    preferred = "ssh"

    [auth.ssh]
    key_file = "/home/user/.ssh/id_ed25519"

    [integrations]
    google_api_key = "your_google_api_key_base64_encoded"
    ```

2. **Repo Config (`.bgit/config.toml`):**
    This file lives in the root of your project and contains rules for _that specific repository_. It’s perfect for enforcing team-wide standards.

    _Example Local `config.toml`:_

    ```toml
    # Rules configuration
    [rules.default]
    IsGitInstalledLocally = "Error"
    GitNameEmailSetup = "Error"
    NoSecretsStaged = "Error" # Prevent committing secrets!

    # Workflow configurations
    [workflow.default.is_sole_contributor]
    overrideCheckForAuthors = ["testuser@email.com"]
    ```

A setting designed for the global file will not work in the local file, and vice versa. Because of this strict separation, one file cannot override the other; they simply manage completely different sets of options. This design prevents confusion and makes a project's behavior explicit and predictable.

This two-level system gives you the best of both worlds: a zero-config experience by default, with the option to set powerful rules for yourself or your team.

## The `bgit` Hook System

If you've used Git for a while, you might know about its hook system, scripts that run at certain points in the workflow. It's a great idea, but with a major flaw: the hooks live in your local `.git/hooks` directory. They aren't version controlled, so you can't share them with your team, making consistent automation a challenge.

With `bgit`, hooks are version controlled. While `bgit` doesn't yet fully support standard Git hooks, it has its own powerful event-driven system called `hook_executor`.

The `bgit` hook system is much more versatile than standard Git's, covering events across the entire development lifecycle. You can automate tasks for almost any action, from the moment you clone a repository to when you pop a stash, and everything in between.

Just add an executable script—be it shell, PowerShell, or a `.exe`—to the `.bgit/hooks/` directory, following a simple `[pre|post]_[event_name]` pattern.

One hook I've found especially handy is `post_git_clone`. Put a setup script at `.bgit/hooks/post_git_clone` and, right after you clone with `bgit`, it automatically runs the script—no copy-pasting from the README—so you go from clone to dev-ready in one step. See it in action: [rootCircle/bgit_clone_sample](https://github.com/rootCircle/bgit_clone_sample).

## Smart Guardrails: The `bgit` Rule System

> [!NOTE]
> Stupidity can be broadly categorized into:
>
> 1. Accidental Stupidity
> 2. Stupidity out of convenience
> 3. Complete Stupidity
>
> ~ Walter Wallis (Programmers are also human)

While no tool can prevent every mistake, `bgit` certainly aims to reduce the risk associated with the first two.

Remember the hackathon story about developers pushing `node_modules` or secret keys to GitHub? These common mistakes are exactly what the `bgit` rule system is designed to prevent.

Think of rules as a set of automatic safety checks that run before you take critical actions like committing your code. Instead of you having to remember a long checklist of best practices, `bgit` acts as a vigilant assistant, watching your back.

Here are a few of the built-in rules that protect you:

- **`NoSecretsStaged`:** Scans for common secret files like `.env` or credential keys to prevent you from accidentally leaking sensitive information.
- **`NoLargeFile`:** Warns you if you try to commit a very large file that probably belongs in your `.gitignore`.
- **`GitNameEmailSetup`:** Checks that your Git username and email are configured correctly before you even make your first commit.

and many more.

What makes `bgit`'s rules truly special is that they don't just tell you something is wrong—**they can often fix the problem for you automatically**. If a rule is broken, `bgit` might offer to unstage the problematic file or help you configure your settings, turning a potential mistake into a learning moment.

For teams, the behavior of these rules can be configured in the project's `.bgit/config.toml` file, ensuring everyone on the project is protected by the same safety standards.

## Conclusion

Git is the industry standard for version control, and learning it is a journey every developer should take. `bgit` isn't here to replace that journey. It's here to be a friendly first step—a set of training wheels that guides you with best practices until you're ready to ride on your own.

The project is fully open-source, distributed under the **MIT license**, and is currently in a **pre-alpha stage**. This is the perfect time to get involved, provide feedback, and help shape its future. `bgit` is built with Rust and supported on **Windows, macOS, and Linux**.

So, give it a try on your next project. Star the repository on [GitHub](https://github.com/rootCircle/bgit) if you find it interesting, and don't hesitate to open an issue with feedback or suggestions.

Curious how `bgit` works under the hood? Check out the internals deep dive: [How bgit works](./bgit_internals).

Happy coding, and may you never push `node_modules` again!

## Acknowledgments

`bgit` would not have been possible without the immense contribution of [Sidharth Singh](https://github.com/Sidharth-Singh10). Special thanks also go to [Himanshu](https://github.com/Him7n) and [Gyandeep](https://github.com/Gyan172004) for their valuable contributions along the way.

## Meta

- **GitHub Repo:** [github.com/rootCircle/bgit](https://github.com/rootCircle/bgit)
- **Crates.io:** [crates.io/crates/bgit](https://crates.io/crates/bgit)
- [How bgit works](./bgit_internals)
- [bgit docs](https://github.com/rootCircle/bgit/tree/main/docs)
