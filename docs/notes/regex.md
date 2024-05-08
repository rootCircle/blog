---
title: Regex 101
description: Documented Regex as per Python re implementation
image: https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/coderpad-regex-the-complete-guide.jpg
---
# REGEXP 101
::: info
Might fix the formatting later :-)
:::
## Introduction
This is short compiled notes on regexp, based completely on Python Docs for the same topic. For more detailed explaination, visit [here](https://docs.python.org/3/howto/regex.html#regex-howto).

## Metacharcters
They convey special meaning to the regular expression.

These are the list of metacharacters used in Python and in general.
```
. ^ $ * + ? { } [ ] \ | ( )
```


| Symbols | Description |
| :---: | ----------------------------- |
| [ABC]   | Matches either of A or B or C |
| [A-Z]   | Matches either of A to Z | 
| [^5]    | Match all except 5 (Caret must be at start) |
| [5^]    | Match 5 or ^ (Metacharcter inside class has no special meaning) |
| \       | To espace any metacharacter or to convey special meaning like \w |
| \w 	  | Matches any alphanumeric character, equivalent to [a-zA-Z0-9_] |
| \d      | Matches any digit, equivalent to [0-9] | 
| \D 	  | Matches any non-digit character, equivalent to [^0-9] |
| \s 	  | Matches any whitespace character; this is equivalent to the class [ \t\n\r\f\v] (including spaces) |
| \S 	  | Matches any non-whitespace character; this is equivalent to the class [^ \t\n\r\f\v] |
| \W      | Matches any non-alphanumeric character; this is equivalent to the class [^a-zA-Z0-9_] |

These sequences can be used inside character class i.e., []
eg - [\s,.]

***EVERY METACHARACTERS LOSE THEIR IDENTITY IN CHARACTER CLASSES***

## Repeating Things
``` txt

* - preceded by a character or a character class, * tries to match maximum( >= 0) possible values of preeding syntax possible. 
    Uses greedy algo i.e. tries to match maximum first then lesser and lesser and so on.
	eg : 1
	     ca*t will match ct, cat, caat, caaaa....aat etc

	2 : a[bcd]*b in 'abcbd'
	    Will try to match bcbd with [bcd]*b :-|
	    Then with 'abcb' :-). This works so return the output.
	
+ - same as *, but it matches 1 or more times, rather than 0 or more
	eg : 1
	     ca*t will match cat, caaa.........aaaat but not ct

? - same as *, but it matches only 0 or 1 time. [Marking a character optional etc]
	eg : 1
	     ca?t will only match ct and cat

{m,n} - same as *, but it will match atleast m times and atmost n times
	 We can omit m or n, which will be presumed to be 0 and INFINITY respectively
	 	
		eg : 1
		     ca{1:3}t will match only cat, caat, caaat
{m} : specifies no of exact copies of previous RE
```

## [PYTHON SPECIFIC] Compiling Regex
``` txt
	import re

	p = re.compile('ab*')
	
	# OR

	p = re.compile('ab*', re.IGNORECASE) # IGNORECASE can be replaced with just re.I
	# Multiple flags can be specified by bitwise OR-ing them; re.I | re.M sets both the I and M flags

   	p.match("Hello, world")

	
	# OR
	re.match('ab*', "Hello, world") # Module level call
	# Module level call caches the compiled regex, such that it isn't compiled between each call
```

## Backspace Plague
``` txt
   	For \\se to be passed in regex, we need to use \\\\se because of string.
	Other alternative to overcome this is raw string denoted prefix r before string

	eg : 1
	     re.compile(r"\\se")
```

## Methods and Flags in Python
``` txt
   match() - Checks at start
   search() - Scan throughout string
   findall() - Scan all substring and return them as list of matching string (nothing else like span)
   finditer() - Scan all substring and return them as iterator (methods can be called on this like group(), start(), end() etc)

   match(), search() and finditer() functions returns a data defining range and other important infos and that can be accessed using following members

	     Method/Attribute                                         Purpose
   		group()					Return the string matched by the RE. Takes an optional attribute as string (for named group) or index(0 is the entire string).
		start()					Return the starting position of the match
		end()					Return the ending position of the match
		span()					Return a tuple containing the (start, end) positions of the match
		groupdict()				Return the named group in key : value in form of dictionary. [Only for Named Groups]

	

  Flag
	
	Attribute in re classes(Flag)	                    Meaning
	ASCII, A			Makes several escapes like \w, \b, \s and \d match only on ASCII characters with the respective property.
	DOTALL, S			Make . match any character, including newlines.
	IGNORECASE, I			Do case-insensitive matches.  Spam will match 'Spam', 'spam', 'spAM', or 'ſpam' (the latter is matched only in Unicode mode)
	LOCALE, L			Do a locale-aware match. Depending on the language in which query is typed. Discouraged to use as slower.
	MULTILINE, M			Multi-line matching, affecting ^ and $. ^ will check at start of each line and $ at end of each line rather than entire string.
	VERBOSE, X (for ‘extended’)	Enable verbose REs, which can be organized more cleanly and understandably. 
					Whitespaces are ignored expect when in character class or if using unscaped \.

	To insert flag without using re.compile use (?aiLmsux), but must be at start of string in Python  (>=v3.11)
	
	(?aiLmsux-imsx:...) : Will remove part of aiLmsux overlapping with imsx where aiLmsuxi is the corresponding flags

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

## More metacharacters

``` txt

| -> Alteration or OR operator.
	eg : 1
		Crow|Servo will match either 'Crow' or 'Servo'

^ -> Matches at beginning of string (at beginning of lines, if MULTILINE flag is set)
	eg : 1
		"^From" will match only in 'From Hi' but not in 'A From Hi'

$ -> match at the end of string / line (re.MULTILINE) or location before \n.
	eg : 1
		"}$" will match 'block}' and 'block}\n' but not 'block}  ' 

\A -> Matches at beginning of string not lines, ignoring re.MULTILINE flag

\Z -> Similar to \A, \Z matches only at end of string

\b -> This is a zero-width assertion that matches only at the beginning or end of a word. The end of a word is indicated by whitespace or a non-alphanumeric character.
	eg : 1
		p = re.compile(r"\bclass\b") # \b means backspace character with ascii 8, if string is not used as raw then unexpected issues may occur
		p.search('no class at all') # <re.Match object; span=(3, 8), match='class'>
		p.search('one subclass is') # None

\B -> Another zero-width assertion, this is the opposite of \b, only matching when the current position is not at a word boundary.
```
## Side Note

**Zero width assertion** : 
They don’t cause the engine to advance through the string; instead, they consume no characters at all, and simply succeed or fail.
This means that zero-width assertions should never be repeated, because if they match once at a given location, they can obviously be matched an infinite number of times.

## Grouping
``` txt

() -> To group content, to convey group of characters as a single entity
	eg : 1
		'(ab)*' will match 'ababababababab'
	     2
	      In Python, grouping is done starting with index value 0 which is entire regexp, 1 is the outermost group and so on goes on in nested structure. In simple words, group index is the count of bracket to that group from left.

	     	p = re.match(r'(ab(c))d', 'abcd')
		p.groups() # ('abcd', 'abc', 'c')
		p.group(1) # 'abc'
		p.group(1, 0) # ('abc', 'abcd') i.e., gives corresponding value of regex group

```

## Backreferences
``` txt
	Backreferences in a pattern allow you to specify that the contents of an earlier capturing group must also be found at the current location in the string. 
	For example, \1 will succeed if the exact contents of group 1 can be found at the current position, and fails otherwise.

	Not much useful while searching, but with string substitutions

	eg : 1 : Detecting doubled word in string

		p = re.compile(r'\b(\w+)\s+\1\b')
		p.search('Paris in the the spring').group()

```

## Non-capturing and named groups
``` txt

Helps access groups without using group index or number, just by a name.

(?:...) -> [... is nothing but the content of that group] Non capturing group i.e., groups are not added by index 
	eg : 1
		m = re.match("([abc])+", "abc")
		m.groups() # ('c',)

		m = re.match("(?:[abc])+", "abc")
		m.groups() # ()

There’s no performance difference in searching between capturing and non-capturing groups; neither form is any faster than the other.

(?P<name>...) -> [.. is just content to be grouped] [PYTHON SPECIFIC] Behave exactly like capturing group, but additionally associate a name with a group along with index.

	eg : 1
		p = re.compile(r'(?P<word>\b\w+\b)')
		m = p.search( '(((( Lots of punctuation )))' )

		m.group('word') # 'Lots'
		m.group(1) # 'Lots'

	   : 2

		m = re.match(r'(?P<first>\w+) (?P<last>\w+)', 'Jane Doe')
		m.groupdict() # {'first': 'Jane', 'last': 'Doe'}

```

## Backreferencing in named groups
``` txt

(?P=word) -> Backreferences the namedgroup 'word'.
	eg : 1
		p = re.compile(r'\b(?P<word>\w+)\s+(?P=word)\b')

		p.search('Paris in the the spring').group() # 'the the'

```

## Lockahead assertions
``` txt
ZERO-WIDTH ASSERTION : Engine doesn't advance to next characters while searching

(?=...) --> Positive Lookahead assertion. Succeeds if contained regexp successfully matches.
(?!...) --> Negative Lookahead assertion. Succeeds if contained regexp doesn't match at current position in string.
(?<=...) --> Lookbehind assertion. Succeeds if contained RE successfully matches for string behind current position. It will only check for fixed size, so a* or a+ etc are not allowed as Valid RE in this.
(?<!...) --> Negative lookbehind assertion. Succeeds if current position is not preceded by a match for ...
(?(id/name)yes-pattern|no-pattern) : Will try to match with yes-pattern if the group with given id or name exists, and with no-pattern if it doesn’t. no-pattern is optional and can be omitted.

	eg  : 1
		.*[.](?!bat$)[^.]*$  for checking filename.extension excluding bat extension
		  The negative lookahead means: if the expression bat doesn’t match at this point, try the rest of the pattern; 
		  if bat$ does match, the whole pattern will fail. 
		  The trailing $ is required to ensure that something like sample.batch, where the extension only starts with bat, will be allowed. 
		  The [^.]* makes sure that the pattern works when there are multiple dots in the filename.
		  
		  A similar solution without using lockhead would indeed look like this .*[.]([^b].?.?|.[^a]?.?|..?[^t]?|.{4,})$

	    : 2
	    	.*[.](?!bat$|exe$)[^.]*$
		Exclude both exe and bat extension


```

## Python specific methods
``` txt

.split(string, maxsplit=0) : Split the string into a list, splitting it wherever the RE matches. maxsplit is optional, but tell the count of max split to be performed(for non-zero value)

	eg : 1
		p = re.compile(r'\W+')
		p.split('This is a test, short and sweet, of split().') # ['This', 'is', 'a', 'test', 'short', 'and', 'sweet', 'of', 'split', '']
	 If capturing parentheses'( )' are used in the RE, then delimiter value(here ' ' space is also returned in list) are also returned as part of the list. 

.sub(replacement, string, count = 0) : Find all substrings where the RE matches, and replace them with a different string and returns it. count is an optional argument specifying maximum allowed substitutions

.subn() : Does the same thing as sub(), but returns the new string and the number of replacements

Empty matches are replaced only when they’re not adjacent to a previous empty match.

	p = re.compile('x*')

	p.sub('-', 'abxd') # '-a-b--d-'

NOTE : IN RUST the similar command will output, -a-b-d- rather than -a-b--d-

Backreferences while substitution are replaced with corresponding group in RE. 

\g<name> : use the substring matched by group named name
	eg : 1
		p = re.compile('section{ (?P<name> [^}]* ) }', re.VERBOSE)

		p.sub(r'subsection{\1}','section{First}') # 'subsection{First}'
		p.sub(r'subsection{\g<1>}','section{First}') # 'subsection{First}'
		p.sub(r'subsection{\g<name>}','section{First}')# 'subsection{First}'

Function too can be passed to sub function for replacement argument.

	eg : 1
		def hexrepl(match):

		    "Return the hex string for a decimal number"

		    value = int(match.group())

		    return hex(value)


		p = re.compile(r'\d+')

		p.sub(hexrepl, 'Call 65490 for printing, 49152 for user code.')
		'Call 0xffd2 for printing, 0xc000 for user code.'



(?i)... --> Case insensitive search
	eg : 1
		(?i)b+ matches bbbb, BBbB, B etc


PROBLEMS WITH re module :
Can be slower with fixed string matching / substitution

Use re.search() as it is more optimized than re.match() if first character is not to be searched

```

## Non-greedy quantifiers
``` txt

*? --> Replica of *, but tries to match as little text as possible
+? --> Replica of +, but tries to match as little text as possible
?? --> Replica of ?, but tries to match as little text as possible
{m,n}? --> Replica of {m,n} ,but tries to match as little text as possible

POSSESSIVE QUANTIFIERS '+ POSTFIX'
*+, ++, ?+ --> For *, +, ? . Unlike the true greedy quantifiers, these do not allow back-tracking when the expression following it fails to match. It will match maximum possible RE without backtracking.
	eg : 1
		"aa*+a" will not match aaaa, because a* will take all remaining 3 a.

DON'T USE WHITESPACES FOR STYLING UNLESS WITH re.VERBOSE
pat = re.compile(r"""
 \s*                 # Skip leading whitespace
 (?P<header>[^:]+)   # Header name
 \s* :               # Whitespace, and a colon
 (?P<value>.*?)      # The header's value -- *? used to
                     # lose the following trailing whitespace
 \s*$                # Trailing whitespace to end-of-line
""", re.VERBOSE)


SOME MORE RE

(?>...) --> Gulps maximum possible matching pattern

(?#...) --> Comments in RE

()

```

## Notes to self
Use HTML or XML parser module for parsing regex, instead of regex. (Because of edge-cases)

## Practice
- [Regex101](https://regex101.com/)

## Reference
- [Regex Python](https://docs.python.org/3/howto/regex.html#regex-howto)
- [re docs](https://docs.python.org/3/library/re.html)
