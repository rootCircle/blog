---
title: cpast 
description: cpast is your go-to code testing and analysis tool for competitive programming. It effortlessly compares code outputs, irrespective of the programming language, making it a versatile solution for testing correctness and debugging. With a custom language generator, clex, controlling input patterns visually similar to regex, cpast ensures flexibility in defining test cases. Save time with rapid testing, automate your workflow, and bid farewell to manual debugging.
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
# Introducing cpast: Finding missing edge cases in C.P. done easy

<!-- <div class="youtube-video-container"> -->
<!-- <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/GnplmUQlzBo?si=MRV2m7cJGfQwgOnr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
<!-- </div> -->
<!---->

<video controls="controls" src="/project/cpast_walkthrough.mp4" />

[![Crates.io](https://img.shields.io/crates/d/cpast)](https://crates.io/crates/cpast)

:::info **TL;DR for cpast**

**cpast** is your go-to code testing and analysis tool for _competitive programming_. It effortlessly compares code outputs, irrespective of the programming language, making it a versatile solution for testing correctness and debugging. With a custom language generator, **clex**, controlling input patterns visually similar to regex, **cpast** ensures flexibility in defining test cases. Save time with rapid testing, automate your workflow, and bid farewell to manual debugging.
:::

Are you tired of spending precious time manually debugging your code during competitive programming (CP) contests? Well, I have just the solution for you – **cpast**! This powerful code testing and analysis tool is designed to simplify the coding experience in CP by effortlessly validating your code against custom test cases. Written in Rust and featuring my brainchild, the unique language generator called **clex**, cpast is your go-to companion for tackling CP questions more efficiently.

## What is cpast?

![cpast help page](/project/help_page.png)

**cpast** is my brainchild, a tool crafted to compare outputs of two code files, regardless of the programming language used. It's the secret sauce that makes CP coding a breeze, allowing you to test solutions against random inputs. What sets cpast apart is its strong custom language, visually resembling regex, which controls input generation for testing.

**Key Features:**

- **Language Agnostic:** Compare code outputs regardless of the programming language.
- **Custom Language (clex):** Define input patterns visually using a dynamic language similar to regex.
- **Rapid Testing:** Automate code testing with custom test cases.
- **Written in Rust:** Leveraging the speed, safety, and cross-compatibility of Rust.

**Sample I/O:**

```bash
❯ cpast test -c 1.py -t ab.java -g "(N[1,5]) (?:(N[1,5]) (?:N[1,100]){\\2}){\\1}" -i 10

[PROGRAM STORE INFO] Compiling program/Generating Intermediates
[INFO] Using multi-threading to speed up the process, testcase order might vary!

Testcase 73 failed!
INPUT
5 3 20 58 98 3 18 10 10 4 86 9 26 27 4 2 8 40 15 5 92 79 80 88 43
==============================
EXPECTED OUTPUT
0
0
0
0
0

==============================
ACTUAL OUTPUT
0
0
0
0
1

Testcase 58 failed!
INPUT
5 5 65 89 81 96 86 3 87 14 74 2 63 2 1 38 3 52 92 42
==============================
EXPECTED OUTPUT
0
0
0
0
0

==============================
ACTUAL OUTPUT
1
0
0
0
0


Test case generation & matching done!
```

## How it can help you?

If you're into solving competitive programming problems or tackling LeetCode questions but struggling to identify that elusive edge case, cpast is your solution! Instead of manually dissecting solution codes from the internet, let cpast do the heavy lifting for you. All you need is to download a solution for the given problem from internet, in any programming language and write a *clex* generator language for it(to define input format), and let cpast do the magic for you. It's designed to uncover those tricky cases that might be tripping up your current code! [Watch video for demonstration]

## Getting Started with cpast

### Installation

```bash
cargo install cpast
```

:::info
On windows, to install cargo, run these commands in terminal (for faster and lighter setup)

```bash
winget install rustup
rustup toolchain install stable-x86_64-pc-windows-gnu
rustup default stable-x86_64-pc-windows-gnu
```

After that, you can just run the above command.
:::

### Usage Example

```bash
cpast test -c solution.py -t test.java -g "(N[1,100]) (?: N[-50,50]{\1})" -i 5
```

```bash
cpast generate "S[10,'U']"
```

This command tests a Python solution (`solution.py`) against a Java test file (`test.java`) with custom input patterns for (`5`) iterations. (Input pattern language is explained later!)

## The Challenge of Testcase Generation

When I embarked on the development journey of **cpast**, a critical challenge stood in my way – testcase generation. Traditional approaches found on Google and GitHub relied on custom predefined rules commonly used in competitive programming (C.P.) problems. While these methods had their merits, they came with a significant drawback – limiting the freedom of end-users.

I envisioned a solution that would empower users with flexibility, allowing them to define test cases in a way that suited their needs. This commitment led me to develop my own custom testcase generator, a task that proved to be the most demanding aspect of the entire project.

### Seeking Inspiration from Regex

In the initial stages, I sought inspiration from regex, a powerful tool for pattern matching. However, I encountered a roadblock – regex didn't support backreferences in quantifiers. This limitation hindered my progress and prompted me to rethink my approach.

### Crafting a Custom Testcase Generator: No Turning Back

Undeterred by the challenges, I decided to take matters into my own hands. I embarked on crafting my own custom testcase generator, aiming for perfection and flexibility that would cater to a variety of use cases.

The journey wasn't easy, and the initial drafts of the language took shape through trial and error. Drawing from my experiences and learnings, I created a language that was not just powerful but also user-friendly. This was a pivotal moment in the development of **cpast** – a moment where I overcame a significant hurdle and paved the way for a more liberating and user-centric testcase generation process.

In retrospect, tackling this challenge head-on was essential to the success of **cpast**. It exemplifies the commitment to providing users with a tool that not only solves problems but does so in a way that enhances their freedom and creativity in the competitive programming realm.

## The clex Language Generator

The magic behind cpast lies in the **clex** language generator. This language, visually akin to regex, allows you to define input patterns for testing. From numerical ranges to repetitions, clex provides a flexible and intuitive way to control input generation.

### Sample clex Language Usage

**`(N[,1000]) N[,1000] (?:N F S){\1}`**

- Accepts input like "2 1 3 2.2 ABC2 3 4.5 ASD".

- It expects two integers (first with a range from 0 to 1000 and other with upper bound of 1000), followed by triplets of Integer, Float, and String, occurring as many times as specified by the first capturing group i.e. the very first number. [Note: Capturing group has default lower bound of 0]

- N stands for Integer, while F and S stands for Float and string respectively

- [,1000] represents _range limits_ for the numbers, here it signifies that max limit can only be 1000

- (....) is a _capturing group_ that stores the values that can be back-referenced later using '\n' where n is the group number.

- (?: ..... ) is an _non capturing group_ used specially for repetition, so if I want a pattern to repeat I might be using this a lot.

- {\1} is an _quantifier_ that signifies number of occurrence of a pattern of expression.

## Future Roadmap

As **cpast** stands as a valuable tool for code testing and analysis, the journey is far from over. Looking ahead, the roadmap includes plans to enhance the user experience. This involves introducing support for capturing groups within non-capturing groups, implementing more robust string checks, and committing to continuously improve documentation. These enhancements aim to make **cpast** even more versatile and user-friendly, ensuring it remains a reliable companion for competitive programmers. Additionally, upcoming features such as automated testcase generation(using a custom LLM model), a VSCode extension, and a Discord bot promise to elevate the capabilities of **cpast** to new heights. The future is exciting, and the commitment is to provide a seamless and empowering experience for the coding community.

## Contribute and Collaborate

**cpast** is my open-source project, and I welcome contributions! Join the community, explore the source code, and contribute to making cpast even more powerful.

Ready to elevate your CP experience? Dive into the world of cpast and let it handle the heavy lifting while you focus on crafting winning code!

[Check out cpast on GitHub](https://github.com/rootCircle/cpast_mono)

[cpast on crates.io](https://crates.io/crates/cpast)

_Note: cpast is still in development, and I'm excited to incorporate additional features and improvements in future releases._

:::warning AI based content
Some of the content were written with help of ChatGPT to save some of my time, but the text has been verified for authenticity. 
:::

<style>
.youtube-video-container {
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.youtube-video-container::after {
  display: block;
  content: "";
  padding-top: 56.25%;
}

.youtube-video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
