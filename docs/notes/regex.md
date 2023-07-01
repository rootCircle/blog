# REGEXP 101

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

### EVERY METACHARACTERS LOSE THEIR IDENTITY IN CHARACTER CLASSES 



## REPEATING THINGS
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

{m, n} - same as *, but it will match atleast m times and atmost n times
	 We can omit m or n, which will be presumeed to be 0 and INFINITY respectively
	 	
		eg : 1
		     ca{1:3}t will match only cat, caat, caaat


[PYTHON SPECIFIC] COMILATION
	import re

	p = re.compile('ab*')
	
	# OR

	p = re.compile('ab*', re.IGNORECASE) # IGNORECASE can be replaced with just re.I
	# Multiple flags can be specified by bitwise OR-ing them; re.I | re.M sets both the I and M flags

   	p.match("Hello, world")

	
	# OR
	re.match('ab*', "Hello, world") # Module level call
	# Module level call caches the compiled regex, such that it isn't compiled between each call

   BACKSPACE Plague
   	For \\se to be passed in regex, we need to use \\\\se because of string.
	Other alternative to overcome this is raw string denoted prefix r before string

	eg : 1
	     re.compile(r"\\se")
	
   match() - Checks at start
   search() - Scan throughout string
   findall() - Scan all substring and return them as list of matching string (nothing else like span)
   finditer() - Scan all substring and return them as iterator (methods can be called on this like group(), start(), end() etc)

   match(), search() and finditer() functions returns a data defining range and other important infos and that can be accessed using following members

	     Method/Attribute                                         Purpose
   		group()					Return the string matched by the RE
		start()					Return the starting position of the match
		end()					Return the ending position of the match
		span()					Return a tuple containing the (start, end) positions of the match

	

  Flag
	
	Attribute in re classes(Flag)	                    Meaning
	ASCII, A			Makes several escapes like \w, \b, \s and \d match only on ASCII characters with the respective property.
	DOTALL, S			Make . match any character, including newlines.
	IGNORECASE, I			Do case-insensitive matches.  Spam will match 'Spam', 'spam', 'spAM', or 'ſpam' (the latter is matched only in Unicode mode)
	LOCALE, L			Do a locale-aware match. Depending on the language in which query is typed. Discouraged to use as slower.
	MULTILINE, M			Multi-line matching, affecting ^ and $. ^ will check at start of each line and $ at end of each line rather than entire string.
	VERBOSE, X (for ‘extended’)	Enable verbose REs, which can be organized more cleanly and understandably. 
					Whitespaces are ignored expect when in character class or if using unscaped \.



	charref = re.compile(r"""
 	&[#]                # Start of a numeric entity reference
 	(
	     0[0-7]+         # Octal form
	   | [0-9]+          # Decimal form
	   | x[0-9a-fA-F]+   # Hexadecimal form
	 )
	 ;                   # Trailing semicolon
	""", re.VERBOSE)


MORE METACHARACTERS

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

NOTE
1. Zero width assertion
	They don’t cause the engine to advance through the string; instead, they consume no characters at all, and simply succeed or fail.
	This means that zero-width assertions should never be repeated, because if they match once at a given location, they can obviously be matched an infinite number of times.


GROUPING

() -> To group content, to convey group of characters as a single entity
	eg : 1
		'(ab)*' will match 'ababababababab'
	     2
	      In Python, grouping is done starting with index value 0 which is entire regexp, 1 is the outermost group and so on goes on in nested structure. In simple words, group index is the count of bracket to that group from left.

	     	p = re.match(r'(ab(c))d', 'abcd')
		p.groups() # ('abcd', 'abc', 'c')
		p.group(1) # 'abc'
		p.group(1, 0) # ('abc', 'abcd') i.e., gives corresponding value of regex group



