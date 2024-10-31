# Notes to self

Here is basic sets of general knowledge I acquired in field of computer science! Feel free to use along the way!

1. Premature handling of error is bad! Use error propagation!
2. Don't be too quick to use `exit()` in your code, throw error if possible!
3. Make custom error types!
4. Inheritance can be painful while prototyping! Use Procedural designs/Composition instead!
5. Use shared constants across the entire codebase!
6. Secrets in .env variable and should be never pushed on public/private github repo
7. It's never too late to start using VCS(git) and Linter(if your language doesn't ship one by default!) [Add CI Integartion as well! And pre-commit-hooks also!]
8. Make utils, so your code will be readable!
9. Readable code? First decide who wants to read that first!
10. Never trust javascript or any dynamically typed language! They will bite you when you least expect it to!
11. Never trust low level language with memory safety! They will seg fault, whether you expect it or not!
12. Rust is not the solution to all problems! (you possibly never have faced this `left behind trailing whitespace` with `cargo fmt` yet!)
13. Good code structure doesn't mean good code!
14. Write semantic code so comments required is near none!
15. Use modularity if code maintainability will be a factor! (tl;dr don't write your entire stack in just one file!)
16. Just because a language claims to be class platform, doesn't mean your code will be as well! Think about the local fonts, any OS calls etc etc! There is no such thing called 100% parity!
17. Never be too modular, that adding an extra Class becomes a pain for you, hence pushing you back to the whiteboard!
18. DESIGN before you CODE!
19. Lock resources before someone else break your code in between!
20. It is not guaranteed by any system in world, that your code will execute till 100%. So, ensure disaster recovery and monitoring ready! Try to be as atomic as possible!
21. Your next generation, super fast cutting edge framework, might not be the thing used in your next corporate job! Be prepared for that, but that knowledge and design never goes in vain!
22. Deploy at least once in your lifetime on Friday! Will be a fun!
23. Try maintaining your one old project, instead of creating a new one. You will get better feedback of your code quality!
24. Sometimes things are not as intuitive as one might think!
