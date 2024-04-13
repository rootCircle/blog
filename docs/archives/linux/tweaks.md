# Tweaks

## Showing Desktop Icons in GNOME 44

[Source](https://gitlab.gnome.org/GNOME/nautilus/-/issues/158#alternative-solution)
::: info
It is important to note that the following writeup has been found to be entirely copied from a [website](https://gitlab.gnome.org/GNOME/nautilus/-/issues/158#alternative-solution) and is being kept here solely for archival purposes.
:::

1. Install nemo from your distribution's repositories. On Arch, enter this command on the Terminal application:
    ``` bash
    sudo pacman -S nemo
    ```

2. Open a text editor and copy the following text into a new empty file:
    ``` ini
    [Desktop Entry]
    Type=Application
    Name=Nemo
    Comment=Start Nemo desktop at log in
    Exec=nemo-desktop
    OnlyShowIn=GNOME;
    AutostartCondition=GSettings org.nemo.desktop show-desktop-icons
    X-GNOME-AutoRestart=true
    NoDisplay=true
    ```

3. Save the text file as ```~/.config/autostart/nemo-autostart-with-gnome.desktop```


4. Optional step:
    In case you want Nemo to behave more similarly to nautilus desktop layout, you can enable the setting running this command on the terminal:
    ``` bash
    gsettings set org.nemo.desktop use-desktop-grid false
    ```

Voila!
And that's it!
Next time you log in, nemo will automatically display icons over the desktop background.
If you don't want to log out, you can also manually start it using the Alt+F2 prompt to run nemo-desktop

## Poor VSCode loading time on Windows

Just add VScode executable `code.exe` to your antivirus exception list and see if it works!

## mysql connector issues with mariadb

```Date : 11 July, 2023```

Springboot and probably other systems are failing issues connecting to mariadb on latest releases.

Issues is attributed with recent mariadb-11.X update that caused mysql-connector to break attributed to `tx_isolation` after MySQL 8.0 update.

To fix that : 

1. Install `downgrade` from AUR (for Arch based systems).
    
    ``` bash
    yay -S downgrade
    ```

2. Downgrade mariadb to `10.10.3`. You can add these package to IGNORE by choosing them on prompt while downgrading.

    ``` bash
    systemctl stop mariadb
    sudo pacman -Rs mariadb
    sudo downgrade "mariadb-libs=10.10.3" "mariadb-clients=10.10.3" "mariadb=10.10.3"
    sudo systemctl enable --now mariadb
    ```

3. Check if mariadb is working or not. Use old password for same.
    
    ``` bash
    mariadb -u root -p
    ```

4. If that doesn't work, reset the configuration 

    ::: danger
    Data loss!
    :::

    ``` bash
    sudo bash
    systemctl stop mariadb
    rm /var/lib/mysql
    mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
    mariadb -u root -p
    MariaDB [mysql]> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password'; # new_password is your new sql password
    sudo systemctl enable --now mariadb
    ```

5. Alternatively, you can reset your mysql password

    i) Stop mariadb.service.
    
    ii) Start the MariaDB server with safety features:

    ``` bash
    sudo bash
    mariadbd-safe --skip-grant-tables --skip-networking &
    ```

    iii) Connect to it:

    ``` bash
    mariadb -u root
    ```

    iv) Change root password:

    ``` bash
    MariaDB [mysql]> FLUSH PRIVILEGES;
    MariaDB [mysql]> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
    MariaDB [mysql]> exit
    ```

    v) Kill running mariadbd* processes:

    ``` bash
    kill $(cat /var/lib/mysql/$HOSTNAME.pid)
    ```

    vi) Start mariadb.service.

## Window Subsystem for Linux (WSL) Common Troubleshooting Steps

Fixing common installation issues with WSL for Windows 11 (and also Windows 10) users.

1. **ERROR :** `Failed to attack disk........vhdx'`

    **SOLUTION**

    ``` powershell
    wsl --unregister ubuntu
    wsl --install
    ```

2. **ERROR :** `WslRegistrationDistribution failed  with error...........WSL2 requires an update to its kernel component`

    **SOLUTION**

    Download this and install [WSL Kernel Component](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi), then restart your PC and then again open Powershell and run WSL, it might work now!

3. **ERROR :** `Failed to fetch distribution list from ......raw.githubusercontent.com.........`
        
    *OR*

    `A connection with server failed to established`
    
    **SOLUTION** 

    Download and install [Warp](https://cloudflarewarp.com/), alternatively you can set your Preferred DNS Address to 1.1.1.1 in IP settings.

    It might also be related to disabled windows features, so do check that out too.

4. **General Errors :** Disabled Windows Features

    **SOLUTION**

    i)  Open `Turn Windows features on or off` (Use Windows Search for finding it)

    ii) Ensure `Virtual Machine Platform` and `Windows Subsystem for Linux` box is checked

    iii) Restart and again try installing WSL

5. **ERROR :** `Distribution is not installed.......`
    
    **SOLUTION**
    
    Run `wsl --install --d Ubuntu` in powershell and wait.

6. **ERROR :** Invalid Username on registration

    **SOLUTION**

    Username can't contain spaces or capital letters (alternatively you can use dashes etc).

### Sidenote

Remember the login password

## logseq and git

::: info
For some reasons, logseq + git doesn't work the same as it should with flatpak
:::

For logseq installed using system package, to push a commit using ssh in arch linux

1. Make sure you have the necessary git plugins installed in logseq from plugin marketplace.

2. If you're using ssh for git, you might be getting errors like `ssh_askpass: exec(/usr/bin/ssh-askpass): No such file or directory`. For resolving those, a workaround is to install `ksshaskpass` and symlink `/usr/bin/ssh-askpass` to ksshaskpass.

    ```bash
    sudo pacman -S ksshaskpass
    sudo ln -s $(which ksshaskpass) /usr/bin/ssh-askpass
    ```

## Next.js 13 crashing the entire PC on Linux
    
  ```bash
  systemd-run --scope -p MemoryLimit=1500M npm run dev
  ```
