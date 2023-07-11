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