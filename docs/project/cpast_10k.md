---
title: Celebrating 10k downloads of cpast & what's next
description: Deep dive into journey of cpast, from where it's started, where it's now and what's next. And how you can contribute to it.
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:image
      content: https://raw.githubusercontent.com/rootCircle/blog/refs/heads/main/docs/public/cpast.png
  - - meta
    - name: twitter:card
      content: summary_large_image
---

# Celebrating 10k Downloads of cpast & What's Next

Last week, cpast surpassed **10,000** downloads on [crates.io](https://crates.io/crates/cpast). It’s heartwarming to see what started as a small project to address my own frustrations has grown to be useful for so many people. I am truly grateful to all of you. This post reflects on our journey so far and outlines the future plans for cpast.

## It All Started with an Itch

During my sophomore year of college, like many others, I was grinding through LeetCode challenges. I often felt frustrated by the “Wrong Answer on X testcase” messages, which can be frustratingly hidden on some platforms. Debugging seemed like the obvious solution, but when time was running out, I often turned to friends who excelled in competitive programming and data structures. Unfortunately, I discovered I was less skilled in data structures than my peers. 😢 I frequently had silly questions that I hesitated to ask, not wanting to deplete my "friendship cards" too quickly.

This frustration led me to the editorial comments on those questions, which usually contained optimized solutions. (People love to showcase their code that beats 100% of the competition.) I would check other solutions and then try hard to debug what was wrong with mine. Oh, I should have used `long long` instead of `int`—easy fix! Or maybe I could have implemented memoization—another nightmarish concept!

While reviewing others' solutions felt like cheating, I also felt guilty about it. There was no going back, though. So, I found a middle ground: what if I just extracted the missing edge cases from the editorial solution and tried to debug my own code? This led me to create a program that would allow me to input a question and my code, generating minimal edge cases that could fail—*quickly*.

Now, cpast isn’t exactly what I initially envisioned, but I hope it will be one day. 😅

## Initial Iterations

The first iteration involved finalizing a program runner (now known as `ccode_runner`) and developing a grammar for `clex`, a custom language similar to regex for generating random test cases **deterministically**. (ChatGPT wrappers, I’m looking at you!) I lost count of how many times I rewrote the parser and grammar, waiting for the perfect language that could generate everything simply. Ironically, using regex complicated things rather than simplifying them! 😂

The grammar evolved from [27fa430](https://github.com/rootCircle/cpast_mono/blob/27fa4303a0e190e7406095d5682d9535d09ee533/TESTCASE_LANGUAGE.md) to [1db9588](https://github.com/rootCircle/cpast_mono/blob/1db9588ffe5f1c1e52a81adb2c03db6a00468058/clex.specs.md), and ultimately to [6d491f5](https://github.com/rootCircle/cpast_mono/blob/6d491f5355fb74a14cd556d6d777a070bbb1f007/clex/docs/CLEX_LANG_SPECS.md), with many iterations in between. (I should have implemented a versioning scheme for the grammar earlier.)

Version [0.4.0](https://github.com/rootCircle/cpast_mono/releases/tag/v0.4.0) introduced the most stable Abstract Syntax Tree (AST) for `clex`, which I rewrote from the ground up. This was for [clex_llm](https://github.com/rootCircle/clex_llm), a side project aimed at generating `clex` from human text using large language models. (Basically, you input a Codeforces question, and it gives you the `clex`.)

## Next Steps

After completing the first working prototype, cpast functioned as a CLI tool that took two code snippets (in any independent language) and a `clex` specification to generate random test cases. It would then quickly identify any missing edge cases for you!

In future iterations, cpast evolved from a single-threaded, inefficient prototype to a multi-threaded, cross-compatible, high-performance, robust tool for comparing two pieces of code. We introduced multi-threaded execution by default in version 0.3.4, which improved performance by at least 45% in the worst case. Performance was a major focus for version 0.3; we drew inspiration from GNU Make and its ability to save on repeated compilation, thus reducing the warm-up time for cpast.

We made some poor decisions along the way, such as introducing clipboard support for the CLI tool, which turned out to be a headache to maintain across different platforms. Feature flags helped us keep it functional, but I plan to remove it in the future.

## cpast and Rust

The initial choice of Rust for cpast wasn’t driven by its memory safety promises and other benefits; I just wanted to learn a new language, and cpast was helping me do that. However, using Rust for so long has been a wonderful experience. Rust feels like a "batteries-included" language, with many features readily available. Cargo is a godsend, and its design is exceptional. Monorepos became a blessing, thanks to Cargo.

Rust has been both tempting and fruitful. The compile-time guarantees allowed for quick iterations on design and architecture. The type system made me embrace the simplicity and beauty of static typing. Enums and pattern matching are incredibly powerful in Rust. And guess what? We even get compile-time guarantees for our SQL queries. Isn’t that amazing?

# Future Plans

I have many plans for the future of cpast. We recently migrated to a monorepo, and thanks to Cargo, it was quick and easy to set up! The next release will take longer to complete, as I am currently working on this project solo. Additionally, the builds for Android are broken and will need fixing, though I can’t prioritize that right now.

My current focus is on `cpast_api`, where I am developing a robust backend. It’s still a work in progress. You can find the design in the [docs](https://github.com/rootCircle/cpast_mono/tree/main/cpast_api#architecture). While prototyping the backend, I drew a lot of inspiration from Luca Palmieri's [Zero To Production In Rust](https://zero2prod.com/), which I found to be opinionated and well-structured.

![cpast_api architecture](/project/cpast_api_arch.png)

The main work involves enabling the backend to compile and run untrusted code on the server. There are many challenges involved, and solving them will take time. For file compilation and execution, since this process is computationally intensive, I initially considered implementing a message queue using Kafka or RabbitMQ. This would allow me to scale the backend horizontally and handle the high response times effectively.

However, I’m now thinking that using blocking handlers for a message queue might be simpler and more effective. With this approach, even if the response time is high, you would receive the response all at once, instead of relying on Kafka and WebSockets. (But yes, I’m still considering the options! 😄) Blocking message queues are quite straightforward—similar to a job scheduler in an operating system.

## Hosting on Shuttle-rs???

As soon as this API is formally completed, I would like to host it in the cloud. However, AWS costs can be a concern. Although RAM usage isn't particularly high, the constraints of the compiler Docker image could pose a challenge. To address this, I'm exploring whether Shuttle supports running code inside custom Docker containers. If it does, I might consider migrating to Shuttle. It offers free cloud hosting specifically for Rust applications, making it an attractive option for scaling and managing resources more effectively

## Help Wanted

The reason for this post is to issue an open call for developers interested in helping take cpast to new heights. The development of cpast is time-consuming, and I find it challenging to juggle my college responsibilities with this project. I am specifically looking for individuals who can offer guidance on architecture or who are passionate users—or just starting to learn Rust and backend development.

Feel free to contact me via email at <dev.frolics@gmail.com> (old school, but it’s the common habitat for all of us!). You can also raise an issue on the repo or open a discussion—whatever you feel like.

Thank you for your support, and I’m excited to see where we can take cpast together!
