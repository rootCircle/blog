---
title: Converting HTML2React with Regex
description: Initiative to convert HTML To React using Regex
image: https://cdn0.iconfinder.com/data/icons/logos-brands-in-colors/128/react-512.png
---
# Converting HTML2React with Regex

## Context
I was recently switching my HTML, CSS project to React JS. Down below are the some useful, but not extensible list of Regex I used. If you are considering doing the same, there is a better alternative to use [JSX Converter like these](https://transform.tools/html-to-jsx).

## Some Rules

| Function | Search Regex | Replace Regex | Comments |
| --- | --- | --- | --- |
| Change class to className and use module css | `class="([\w-]+)"` | `className={galleryStyle.$1}` | galleryStyle is the name of the module css object |
| Adds extra backslash to img tag | `<img ([^>]+)>` | `<img $1 />` |  |
| br tag | `<br>` | `<br/>` |  |
| input tag  | `<input ([^>]+)>` | `<input $1 />` |  |
| Changing class names like `ab-cd` to `abcd` | `galleryStyle[.]([\w]+)[-]([\w]+)` | `galleryStyle.$1$2` |  |
| Change naming semantic | onclick | onClick |  |
| Changing function calls in onClick to JSX | `onClick="([\w()'']+)"` | `onClick={$1}` |  |
|  | `src="..([\w/.]+)"` | `src="$1"`  |  |
|  | `<!--[^(-->)]+-->` |  |  |
| Convert inline CSS to normal ones (single property only) | `style="([\w]+)(?:[ ]*):(?:[ ]*)([\w#]+)(?:;)?"` | ```style={ {$1"$2"} }``` |  |



## Notes
Dealing with `class="hi bro"` | `class="([\w-]+ )+[\w-]+"`
React has issues with normal DOM queries.
