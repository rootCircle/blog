---
title: Regex 101
description: Documented Regex as per Python re implementation
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:image
      content: https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/coderpad-regex-the-complete-guide.jpg
  - - meta
    - name: twitter:card
      content: summary_large_image
---
# Regex: Complete Guide

## Introduction

These are compiled notes on regular expressions (regex), based on the official Python documentation. For a more detailed explanation, visit [Python Regex How-To](https://docs.python.org/3/howto/regex.html#regex-howto).

## Metacharacters

Metacharacters convey special meanings in regular expressions. Below is a list of metacharacters used in Python:

```txt
. ^ $ * + ? { } [ ] \ | ( )
```

| Symbol | Description |
| :----: | ----------- |
| `[ABC]`   | Matches either A, B, or C |
| `[A-Z]`   | Matches any uppercase letter from A to Z |
| `[^5]`    | Matches any character except 5 (caret must be at the start) |
| `[5^]`    | Matches 5 or ^ (metacharacter inside a class has no special meaning) |
| `\`       | Escapes any metacharacter or conveys special meaning (e.g., `\w`) |
| `\w`      | Matches any alphanumeric character, equivalent to `[a-zA-Z0-9_]` |
| `\d`      | Matches any digit, equivalent to `[0-9]` |
| `\D`      | Matches any non-digit character, equivalent to `[^0-9]` |
| `\s`      | Matches any whitespace character; equivalent to `[ \t\n\r\f\v]` |
| `\S`      | Matches any non-whitespace character; equivalent to `[^ \t\n\r\f\v]` |
| `\W`      | Matches any non-alphanumeric character; equivalent to `[^a-zA-Z0-9_]` |

These sequences can be used inside character classes, e.g., `[\s,.]`.

> [!NOTE]
> Every metacharacter loses its identity in character classes.

## Repeating Elements

- `*` - Matches 0 or more occurrences of the preceding character or character class (**greedy**).
  - Example:
    - `ca*t` matches `ct`, `cat`, `caat`, `caaaaat`, etc.
    - `a[bcd]*b` applied to the string 'abcbd':
      - It first tries to match 'bcbd' with [bcd]*b.
      - Then it checks abcb. This works, so it returns the output.

- `+` - Matches 1 or more occurrences of the preceding character or character class.
  - Example: `ca+t` matches `cat`, `caaaat`, but not `ct`.

- `?` - Matches 0 or 1 occurrence of the preceding character or character class. (Making preceding element optional semantically).
  - Example: `ca?t` only matches `ct` and `cat`.

- `{m,n}` - Matches at least `m` times and at most `n` times. Omitting `m` or `n` assumes `0` and `INFINITY`, respectively.
  - Example: `ca{1,3}t` matches `cat`, `caat`, and `caaat`.

## More Metacharacters

- `|` - Acts as the OR operator.
  - Example: `Crow|Servo` matches either 'Crow' or 'Servo'.

- `^` - Matches the start of a string (or beginning of line if MULTILINE is set).
  - Example: `^From` matches 'From Hi' but not 'A From Hi'.

- `$` - Matches the end of a string or before a newline (with MULTILINE).
  - Example: `}$` matches 'block}' but not 'block}  '.

- `\A` - Matches the start of the string not lines, ignoring MULTILINE.

- `\Z` - Matches the end of the string not lines, ignoring MULTILINE.

- `\b`: This is a zero-width assertion that matches at the beginning or end of a word. A word boundary is defined as a position where a word character (alphanumeric or underscore) is adjacent to a non-word character (like whitespace or punctuation).

  **Example:**

  ```python
  p = re.compile(r"\bclass\b")
  ```

  - This pattern will match the word "class" only when it appears as a standalone word.
  - **Search in string:**

    ```python
    p.search('no class at all')  # Matches: <re.Match object; span=(3, 8), match='class'>
    p.search('one subclass is')   # No match: None
    ```

- `\B`: This zero-width assertion matches only when the current position is not at a word boundary. It is used to find positions that are inside words.

    **Example:**  
    The pattern `r'\Bclass'` would look for "class" when it appears as part of a larger word, like "subclass", but not as a standalone word.

> [!NOTE] Zero-Width Assertions
> Zero-width assertions do not advance the engine through the string. They consume no characters and simply succeed or fail.
> This means that zero-width assertions should never be repeated, because if they match once at a given location, they can obviously be matched an infinite number of times.

## Grouping

- `()` - Groups contents(characters) as a single entity.
  - Example: `(ab)*` matches 'ababababababab'.
  
In Python, grouping starts with index value 0 (entire regex) and increments for nested groups. Index 1 is the outermost group and so on goes on in nested structure. In simple words, group index is the count of bracket to that group from left.

Example:

```python
p = re.match(r'(ab(c))d', 'abcd')
p.groups()  # ('abcd', 'abc', 'c')
p.group(1)  # 'abc'
p.group(1, 0) # ('abc', 'abcd') i.e., gives corresponding value of regex group index 1 and 0 respectively
```

## Backreferences

Backreferences allow specifying that the contents of an earlier _capturing group_ must match again.

In simple words, `\1` will succeed if the exact contents of group 1 can be found at the current position, and fails otherwise.

Generally, not much useful while searching, but with string substitutions.

- Example: Detecting doubled words:

```python
p = re.compile(r'\b(\w+)\s+\1\b')
p.search('Paris in the the spring').group()
```

## Non-Capturing and Named Groups

Non-capturing and named groups allow you to access groups without using group indices or numbers, just by name.

### Non-Capturing Groups

- **Syntax**: `(?:...)`
- **Description**: This creates a non-capturing group, meaning the group is not assigned an index.
  
**Example**:

```python
m = re.match("([abc])+", "abc")
m.groups()  # Output: ('c',)

m = re.match("(?:[abc])+", "abc")
m.groups()  # Output: ()
```

> [!NOTE]
> There’s no performance difference between capturing and non-capturing groups; neither form is faster than the other.

### [Python Specific] Named Groups

- **Syntax**: `(?P<name>...)`
- **Description**: This behaves like a capturing group but additionally associates a name(here `name`) with the group along with its index.

**Example**:

```python
p = re.compile(r'(?P<word>\b\w+\b)')
m = p.search('(((( Lots of punctuation )))')

m.group('word')  # Output: 'Lots'
m.group(1)       # Output: 'Lots'

m = re.match(r'(?P<first>\w+) (?P<last>\w+)', 'Jane Doe')
m.groupdict()    # Output: {'first': 'Jane', 'last': 'Doe'}
```

### [Python Specific] Backreferencing in Named Groups

- **Syntax**: `(?P=name)`
- **Description**: Backreferences the named group specified by name(here `name`).

**Example**:

```python
p = re.compile(r'\b(?P<word>\w+)\s+(?P=word)\b')
p.search('Paris in the the spring').group()  # Output: 'the the'
```

## Lookahead Assertions

Zero-width assertions that allow you to assert whether a pattern can be matched without consuming characters.

- **Positive Lookahead**: `(?=...)` - Succeeds if the contained regex successfully matches.
- **Negative Lookahead**: `(?!...)` - Succeeds if the contained regex does not match at the current position.
- **Lookbehind**: `(?<=...)` - Succeeds if the contained regex matches behind the current position (fixed size only).
- **Negative Lookbehind**: `(?<!...)` - Succeeds if the current position is not preceded by a match for the contained regex.
- **Conditional Matching**: `(?(id/name)yes-pattern|no-pattern)` - Matches with `yes-pattern` if the group with given `id` or `name` exists, otherwise matches with `no-pattern`.

### Example

1. Checking filename.extension excluding the `.bat` Extension

  - Pattern: `.*[.](?!bat$)[^.]*$`

  - **Explanation**:
    - If the expression "bat" doesn’t match at this point, the pattern will continue to evaluate the rest.
    - If `bat$` does match, the entire pattern will fail.
    - The trailing `$` is necessary to allow filenames like `sample.batch`, where the extension starts with "bat" but isn’t exactly "bat".
    - The `[.]*` portion ensures that the pattern functions correctly for filenames with multiple dots.

  - **Alternative Without Lookahead**:
    `.*[.]([^b].?.?|.[^a]?.?|..?[^t]?|.{4,})$`

2. Excluding Both `.bat` and `.exe` Extensions

  - Pattern: `.*[.](?!bat$|exe$)[^.]*$`

  - **Explanation**:
    - This pattern works similarly to the first example but excludes both `.bat` and `.exe` extensions.

## Non-Greedy Quantifiers

Non-greedy quantifiers match as little text as possible, denoted by `?` postfix. They are represented as follows:

- `*?`  → Matches zero or more occurrences, trying to match as little text as possible.
- `+?`  → Matches one or more occurrences, trying to match as little text as possible.
- `??`  → Matches zero or one occurrence, trying to match as little text as possible.
- `{m,n}?` → Matches between `m` and `n` occurrences, trying to match as little text as possible.

## Possessive Quantifiers

Possessive quantifiers, denoted with a `+` postfix, which unlike the true greedy quantifiers _do not allow backtracking_ when the expression following it fails to match. They attempt to match the maximum possible text without revisiting previous matches:

- `*+`  → Equivalent to `*`, but does not allow backtracking.
- `++`   → Equivalent to `+`, but does not allow backtracking.
- `?+`   → Equivalent to `?`, but does not allow backtracking.

### Example

For the regex pattern `aa*+a`, it will not match `aaaa` because `a*` consumes all remaining `a`s (the last three).

## Additional Regular Expression Features

- **Atomic Grouping**: `(?>...)`:  Matches the maximum possible pattern without allowing backtracking. This means that if the pattern inside the atomic group matches but the overall pattern fails later, the regex engine will not reconsider the match in the atomic group.
- **Comments**: `(?#...)`: Allows you to add comments within the regex for clarity.

## Python-Specific

### Compiling Regex

```python
import re

p = re.compile('ab*')
# OR
p = re.compile('ab*', re.IGNORECASE)  # IGNORECASE can be replaced with re.I
# Multiple flags can be specified with bitwise OR (e.g., re.I | re.M sets both flags)

p.match("Hello, world")

# OR
re.match('ab*', "Hello, world")  # Module-level call
# Module-level call caches the compiled regex, such that it isn't compiled between each call
```

### Backslash Plague

To include a backslash (\\) in a regex, use double backslashes (\\\\) because of string handling. Alternatively, use a raw string by prefixing with `r`.

Example:

```python
re.compile(r"\\se")
```

### Methods and Flags

#### **Methods**

- `match()` - Checks for a match at the start of the string.
- `search()` - Scans throughout the string for a match.
- `findall()` - Scan all substring and returns a list of all matching substrings. (nothing else like span)
- `finditer()` - Scan all substring and returns an iterator of matching substrings. (methods like group(), start(), end() etc can be called on this)

#### **Attributes for Match Objects**

| Method/Attribute | Purpose |
| ---------------- | ------- |
| `group()`        | Returns the matched string. Takes an optional attribute as string (for named group) or index(0 is the entire string). |
| `start()`        | Returns the starting position of the match. |
| `end()`          | Returns the ending position of the match. |
| `span()`         | Returns a tuple containing the (start, end) positions of the match. |
| `groupdict()`    | Returns named groups in key-value form (only for named groups). |

#### **Flags**

| Flag            | Meaning |
| --------------- | ------- |
| `ASCII, A`      | Makes several escapes like `\w`, `\b`, `\s` and `\d` match only on ASCII characters with the respective property. |
| `DOTALL, S`     | Makes `.` match any character, including newlines. |
| `IGNORECASE, I` | Performs case-insensitive matches. (eg: Spam will match 'Spam', 'spam', 'spAM', or 'ſpam'. The latter is matched only in Unicode mode) |
| `LOCALE, L`     | Locale-aware matches depending on the language in which query is typed (slower). |
| `MULTILINE, M`  | Multi-line matching, affects `^` and `$`, matching start/end of each line rather than entire string. |
| `VERBOSE, X`    | Enables verbose REs; ignores whitespace except in character classes. |

When using whitespace for styling in regular expressions, it is advisable to utilize the `re.VERBOSE` flag to enhance readability. Here’s an example:

```python
charref = re.compile(r"""
    &[#]                # Start of a numeric entity reference
    (
        0[0-7]+         # Octal form
      | [0-9]+          # Decimal form
      | x[0-9a-fA-F]+   # Hexadecimal form
    )
    ;                   # Trailing semicolon
""", re.VERBOSE)
```

- To insert flags without using `re.compile`, use `(?aiLmsux)` at the start of the regex string in Python(>=3.11).
- `(?aiLmsux-imsx:...)` will remove part of `aiLmsux` overlapping with `imsx` where `aiLmsuxi` is the corresponding flags.

### Split Method

- **Syntax**: `.split(string, maxsplit=0)`
- **Description**: Splits the string into a list wherever the regex matches. `maxsplit` controls the maximum number of splits.

**Example**:

```python
p = re.compile(r'\W+')
p.split('This is a test, short and sweet, of split().')  # Output: ['This', 'is', 'a', 'test', 'short', 'and', 'sweet', 'of', 'split', '']
```

If capturing parentheses `( )` are used in the RE, then delimiter value (here ' ' \<space\> is also returned in list) are also returned as part of the list.

### Substitution Methods

#### sub

- **Syntax**: `.sub(replacement, string, count=0)`
- **Description**: Replaces all substrings where the regex matches with a different string.

- **Example**:

```python
p = re.compile('x*')
p.sub('-', 'abxd')  # Output: '-a-b--d-'
```

#### subn

- **Syntax**: `.subn(replacement, string, count=0)`
- **Description**: Replaces all substrings where the regex matches with a different string and returns the new string and the number of replacements in a tuple.

- **Example**:

```python
p = re.compile('x*')
p.subn('-', 'abxd') # Outputs: ('-a-b--d-', 5)
('-a-b--d-', 5)
```

> [!NOTE] IMPORTANT
> Empty matches are replaced only when they’re not adjacent to a previous empty match.

> [!NOTE] Anomaly with other languages/standards
> In other programming language like Rust, the similar command will output `-a-b-d-` rather than `-a-b--d-`. See [#Reference](#reference) for more info.

#### Backreferences in Substitution

Backreferences allow you to use substrings matched by groups in a regex pattern during substitution.

##### Using Named Groups

- **Syntax**: `\g<name>` refers to the substring matched by the group named `name`(or any other name you want).

**Example**:

```python
import re

p = re.compile(r'section{ (?P<name> [^}]* ) }', re.VERBOSE)

# Substituting using group 1
result1 = p.sub(r'subsection{\1}', 'section{First}')  # 'subsection{First}'

# Substituting using backreference with group number
result2 = p.sub(r'subsection{\g<1>}', 'section{First}')  # 'subsection{First}'

# Substituting using named group
result3 = p.sub(r'subsection{\g<name>}', 'section{First}')  # 'subsection{First}'
```

#### Using Functions for Replacement

You can also pass a function to the `sub()` method for more complex substitutions.

**Example**:

```python
def hexrepl(match):
    """Return the hex string for a decimal number."""
    value = int(match.group())
    return hex(value)

p = re.compile(r'\d+')

# Substituting using the hexrepl function
result4 = p.sub(hexrepl, 'Call 65490 for printing, 49152 for user code.')
# Output: 'Call 0xffd2 for printing, 0xc000 for user code.'
```

### Case Insensitive Search

- **Syntax**: `(?i)...`
  
**Example**:

```python
(?i)b+  # Matches bbbb, BBbB, B, etc.
```

> [!TIP] Performance Note
> The `re` module can be slower for fixed string matching/substitution. Use `re.search()` as it is optimized compared to `re.match()` when the first character is not required to be searched.

## Notes to self

- Use HTML or XML parser module for parsing regex, instead of regex. (Because of edge-cases)
- Use `re.VERBOSE` for clearer and readable regex patterns.
- Be cautious with performance when using the `re` module for fixed string matching or substitution.

## Practice

- [Regex101](https://regex101.com/)

## Reference

- [Regex Python](https://docs.python.org/3/howto/regex.html#regex-howto)
- [re docs](https://docs.python.org/3/library/re.html)
- [Python's inconsistent behavior with empty matches with the Rust's regex crate](https://github.com/rust-lang/regex/discussions/1164)
