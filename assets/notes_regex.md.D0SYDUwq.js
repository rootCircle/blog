import{_ as s,c as a,o as n,a5 as e}from"./chunks/framework.D_5JO0pl.js";const m=JSON.parse('{"title":"Regex 101","description":"Documented Regex as per Python re implementation","frontmatter":{"title":"Regex 101","description":"Documented Regex as per Python re implementation","image":"https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/coderpad-regex-the-complete-guide.jpg"},"headers":[],"relativePath":"notes/regex.md","filePath":"notes/regex.md"}'),t={name:"notes/regex.md"},p=e(`<h1 id="regexp-101" tabindex="-1">REGEXP 101 <a class="header-anchor" href="#regexp-101" aria-label="Permalink to &quot;REGEXP 101&quot;">​</a></h1><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Might fix the formatting later 😃</p></div><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>This is short compiled notes on regexp, based completely on Python Docs for the same topic. For more detailed explaination, visit <a href="https://docs.python.org/3/howto/regex.html#regex-howto" target="_blank" rel="noreferrer">here</a>.</p><h2 id="metacharcters" tabindex="-1">Metacharcters <a class="header-anchor" href="#metacharcters" aria-label="Permalink to &quot;Metacharcters&quot;">​</a></h2><p>They convey special meaning to the regular expression.</p><p>These are the list of metacharacters used in Python and in general.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>. ^ $ * + ? { } [ ] \\ | ( )</span></span></code></pre></div><table tabindex="0"><thead><tr><th style="text-align:center;">Symbols</th><th>Description</th></tr></thead><tbody><tr><td style="text-align:center;">[ABC]</td><td>Matches either of A or B or C</td></tr><tr><td style="text-align:center;">[A-Z]</td><td>Matches either of A to Z</td></tr><tr><td style="text-align:center;">[^5]</td><td>Match all except 5 (Caret must be at start)</td></tr><tr><td style="text-align:center;">[5^]</td><td>Match 5 or ^ (Metacharcter inside class has no special meaning)</td></tr><tr><td style="text-align:center;">\\</td><td>To espace any metacharacter or to convey special meaning like \\w</td></tr><tr><td style="text-align:center;">\\w</td><td>Matches any alphanumeric character, equivalent to [a-zA-Z0-9_]</td></tr><tr><td style="text-align:center;">\\d</td><td>Matches any digit, equivalent to [0-9]</td></tr><tr><td style="text-align:center;">\\D</td><td>Matches any non-digit character, equivalent to [^0-9]</td></tr><tr><td style="text-align:center;">\\s</td><td>Matches any whitespace character; this is equivalent to the class [ \\t\\n\\r\\f\\v] (including spaces)</td></tr><tr><td style="text-align:center;">\\S</td><td>Matches any non-whitespace character; this is equivalent to the class [^ \\t\\n\\r\\f\\v]</td></tr><tr><td style="text-align:center;">\\W</td><td>Matches any non-alphanumeric character; this is equivalent to the class [^a-zA-Z0-9_]</td></tr></tbody></table><p>These sequences can be used inside character class i.e., [] eg - [\\s,.]</p><p><em><strong>EVERY METACHARACTERS LOSE THEIR IDENTITY IN CHARACTER CLASSES</strong></em></p><h2 id="repeating-things" tabindex="-1">Repeating Things <a class="header-anchor" href="#repeating-things" aria-label="Permalink to &quot;Repeating Things&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>* - preceded by a character or a character class, * tries to match maximum( &gt;= 0) possible values of preeding syntax possible. </span></span>
<span class="line"><span>    Uses greedy algo i.e. tries to match maximum first then lesser and lesser and so on.</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>	     ca*t will match ct, cat, caat, caaaa....aat etc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	2 : a[bcd]*b in &#39;abcbd&#39;</span></span>
<span class="line"><span>	    Will try to match bcbd with [bcd]*b :-|</span></span>
<span class="line"><span>	    Then with &#39;abcb&#39; :-). This works so return the output.</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>+ - same as *, but it matches 1 or more times, rather than 0 or more</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>	     ca*t will match cat, caaa.........aaaat but not ct</span></span>
<span class="line"><span></span></span>
<span class="line"><span>? - same as *, but it matches only 0 or 1 time. [Marking a character optional etc]</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>	     ca?t will only match ct and cat</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{m,n} - same as *, but it will match atleast m times and atmost n times</span></span>
<span class="line"><span>	 We can omit m or n, which will be presumed to be 0 and INFINITY respectively</span></span>
<span class="line"><span>	 	</span></span>
<span class="line"><span>		eg : 1</span></span>
<span class="line"><span>		     ca{1:3}t will match only cat, caat, caaat</span></span>
<span class="line"><span>{m} : specifies no of exact copies of previous RE</span></span></code></pre></div><h2 id="python-specific-compiling-regex" tabindex="-1">[PYTHON SPECIFIC] Compiling Regex <a class="header-anchor" href="#python-specific-compiling-regex" aria-label="Permalink to &quot;[PYTHON SPECIFIC] Compiling Regex&quot;">​</a></h2><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> re</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    p </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> re.compile(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ab*&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # OR</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	p </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> re.compile(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ab*&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, re.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IGNORECASE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># IGNORECASE can be replaced with just re.I</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# Multiple flags can be specified by bitwise OR-ing them; re.I | re.M sets both the I and M flags</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   	p.match(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, world&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# OR</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	re.match(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ab*&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, world&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Module level call</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# Module level call caches the compiled regex, such that it isn&#39;t compiled between each call</span></span></code></pre></div><h2 id="backspace-plague" tabindex="-1">Backspace Plague <a class="header-anchor" href="#backspace-plague" aria-label="Permalink to &quot;Backspace Plague&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>   	For \\\\se to be passed in regex, we need to use \\\\\\\\se because of string.</span></span>
<span class="line"><span>	Other alternative to overcome this is raw string denoted prefix r before string</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>	     re.compile(r&quot;\\\\se&quot;)</span></span></code></pre></div><h2 id="methods-and-flags-in-python" tabindex="-1">Methods and Flags in Python <a class="header-anchor" href="#methods-and-flags-in-python" aria-label="Permalink to &quot;Methods and Flags in Python&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>   match() - Checks at start</span></span>
<span class="line"><span>   search() - Scan throughout string</span></span>
<span class="line"><span>   findall() - Scan all substring and return them as list of matching string (nothing else like span)</span></span>
<span class="line"><span>   finditer() - Scan all substring and return them as iterator (methods can be called on this like group(), start(), end() etc)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   match(), search() and finditer() functions returns a data defining range and other important infos and that can be accessed using following members</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	     Method/Attribute                                         Purpose</span></span>
<span class="line"><span>   		group()					Return the string matched by the RE. Takes an optional attribute as string (for named group) or index(0 is the entire string).</span></span>
<span class="line"><span>		start()					Return the starting position of the match</span></span>
<span class="line"><span>		end()					Return the ending position of the match</span></span>
<span class="line"><span>		span()					Return a tuple containing the (start, end) positions of the match</span></span>
<span class="line"><span>		groupdict()				Return the named group in key : value in form of dictionary. [Only for Named Groups]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Flag</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	Attribute in re classes(Flag)	                    Meaning</span></span>
<span class="line"><span>	ASCII, A			Makes several escapes like \\w, \\b, \\s and \\d match only on ASCII characters with the respective property.</span></span>
<span class="line"><span>	DOTALL, S			Make . match any character, including newlines.</span></span>
<span class="line"><span>	IGNORECASE, I			Do case-insensitive matches.  Spam will match &#39;Spam&#39;, &#39;spam&#39;, &#39;spAM&#39;, or &#39;ſpam&#39; (the latter is matched only in Unicode mode)</span></span>
<span class="line"><span>	LOCALE, L			Do a locale-aware match. Depending on the language in which query is typed. Discouraged to use as slower.</span></span>
<span class="line"><span>	MULTILINE, M			Multi-line matching, affecting ^ and $. ^ will check at start of each line and $ at end of each line rather than entire string.</span></span>
<span class="line"><span>	VERBOSE, X (for ‘extended’)	Enable verbose REs, which can be organized more cleanly and understandably. </span></span>
<span class="line"><span>					Whitespaces are ignored expect when in character class or if using unscaped \\.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	To insert flag without using re.compile use (?aiLmsux), but must be at start of string in Python  (&gt;=v3.11)</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	(?aiLmsux-imsx:...) : Will remove part of aiLmsux overlapping with imsx where aiLmsuxi is the corresponding flags</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	charref = re.compile(r&quot;&quot;&quot;</span></span>
<span class="line"><span> 	&amp;[#]                # Start of a numeric entity reference</span></span>
<span class="line"><span> 	(</span></span>
<span class="line"><span>	     0[0-7]+         # Octal form</span></span>
<span class="line"><span>	   | [0-9]+          # Decimal form</span></span>
<span class="line"><span>	   | x[0-9a-fA-F]+   # Hexadecimal form</span></span>
<span class="line"><span>	 )</span></span>
<span class="line"><span>	 ;                   # Trailing semicolon</span></span>
<span class="line"><span>	&quot;&quot;&quot;, re.VERBOSE)</span></span></code></pre></div><h2 id="more-metacharacters" tabindex="-1">More metacharacters <a class="header-anchor" href="#more-metacharacters" aria-label="Permalink to &quot;More metacharacters&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>| -&gt; Alteration or OR operator.</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		Crow|Servo will match either &#39;Crow&#39; or &#39;Servo&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>^ -&gt; Matches at beginning of string (at beginning of lines, if MULTILINE flag is set)</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		&quot;^From&quot; will match only in &#39;From Hi&#39; but not in &#39;A From Hi&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ -&gt; match at the end of string / line (re.MULTILINE) or location before \\n.</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		&quot;}$&quot; will match &#39;block}&#39; and &#39;block}\\n&#39; but not &#39;block}  &#39; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>\\A -&gt; Matches at beginning of string not lines, ignoring re.MULTILINE flag</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\\Z -&gt; Similar to \\A, \\Z matches only at end of string</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\\b -&gt; This is a zero-width assertion that matches only at the beginning or end of a word. The end of a word is indicated by whitespace or a non-alphanumeric character.</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		p = re.compile(r&quot;\\bclass\\b&quot;) # \\b means backspace character with ascii 8, if string is not used as raw then unexpected issues may occur</span></span>
<span class="line"><span>		p.search(&#39;no class at all&#39;) # &lt;re.Match object; span=(3, 8), match=&#39;class&#39;&gt;</span></span>
<span class="line"><span>		p.search(&#39;one subclass is&#39;) # None</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\\B -&gt; Another zero-width assertion, this is the opposite of \\b, only matching when the current position is not at a word boundary.</span></span></code></pre></div><h2 id="side-note" tabindex="-1">Side Note <a class="header-anchor" href="#side-note" aria-label="Permalink to &quot;Side Note&quot;">​</a></h2><p><strong>Zero width assertion</strong> : They don’t cause the engine to advance through the string; instead, they consume no characters at all, and simply succeed or fail. This means that zero-width assertions should never be repeated, because if they match once at a given location, they can obviously be matched an infinite number of times.</p><h2 id="grouping" tabindex="-1">Grouping <a class="header-anchor" href="#grouping" aria-label="Permalink to &quot;Grouping&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>() -&gt; To group content, to convey group of characters as a single entity</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		&#39;(ab)*&#39; will match &#39;ababababababab&#39;</span></span>
<span class="line"><span>	     2</span></span>
<span class="line"><span>	      In Python, grouping is done starting with index value 0 which is entire regexp, 1 is the outermost group and so on goes on in nested structure. In simple words, group index is the count of bracket to that group from left.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	     	p = re.match(r&#39;(ab(c))d&#39;, &#39;abcd&#39;)</span></span>
<span class="line"><span>		p.groups() # (&#39;abcd&#39;, &#39;abc&#39;, &#39;c&#39;)</span></span>
<span class="line"><span>		p.group(1) # &#39;abc&#39;</span></span>
<span class="line"><span>		p.group(1, 0) # (&#39;abc&#39;, &#39;abcd&#39;) i.e., gives corresponding value of regex group</span></span></code></pre></div><h2 id="backreferences" tabindex="-1">Backreferences <a class="header-anchor" href="#backreferences" aria-label="Permalink to &quot;Backreferences&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	Backreferences in a pattern allow you to specify that the contents of an earlier capturing group must also be found at the current location in the string. </span></span>
<span class="line"><span>	For example, \\1 will succeed if the exact contents of group 1 can be found at the current position, and fails otherwise.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	Not much useful while searching, but with string substitutions</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	eg : 1 : Detecting doubled word in string</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		p = re.compile(r&#39;\\b(\\w+)\\s+\\1\\b&#39;)</span></span>
<span class="line"><span>		p.search(&#39;Paris in the the spring&#39;).group()</span></span></code></pre></div><h2 id="non-capturing-and-named-groups" tabindex="-1">Non-capturing and named groups <a class="header-anchor" href="#non-capturing-and-named-groups" aria-label="Permalink to &quot;Non-capturing and named groups&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>Helps access groups without using group index or number, just by a name.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(?:...) -&gt; [... is nothing but the content of that group] Non capturing group i.e., groups are not added by index </span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		m = re.match(&quot;([abc])+&quot;, &quot;abc&quot;)</span></span>
<span class="line"><span>		m.groups() # (&#39;c&#39;,)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		m = re.match(&quot;(?:[abc])+&quot;, &quot;abc&quot;)</span></span>
<span class="line"><span>		m.groups() # ()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>There’s no performance difference in searching between capturing and non-capturing groups; neither form is any faster than the other.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(?P&lt;name&gt;...) -&gt; [.. is just content to be grouped] [PYTHON SPECIFIC] Behave exactly like capturing group, but additionally associate a name with a group along with index.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		p = re.compile(r&#39;(?P&lt;word&gt;\\b\\w+\\b)&#39;)</span></span>
<span class="line"><span>		m = p.search( &#39;(((( Lots of punctuation )))&#39; )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		m.group(&#39;word&#39;) # &#39;Lots&#39;</span></span>
<span class="line"><span>		m.group(1) # &#39;Lots&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	   : 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		m = re.match(r&#39;(?P&lt;first&gt;\\w+) (?P&lt;last&gt;\\w+)&#39;, &#39;Jane Doe&#39;)</span></span>
<span class="line"><span>		m.groupdict() # {&#39;first&#39;: &#39;Jane&#39;, &#39;last&#39;: &#39;Doe&#39;}</span></span></code></pre></div><h2 id="backreferencing-in-named-groups" tabindex="-1">Backreferencing in named groups <a class="header-anchor" href="#backreferencing-in-named-groups" aria-label="Permalink to &quot;Backreferencing in named groups&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>(?P=word) -&gt; Backreferences the namedgroup &#39;word&#39;.</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		p = re.compile(r&#39;\\b(?P&lt;word&gt;\\w+)\\s+(?P=word)\\b&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		p.search(&#39;Paris in the the spring&#39;).group() # &#39;the the&#39;</span></span></code></pre></div><h2 id="lockahead-assertions" tabindex="-1">Lockahead assertions <a class="header-anchor" href="#lockahead-assertions" aria-label="Permalink to &quot;Lockahead assertions&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ZERO-WIDTH ASSERTION : Engine doesn&#39;t advance to next characters while searching</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(?=...) --&gt; Positive Lookahead assertion. Succeeds if contained regexp successfully matches.</span></span>
<span class="line"><span>(?!...) --&gt; Negative Lookahead assertion. Succeeds if contained regexp doesn&#39;t match at current position in string.</span></span>
<span class="line"><span>(?&lt;=...) --&gt; Lookbehind assertion. Succeeds if contained RE successfully matches for string behind current position. It will only check for fixed size, so a* or a+ etc are not allowed as Valid RE in this.</span></span>
<span class="line"><span>(?&lt;!...) --&gt; Negative lookbehind assertion. Succeeds if current position is not preceded by a match for ...</span></span>
<span class="line"><span>(?(id/name)yes-pattern|no-pattern) : Will try to match with yes-pattern if the group with given id or name exists, and with no-pattern if it doesn’t. no-pattern is optional and can be omitted.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	eg  : 1</span></span>
<span class="line"><span>		.*[.](?!bat$)[^.]*$  for checking filename.extension excluding bat extension</span></span>
<span class="line"><span>		  The negative lookahead means: if the expression bat doesn’t match at this point, try the rest of the pattern; </span></span>
<span class="line"><span>		  if bat$ does match, the whole pattern will fail. </span></span>
<span class="line"><span>		  The trailing $ is required to ensure that something like sample.batch, where the extension only starts with bat, will be allowed. </span></span>
<span class="line"><span>		  The [^.]* makes sure that the pattern works when there are multiple dots in the filename.</span></span>
<span class="line"><span>		  </span></span>
<span class="line"><span>		  A similar solution without using lockhead would indeed look like this .*[.]([^b].?.?|.[^a]?.?|..?[^t]?|.{4,})$</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	    : 2</span></span>
<span class="line"><span>	    	.*[.](?!bat$|exe$)[^.]*$</span></span>
<span class="line"><span>		Exclude both exe and bat extension</span></span></code></pre></div><h2 id="python-specific-methods" tabindex="-1">Python specific methods <a class="header-anchor" href="#python-specific-methods" aria-label="Permalink to &quot;Python specific methods&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>.split(string, maxsplit=0) : Split the string into a list, splitting it wherever the RE matches. maxsplit is optional, but tell the count of max split to be performed(for non-zero value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		p = re.compile(r&#39;\\W+&#39;)</span></span>
<span class="line"><span>		p.split(&#39;This is a test, short and sweet, of split().&#39;) # [&#39;This&#39;, &#39;is&#39;, &#39;a&#39;, &#39;test&#39;, &#39;short&#39;, &#39;and&#39;, &#39;sweet&#39;, &#39;of&#39;, &#39;split&#39;, &#39;&#39;]</span></span>
<span class="line"><span>	 If capturing parentheses&#39;( )&#39; are used in the RE, then delimiter value(here &#39; &#39; space is also returned in list) are also returned as part of the list. </span></span>
<span class="line"><span></span></span>
<span class="line"><span>.sub(replacement, string, count = 0) : Find all substrings where the RE matches, and replace them with a different string and returns it. count is an optional argument specifying maximum allowed substitutions</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.subn() : Does the same thing as sub(), but returns the new string and the number of replacements</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Empty matches are replaced only when they’re not adjacent to a previous empty match.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	p = re.compile(&#39;x*&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	p.sub(&#39;-&#39;, &#39;abxd&#39;) # &#39;-a-b--d-&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>NOTE : IN RUST the similar command will output, -a-b-d- rather than -a-b--d-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Backreferences while substitution are replaced with corresponding group in RE. </span></span>
<span class="line"><span></span></span>
<span class="line"><span>\\g&lt;name&gt; : use the substring matched by group named name</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		p = re.compile(&#39;section{ (?P&lt;name&gt; [^}]* ) }&#39;, re.VERBOSE)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		p.sub(r&#39;subsection{\\1}&#39;,&#39;section{First}&#39;) # &#39;subsection{First}&#39;</span></span>
<span class="line"><span>		p.sub(r&#39;subsection{\\g&lt;1&gt;}&#39;,&#39;section{First}&#39;) # &#39;subsection{First}&#39;</span></span>
<span class="line"><span>		p.sub(r&#39;subsection{\\g&lt;name&gt;}&#39;,&#39;section{First}&#39;)# &#39;subsection{First}&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Function too can be passed to sub function for replacement argument.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		def hexrepl(match):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		    &quot;Return the hex string for a decimal number&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		    value = int(match.group())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		    return hex(value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>		p = re.compile(r&#39;\\d+&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		p.sub(hexrepl, &#39;Call 65490 for printing, 49152 for user code.&#39;)</span></span>
<span class="line"><span>		&#39;Call 0xffd2 for printing, 0xc000 for user code.&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>(?i)... --&gt; Case insensitive search</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		(?i)b+ matches bbbb, BBbB, B etc</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>PROBLEMS WITH re module :</span></span>
<span class="line"><span>Can be slower with fixed string matching / substitution</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Use re.search() as it is more optimized than re.match() if first character is not to be searched</span></span></code></pre></div><h2 id="non-greedy-quantifiers" tabindex="-1">Non-greedy quantifiers <a class="header-anchor" href="#non-greedy-quantifiers" aria-label="Permalink to &quot;Non-greedy quantifiers&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>*? --&gt; Replica of *, but tries to match as little text as possible</span></span>
<span class="line"><span>+? --&gt; Replica of +, but tries to match as little text as possible</span></span>
<span class="line"><span>?? --&gt; Replica of ?, but tries to match as little text as possible</span></span>
<span class="line"><span>{m,n}? --&gt; Replica of {m,n} ,but tries to match as little text as possible</span></span>
<span class="line"><span></span></span>
<span class="line"><span>POSSESSIVE QUANTIFIERS &#39;+ POSTFIX&#39;</span></span>
<span class="line"><span>*+, ++, ?+ --&gt; For *, +, ? . Unlike the true greedy quantifiers, these do not allow back-tracking when the expression following it fails to match. It will match maximum possible RE without backtracking.</span></span>
<span class="line"><span>	eg : 1</span></span>
<span class="line"><span>		&quot;aa*+a&quot; will not match aaaa, because a* will take all remaining 3 a.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DON&#39;T USE WHITESPACES FOR STYLING UNLESS WITH re.VERBOSE</span></span>
<span class="line"><span>pat = re.compile(r&quot;&quot;&quot;</span></span>
<span class="line"><span> \\s*                 # Skip leading whitespace</span></span>
<span class="line"><span> (?P&lt;header&gt;[^:]+)   # Header name</span></span>
<span class="line"><span> \\s* :               # Whitespace, and a colon</span></span>
<span class="line"><span> (?P&lt;value&gt;.*?)      # The header&#39;s value -- *? used to</span></span>
<span class="line"><span>                     # lose the following trailing whitespace</span></span>
<span class="line"><span> \\s*$                # Trailing whitespace to end-of-line</span></span>
<span class="line"><span>&quot;&quot;&quot;, re.VERBOSE)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>SOME MORE RE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(?&gt;...) --&gt; Gulps maximum possible matching pattern</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(?#...) --&gt; Comments in RE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>()</span></span></code></pre></div><h2 id="notes-to-self" tabindex="-1">Notes to self <a class="header-anchor" href="#notes-to-self" aria-label="Permalink to &quot;Notes to self&quot;">​</a></h2><p>Use HTML or XML parser module for parsing regex, instead of regex. (Because of edge-cases)</p><h2 id="practice" tabindex="-1">Practice <a class="header-anchor" href="#practice" aria-label="Permalink to &quot;Practice&quot;">​</a></h2><ul><li><a href="https://regex101.com/" target="_blank" rel="noreferrer">Regex101</a></li></ul><h2 id="reference" tabindex="-1">Reference <a class="header-anchor" href="#reference" aria-label="Permalink to &quot;Reference&quot;">​</a></h2><ul><li><a href="https://docs.python.org/3/howto/regex.html#regex-howto" target="_blank" rel="noreferrer">Regex Python</a></li><li><a href="https://docs.python.org/3/library/re.html" target="_blank" rel="noreferrer">re docs</a></li><li><a href="https://github.com/rust-lang/regex/discussions/1164" target="_blank" rel="noreferrer">Python&#39;s inconsistent behavior with empty matches with the Rust&#39;s regex crate</a></li></ul>`,43),i=[p];function l(c,r,o,h,d,g){return n(),a("div",null,i)}const b=s(t,[["render",l]]);export{m as __pageData,b as default};
