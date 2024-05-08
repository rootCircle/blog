---
title: nix package manager 
description: My initial impressions of using nix as package manager 
image: https://nixos.org/logo/nixos-logo-only-hires.png
---
# nix package manager

## Why?

1. Multiple versions support.
2. No missing dependencies issue. (at time of packaging)
3. Multi-user support with non-sudo install
4. Allows easy rollbacks and every updates are atomic (i.e., each update will not affect previous versions)
5. Garbage collector (removing unused packages files after uninstall)
6. Functional package language (Supports building variants of package independently, nix expression are deterministic : : building a Nix expression twice should yield the same result)
7. Install from source or using binaries also.
8. Huge plethora of existing packages
9. Managing build environments. (sets env vars etc)
10. Runs on macOS and Linux

::: info NixOS
It uses Nix not just for package management but also to manage the system configuration. This means, among other things, that it is easy to roll back the entire configuration of the system to an earlier state. 
:::

## Installation 

1. Install Nix

``` bash
bash <(curl -L https://nixos.org/nix/install) --daemon # Multi-user installation
```

::: info NOTE
Multi-user mode has one important limitation: only root and a set of trusted users specified in nix.conf can specify arbitrary binary caches. So while unprivileged users may install packages from arbitrary Nix expressions, they may not get pre-built binaries.
:::

2. Configuring Nix

``` bash
mkdir ~/.config/nix
echo "experimental-features = nix-command flakes" > ~/.config/nix/nix.conf
```

## Some Commands

### Roll Back to old version

``` bash
nix-env --upgrade --attr nixpkgs.some-package
nix-env --rollback
```

### Remove unused packages

``` bash
nix-env --uninstall firefox # package isn’t deleted from the system and is available for rollback
nix-collect-garbage
```

### Install from sourplethorace

``` bash
nix-env --install --attr nixpkgs.firefox
```

### Get all the dependencies of a package

``` bash
nix-shell '<nixpkgs>' --attr package-name
```

### Testing a package

It runs the package in testing bash environment.

``` bash
nix-shell --packages hello
```

### Update packages

``` bash
nix-channel --update nixpkgs
nix-env --upgrade '*'
```

### Rollback the package

``` bash
nix-env --rollback
```

### Delete old or uninstalled packages

``` bash
nix-collect-garbage --delete-old
```

## Upgrade Nix on Linux for Multi-user install (in sudo env)

``` bash
nix-channel --update; nix-env --install --attr nixpkgs.nix nixpkgs.cacert; systemctl daemon-reload; systemctl restart nix-daemon
```

## Uninstall Nix for Multi-User Linux env

1. Remove daemon, files, users and group
    ``` bash
    sudo systemctl stop nix-daemon.service
    sudo systemctl disable nix-daemon.socket nix-daemon.service
    sudo systemctl daemon-reload

    sudo rm -rf /etc/nix /etc/profile.d/nix.sh /etc/tmpfiles.d/nix-daemon.conf /nix ~root/.nix-channels ~root/.nix-defexpr ~root/.nix-profile

    for i in $(seq 1 32); do
    sudo userdel nixbld$i
    done
    sudo groupdel nixbld
    ```

2. Remove references

    There may also be references to Nix in

    - /etc/bash.bashrc
    - /etc/bashrc
    - /etc/profile
    - /etc/zsh/zshrc
    - /etc/zshrc

    which you may remove.

## References

- [Nix official docs](https://nixos.org/manual/nix/stable)
