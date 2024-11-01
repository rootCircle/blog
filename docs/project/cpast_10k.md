---
title: Celebrating 10k downloads of cpast & what's next
description: Deep dive into journey of cpast, from where it's started, where it's now and what's next. And how you can contribute to it.
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:image
      content: https://raw.githubusercontent.com/rootCircle/blog/refs/heads/main/docs/public/project/cpast_10k_celeb.png
  - - meta
    - name: twitter:card
      content: summary_large_image
---

# Celebrating 10k Downloads of cpast & What's Next

![celebrating 10k downloads for cpast](/project/10k_downloads_banner.png)

Last week, cpast surpassed **10,000** downloads on [crates.io](https://crates.io/crates/cpast). It’s heartwarming to see what started as a small project to address my own frustrations has grown to be useful for so many people. I am truly grateful to all of you. This post reflects on our journey so far and outlines the future plans for cpast.

Before we dive in, let me introduce cpast for those who are new to it. cpast is a tool that helps you compare two code snippets(written in any programming language) by generating random test cases using clex (a grammar similar to regex for deterministic random test case generation). It can identify missing edge cases in your code, helping you debug more efficiently. cpast is written in Rust and is available as a [crate](https://crates.io/crates/cpast) on crates.io.

## It All Started with an Itch

![A user staring screen with wrong answer on Leetcode](/project/leetcode_frustation.jpeg)

During my sophomore year of college, like many others, I was grinding through LeetCode challenges. I often felt frustrated by the “Wrong Answer on X testcase” messages, which can be frustratingly hidden on some platforms. Debugging seemed like the obvious solution, but when time was running out, I often turned to friends who excelled in competitive programming and data structures. Unfortunately, I discovered I was less skilled in data structures than my peers. 😢 I frequently had silly questions that I hesitated to ask, not wanting to deplete my "friendship cards" too quickly.

This frustration led me to the editorial comments on those questions, which usually contained optimized solutions. (People love to showcase their code that beats 100% of the competition.) I would check other solutions and then try hard to debug what was wrong with mine. Oh, I should have used `long long` instead of `int`—easy fix! Or maybe I could have implemented memoization—another nightmarish concept!

While reviewing others' solutions felt like cheating, I also felt guilty about it. There was no going back, though. So, I found a middle ground: what if I just extracted the missing edge cases from the editorial solution and tried to debug my own code? This led me to create a program that would allow me to input a question and my code, generating minimal edge cases that could fail—*quickly*.

Now, cpast isn’t exactly what I initially envisioned, but I hope it will be one day. 😅

## Initial Iterations

The first iteration involved finalizing a program runner (now known as [`ccode_runner`](https://github.com/rootCircle/cpast_mono/blob/main/ccode_runner/README.md)) and developing a grammar for `clex`, a custom language similar to regex for generating random test cases **deterministically**. (ChatGPT wrappers, I’m looking at you!) I lost count of how many times I rewrote the parser and grammar, waiting for the perfect language that could generate everything simply. Ironically, using regex complicated things rather than simplifying them for end users! 😂

The grammar evolved from [27fa430](https://github.com/rootCircle/cpast_mono/blob/27fa4303a0e190e7406095d5682d9535d09ee533/TESTCASE_LANGUAGE.md) to [1db9588](https://github.com/rootCircle/cpast_mono/blob/1db9588ffe5f1c1e52a81adb2c03db6a00468058/clex.specs.md), and ultimately to [6d491f5](https://github.com/rootCircle/cpast_mono/blob/6d491f5355fb74a14cd556d6d777a070bbb1f007/clex/docs/CLEX_LANG_SPECS.md), with many iterations in between. (I should have implemented a versioning scheme for the grammar earlier.)

Version [0.4.0](https://github.com/rootCircle/cpast_mono/releases/tag/v0.4.0) introduced the most stable Abstract Syntax Tree (AST) for `clex`, which I rewrote from the ground up. This was for [cpast_llm](https://github.com/rootCircle/cpast_llm), a side project aimed at generating `clex` from human text using large language models. (Basically, you input a Codeforces question link, and it gives you the `clex`)

## Next Steps

![cpast_cli in action](/project/cpast_cli_test_usage.png)

After completing the first working prototype, cpast functioned as a *CLI* tool that took two code snippets (in any independent language) and a `clex` specification to generate random test cases. It would then quickly identify any missing edge cases for you!

In future iterations, cpast evolved from a single-threaded, inefficient prototype to a multi-threaded, cross-compatible, high-performance, robust tool for comparing two pieces of code. We introduced multi-threaded execution by default in version [v0.4](https://github.com/rootCircle/cpast_mono/releases/tag/v0.4.0), which improved performance by at least 45% in the worst case. Performance was a major focus for version [v0.3](https://github.com/rootCircle/cpast_mono/releases/tag/v0.3.3); we drew inspiration from [GNU Make](https://www.gnu.org/software/make/) and its ability to save on repeated compilation, thus reducing the warm-up time for cpast.

We made some poor decisions along the way, such as introducing clipboard support for the CLI tool, which turned out to be a headache to maintain across different platforms. Feature flags helped us keep it functional, but I plan to remove it in the future.

## cpast and Rust

The initial choice of Rust for cpast wasn’t driven by its memory safety promises and other benefits; I just wanted to learn a new language, and cpast was helping me do that. However, using Rust for so long has been a wonderful experience. Rust feels like a "batteries-included" language, with many features readily available. Cargo is a godsend, and its design is exceptional. Monorepos became a blessing, thanks to Cargo.

Rust has been both tempting and fruitful. The compile-time guarantees allowed for quick iterations on design and architecture. The type system made me embrace the simplicity and beauty of static typing. Enums and pattern matching are incredibly powerful in Rust. Fearless Concurrency and guess what? We even get compile-time guarantees even for our SQL queries. Isn’t that amazing?

## Future Plans

![cpast_api in making](/project/cpast_api_in_making.png)

I have many plans for the future of cpast. We recently migrated to a monorepo, and thanks to Cargo, it was quick and easy to set up! The next release will take longer to complete, as I am currently working on this project solo. Additionally, the builds for Android are broken and will need fixing, though I can’t prioritize that right now.

We rewrote the entire [cpast_llm](https://github.com/rootCircle/cpast_llm) project from Python to Rust, for better integration with cpast_api.

My current focus is on `cpast_api`, where I am developing a robust backend. It’s still a work in progress. You can find the design in the [docs](https://github.com/rootCircle/cpast_mono/tree/main/cpast_api#architecture). While prototyping the backend, I drew a lot of inspiration from Luca Palmieri's [Zero To Production In Rust](https://zero2prod.com/), which I found to be highly opinionated and well-structured. (recommended read)

![cpast_api architecture](/project/cpast_api_arch.png)

Currently, the main work involves enabling the backend to compile and run untrusted code on the server. There are many challenges involved, and solving them will take time. For file compilation and execution, since this process is computationally intensive, I initially considered implementing a queue using Kafka or RabbitMQ. This would allow me to control the stress on backend at time of excess loads.

However, I’m now thinking that using custom *blocking* queue might be simpler and more effective. With this approach, even if the response time is high, you would receive the response all at once, instead of relying on WebSockets. (But yes, I’m still considering the options! 😄) [Blocking job queues](https://docs.rs/job_queue/latest/job_queue/) are quite straightforward—similar to a job queue in an operating system.

After we have a stable working backend, I will work possibly on

1. cpast_web: A frontend for cpast, which will allow users to interact with the backend.
2. Add support for more platforms in [cscrapper](https://github.com/rootCircle/cpast_mono/blob/main/cscrapper/README.md).
3. Look for ways we can scrap *solutions* from platforms like Codeforces, Leetcode, etc and maintain them in database, using a cron job. Currently, solutions are manually collected from various sources and are added to the database.
4. Making [clex_llm](https://github.com/rootCircle/cpast_mono/blob/main/clex_llm/README.md) more robust, so that it can generate `clex` from human text more accurately. (Currently, it’s a hit or miss). There are some works in open source community that can be used for this purpose, for example [rellm](https://github.com/r2d4/rellm).
5. Integrating cpast_api with [cpastord](https://github.com/rootCircle/cpast_mono/blob/main/cpastord/README.md), a Discord bot that can interact with cpast. Probably deploy it on [Axios](https://in.linkedin.com/company/axios-iiit-lucknow) Discord Server as well.
6. Making `ccode_runner` more flexible and safer, with control on **resources** and **time limits** as well control on *artifact location* i.e. where files are compiled.
7. Put a caching layer between clex_llm as well cscrapper, so that we can save on repeated requests.
8. Securing the backend from remote code execution vunerabilities, using tools like [firejail](https://github.com/netblue30/firejail) etc.
9. And many more!

## Help Wanted

The reason for this post is to issue an open call for developers interested in helping take cpast to new heights. The development of cpast is time-consuming, and I find it challenging to juggle my college responsibilities with this project. I am specifically looking for individuals who can offer guidance on architecture or who are passionate users—or just starting to learn Rust and backend development, willing to contribute to this project.

If you're interested, feel free to drop an "Hi" via email at <dev.frolics@gmail.com> (old school, but it’s the common habitat for all of us!). You can also raise an issue on the repo or open a discussion—whatever you feel like.

Thank you for your support, and I’m excited to see where we can take cpast together!

## Meta

- [cpast_mono repository](https://github.com/rootCircle/cpast_mono)
- [cpast crate](https://crates.io/crates/cpast)
- [cpast_llm repository](https://github.com/rootCircle/cpast_llm)
- [What is cpast?](https://rootcircle.github.io/blog/project/cpast.html)
- [cpast docs](https://docs.rs/cpast/latest/cpast)
- [clex specifications](https://github.com/rootCircle/cpast_mono/blob/main/clex/README.md)

