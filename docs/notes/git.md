---
title: git not Github
description: Common git commands cheatsheet
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:image
      content: https://miro.medium.com/v2/resize:fit:3840/1*fDwzjCH3qzhosC6DVel4ng.jpeg
  - - meta
    - name: twitter:card
      content: summary_large_image
---
# git not GitHub

## git 101

### Initial Account Configuration

``` bash
git config --global --add user.name "MyName"
git config --global --add user.email "abc@gg.cc"
```

### Initialising a Git repository

``` bash
git init
```

### Adding files to staging area

``` bash
git add filename
git add --all
git add -A # Same as --all
git add .
```

### Restore the changes to status quo
``` bash
git restore .
git restore --staged . # To restore staged changes
```

###  To remove untracked files / directories
```bash
git clean -fd
```
-f - force
-d - directories too

### See current status, staged/unstaged files etc

``` bash
git status
git status --short
```

### Commit staged changes

``` bash
git commit -m "Better write good messages"
git commit -a -m "Merge without adding/staging"
git commit # Open the default editor set by $EDITOR
```

### View commit history

``` bash
git log
git log --oneline
git log --format=full --decorate --graph
```

### Last Commit Info

``` bash
git show
```

### Differences between commits/branch

``` bash
git diff first-branch second-branch
git diff # Show un-staged changes
```

### Getting help

``` bash
git commit --help
git help --all
```

### Removing a git repository
``` bash
cd intoTheDirectoryFolder
rm .git
```

## Branch

### Creating new branch

``` bash
git branch new-branch
```

### Moving to new branch/commit(time-travelling)

``` bash
git checkout new-branch
git checkout -b new-branch # New branch is created and choosed if -b is used
git checkout commithash # time travelling
```

Changing branches, changes files accordingly. So, `ls` will have different result in different branches.

### Merging branches

``` bash
git checkout master
git merge new # merge new into master
```

### Deleting branches

``` bash
git branch -d new
```

### List all branches

``` bash
git branch # List local branches
git branch -a # List all branches
git branch -r # For remote branches
```

### Switch to other branch

``` bash
git branch new 
git switch new # Alternative
```
### Create and switch to other branch

``` bash
git switch -c new 
```

## git with GitHub

### Connecting git to github

``` bash
git remote -v # List all remote refs
git remote add origin https://github.com/username/reponame.git # Add new remote ref
git remote set-url origin https://github.com/username/reponame.git # For editing
git remote get-url origin # For getting
git remote rename origin upstream # Renaming
git remote remove origin # Deleting
```

### Setting master to default branch and pushing changes to it

``` bash
git push --set-upstream origin master # Sending from master branch to origin
git push # For subsequent runs
git push origin branch-name
```

### Track changes from upstream

``` bash
git fetch origin # Changes need to merged, also
```

Git pull is a combination of fetch and merge

Use pull instead of fetch and merge together

``` bash
git pull origin
```

### See remote log

``` bash
git log origin/master
```

### Remote track a branch
To use a different remote branch, rather than the default one.

``` bash
git switch -c branchname origin/branchname
```

If used once locally, from next time, one can `checkout` or `switch` to that branch only.

### GitHub Flow
- Create a new Branch
- Make changes and add Commits
- Open a Pull Request
- Review
- Deploy
- Merge


## Working with credentials

### Cache credentials saved

``` bash
git config credential.helper cache
git push http://example.com/repo.git
```

### GCM for credentials

``` bash
git config --global credential.credentialStore secretservice
```

### Remove that GCM configuration

``` bash
git config --unset credential.helper
```

## GitHub : Forking and cloning

### Cloning a repo

``` bash
git clone url.git # use ssh rather than https one, if ssh has been setup
git clone url.git --depth=1 # Faster , latest commit only
```

::: info
Note: According to Git naming conventions, it is recommended to name your own repository origin, and the one you forked for upstream
origin : fork (R/W)
upstream : original (Read only)
:::

### Excluding files from tracking (.gitignore)
Git will not track files and folders specified in `.gitignore`. However, the `.gitignore` file itself is tracked by Git.
It is also possible to have additional `.gitignore` files in subdirectories. These only apply to files or folders within that directory.

It is also possible to ignore files or folders but not show it in the distributed .gitignore file.

These kinds of ignores are specified in the .git/info/exclude file. It works the same way as .gitignore but are not shown to anyone else.

Here are some basic gitignore syntax, one might find helpful

``` 
** : All directories check
* : All file check
? : Any single character
[a-z] : regex for single character
[!abc] : not a character from abc
name : Everything with name
```

## Red Zone
::: danger
Proceed with caution
:::

### Reverting an error
``` bash
git revert HEAD --no-edit # revert last change and commit --no-edit is to use last message only
git revert HEAD~x # where x is x+1th commit one wanna rollback to
```

### Squashing
``` bash
git rebase --interactive HEAD~n # n is the number of commit you want to squash
# calling above command will open a terminal
# replace `pick` with `s` to squash a commit i.e., to remove.
git push --force
```

### Amend a change to previous commit

Amend combines changes in the staging environment with the latest commit, and creates a new commit.
``` bash
git add filename # Add to staging area
git commit --amend # Used to modify the most recent commit.
```

### Amend and replace last commit

``` bash
git commit --amend -m "Added lines to README.md"
```

### Moving back n commits
``` bash
git reset --soft HEAD~n # Soft reset, n is the number of commit you want to reset 
git reset --hard HEAD~n # Hard reset, n is the number of commit you want to reset 
git push -f
```

### Reset
::: warning
Not recommended to used with remote repos
:::

``` bash
git reset commithash
```

- commithash being the first 7 characters of the commit hash we found in the log
- one can rollback the reset, if he/she knows the final hash

## See also
- [Learn Git - The easy way](https://animeshz.github.io/site/blogs/git.html#other-useful-stuffs)
- [Using git for effective collaboration ](https://animeshz.github.io/site/blogs/using-git-for-effective-collaboration.html)
- [W3 schools](https://www.w3schools.com/git/default.asp)
- [git Cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)
- [Getting started with git](https://docs.github.com/en/get-started/getting-started-with-git)
- [Official man pages](https://git-scm.com/docs/gittutorial)
- [Fight Rules for git](https://github.com/k88hudson/git-flight-rules)
- [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub)
