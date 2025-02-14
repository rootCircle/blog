---
title: Cracking PDFs using hashcat and pdfcrack-ng
description: My attempt to crack PDF in a CTF contest
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:image
      content: https://www.lifewire.com/thmb/sC-xsCCN9WdW9l5h-T6XqpuPGR0=/5697x3446/filters:fill(auto,1)/hacker-with-laptop-922359280-5c32d4a546e0fb00011bb991.jpg
  - - meta
    - name: twitter:card
      content: summary_large_image
---

# Cracking PDFs using hashcat and pdfcrack-ng

::: info
For educational purpose only!
:::

I've recently explored the world of Capture The Flag competitions, where cracking PDF passwords is a common challenge. This blog shares my journey, strategies, and tools used to conquer encrypted PDFs. Join me to master the art of PDF cracking, whether you're a CTF veteran or a curious newcomer.

## Strategies

1. Researching is better than brute forcing : Brute force can take significant amount of time and is highly inefficient, so it's important to do some maths and reasoning before brute forcing.

2. Word-lists like rockyou.txt etc, can be also a great option.

3. Try to constraint your output range for password. 
    eg, Password will only contain uppercase letters or numbers etc

4. If nothing works out, brute force is the key.

## Tools

1. (Requires GPU)[hashcat](https://hashcat.net) : Super high speed hash cracking tool, if you got an GPU.

2. [john](https://www.openwall.com/john/) : Versatile tool-set, but we will use this for generating hashes from PDFs.

3. [pdfcrack-ng](https://github.com/MichaelSasser/pdfcrack-ng) : [pdfcrack](https://www.kali.org/tools/pdfcrack/) but a lot better, with baked in multi-threading support.

4. (Optional)[hydra](https://github.com/vanhauser-thc/thc-hydra) : Another password cracking tool.

5. [crunch](https://www.kali.org/tools/crunch/) : Word-list generator based on given pattern

## Getting Started

1. Download some common word-list
    ```bash
    wget https://download.weakpass.com/wordlists/90/rockyou.txt.gz
    
    wget https://download.weakpass.com/wordlists/1851/hashesorg2019.gz #Optional, but more comprehensive
    
    gunzip rockyou.txt.gz # Decompresses files
    gunzip hashesorg2019.gz
    ```
2. Generating Password Hash using pdf2john

    ```bash
    pdf2john filename.pdf > file.hash # Change filename.pdf with qualified name for your PDF
    ```
3. Copy the file hash

    ```bash
    cut -d ':' -f2 file.hash
    pdf2john filename.pdf | cut -d ':' -f2 | wl-copy
    ```
    Copy the file hash.

## Generating Wordlists using *crunch*

- 
    ```bash
    crunch <min-length> <max-length> -t <PATTERN> -o <OUTPUT-FILE> # Generate all combinations based on given Pattern 

    crunch <min-length> <max-length> -p <string1> ..... <string n> -o <OUTPUT-FILE> # Outputs permutations of Strings

    crunch <min length> <max-length> -f /wordlist.txt-o out.txt # Filter wordlist, not all combinations 

    # Example usage
    crunch 10 10 -t R,,,SH,VN, -o word.txt
    ```


- Patterns cheat-sheet
    ```
    , for all uppercase letters
    @ for all lowercase letters
    % for all numeric characters
    ^ for all special characters
    ```

## Dictionary Attacks

- Using pdfcrack-ng
    ```bash
    pdfcrack-ng -w wordlist.txt -t 12 <filename>.pdf
    ```

- Using hashcat
    ```bash
    hashcat -w 3 -S -a <copied hash here> ./rockyou.txt # Or any other wordlist
    ```

## Brute-forcing / Mask Attack

- Using Hashcat
    
    ```bash
    hashcat -w 3 -S -a 3 -m 10500 '<pdf-hash here>' '?u?u?u?u?u?u' --increment # Checking for 6 digit passwords containing upper case letters only!

    hashcat -w 3 -S -a 3 -m 10500 '<pdf-hash here>' 'ABC?u?u?u?u?u?u' # Start with ABC, without increment means fixed length password

    hashcat -w 3 -S -a 3 -m 10500 -O -1 'ABCDEF12345' '<pdf-hash here>' "?1?1?1?1?1?1?1?1?1?1?1?1?1" # Charset is ABCDEF12345 for 1 special symbol
    ```

    ?u : Uppercase letter
    ?l : Lowercase letter
    ?d : Digits
    ?s : Spaces


- Using pdfcrack-ng
    
    ```bash
    pdfcrack-ng -n 3 -m 10 -c "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" -t 12 <filename>.pdf
    ```
    -n : Minimum Length
    -m : Maximum Length
    -c : charset
    -t : no of threads
    

## Resources

- [Crunch Guide](https://www.geeksforgeeks.org/kali-linux-crunch-utility/)
- [Mask Attack](https://hashcat.net/wiki/doku.php?id=mask_attack)
- [Using hashcat and John the Ripper](https://blog.pentesteracademy.com/cracking-password-of-a-protected-pdf-file-using-hashcat-and-john-the-ripper-1b50074eeabd?gi=49f9f633b82c)
