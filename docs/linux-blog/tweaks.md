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