# Linux Drama


Apart from being the best gift to the mankind, Linux(sorry GNU/Linux) is highly extensible operating system. Compared to its competitors, like Windows and MacOS, Linux is created to sound more sane to the developers.

## Myths
![Bloated Window](data/bloated-os.jpg)
1. Linux is faster. (Truth is Windows is bloated)
2. Linux breaks things. (Kinda!)
3. Linux is secure. (You can't take everything for granted)
4. It's all about CLI.
5. I'm writing myths about Linux.

## Increase Battery Life on Linux

1. Install [auto-cpufreq](https://github.com/AdnanHodzic/auto-cpufreq#auto-cpufreq-installer). After Installation, run `sudo auto-cpufreq --install` in your terminal. This will performance a series of proccess optimisations on your PC. To verify the installation, you can use `auto-cpufreq --stats` to check if CPU frequency is always less than the max cpu frequency. If that's not the case run `auto-cpufreq --force=powersave`.

2. If having NVIDIA graphics card, start using [envycontrol](https://github.com/bayasdev/envycontrol#%EF%B8%8F-getting-envycontrol). Envycontrol is a utility tool that provides easy way to switch between GPU modes, namely integrated, hybrid and nvidia. It is more sane to be using integrated as the default case, unless doing hardcore gaming on your Linux System. For using integrated mode, use `sudo envycontrol -s integrated` after installing envycontrol. Then reboot.

- If you want to tap into performance mode, use `auto-cpufreq --force=performance` and `sudo envycontrol -s hybrid` or `sudo envycontrol -s nvidia`. Switching directly to nvidia from integrated mode might result in error. Users are advised to first switch to hybrid and then to nvidia mode


## Choosing right distro for beginner
A lone wolf exploring the deep sea in the world of Linux, is generally advised to start with something like Ubuntu, Kali Linux or Manjaro. I am deeply against it for a reason. You must be free to use your own Distro by yourself for a reason. Choose not what is popular, but what suits you most.

1. Debian based System: If you want stability, it should be your go to destination for you. I would recommend using `nala` instead of `apt` as package manager for better speed and UI. But, you will be missing extensive build system, faster package manager that doesn't sucks, the world of AUR's.

2. Fedora: If you want bleeding edge kernel releases with latest software, but with stability Fedora will be your go to destination. Using Debian based system, you will learn that they put back software from being the latest, for the stability cause, which is good if you require. But if you have brought some TechX latest dashing laptop, you will intrigued to know that Debian based system might not work well out of box, this is generally due to older Linux Version. For beginners, they contains a load of latest drivers in themselves. However, `dnf` is slower by default, unless you have some superfast high speed internet.


3. Arch based System: This is the zone where best of all world meet and didn't I tell you `I don't use Arch btw ;-)`. From a build system, that will break at every update, to super easy installation, Arch is go to destination for those who don't want to install and forget their OS's. Jokes aside, Arch has superfast package manager pacman, highest quality of documentation in ArchWiki, to extensive resources for all your needs in AUR. With latest Kernel, you are rest assured that you won't be having a problems with drivers, if any. However, if any present ArchWiki is there to help.


## Xorg or Wayland

With modern OS like Ubuntu shipping Wayland by default, it becomes important to know even what Wayland is.

As per what Wikipedia ***Wayland is a communication protocol that specifies the communication between a display server and its clients, as well as a C library implementation of that protocol***, unlike Xorg Wayland is aimed to be more secure by default, things like KeyLogging etc are more difficult in Wayland(but not impossible).

For a normal user, Xorg and Wayland shouldn't be much of concern, unless you join the dark side of Linux.
I personally prefer Xorg, because of its maturity. Wayland being a relatively newer protocol seems to be breakin things. I know a lot of Wayland enthusiast will argue regarding the same, but there is still time for wayland ecosystem to mature. Softwares like `touchegg` don't seem to work at all in Wayland.

At end I would advice going with your OS default for your display server protocol.

GNOME has full suport for Wayland. While KDE recently is joining the same league, it will good to see both of them in Wayland.

## GNOME or KDE or Xfce

Most beginner judge each distros is by how they look, but not how they function. I was also one of those initially. Look and customization are based on how good or bad your Desktop Environment(D.E.) is.

GNOME comes with saner deafults and beautiful UI, with very little customizability out of box.

KDE looks more like Windows 7, with tons of customizations available. If you want to take full control of UI, KDE will the right choice for you. Note that this priviledge, comes at a price of poor defaults and poor gesture support.

Xfce, the messiah of all 90's PC's in the world where RAM optimisations is took very little care of, Xfce is the angel in the desert of unforgiving sands. With Xfce, you can run it on any system with as low as 512MB RAM on the system.

In conclusion, if you have 4GB or less I will recommend going with Xfce. If less than 2GB, Xfce is probably your only option. For stronger systems, if you are Ricing guy, go with KDE, else GNOME.

## Dual Boot or Virtual Box

For a beginner, I would recommend starting with Virtual Box if your system specifications support that. Running in Virtual Box will ensure that they don't destroy their own system, trying tinkering with their distro. It is worthy to note that, Virtual Box may slow down your system due to high RAM usage, preferably dual boot your system as fast as possible. In course of time, if you started hating windows you can remove Windows altogether.

Common misconceptions with Dual Boot include that Dual Boot will lead to loss of data, which is certainly not.

::: info
It is advised to perform full system backup before installing Linux.
:::

## Choosing the Right Software 

One problem that most beginner face is lack of good UI for the default apps, so, it becomes important to choose right software. Down below are some of the software, I prefer to use. They will be easily available in your package manager or software center.

::: details For Developers
ripgrep: Search file content, useful to find a function etc.<br>
dust: Enhanced du<br>
delta: diff like tool to compare file <br>
colordiff: Colored diff<br>
fd-find or fd: CLI based File finding utility<br>
time: Resource analyser for a process<br>
shellcheck: A linter like tool for bash scripters<br>
valgrind: Check memory leaks<br>
btop: Nice terminal based process manager with great TUI<br>
python-pip: If you ever want that `pip install`<br>
ninja cmake: Build Systems<br>
nodejs yarn npm: For Web Developers<br>
sqlitebrowser: For all your sqlite needs but with GUI.<br>
mariadb or mysql: For all your MySQL needs<br>
mysql-workbench: To manage mysql for GUI<br>
jre17-openjdk-devel: For the JAVA developers<br>
discord: The platform of get all the help.<br>
cowsay banner: Say anything<br>
espeak-ng: TTS in terminal for fun<br>
docker: If you need it.<br>
tgpt: ChatGPT in Terminal<br>
visual-code-bin or code: VS Code, the text editor<br>
eclipse-java: IDE for JAVA developers<br>
android-studio: Experience the bloatverse in Linux<br>
pycharm-community-edition: For serious Python developers<br>
anaconda: For data scientists<br>
intellij-idea-community-edition: Better JAVA IDE by JetBrains<br>
:::


::: details Productivity
libreoffice-still gnumeric: MS Office is always jealous of this<br>
OnlyOffice: Office suite, but with much better GUI<br>
OBS: For all your recording and streaming needs.<br>
evince okular: PDF viewers<br>
lollypop: Great looking Music Player<br>
spotify: Another music player, but with those annonying ads<br>
kate: Text Editor, if you use KDE<br>
vlc kaffeine totem: Another Video Players<br>
qbittoreent: For all your torrenting needs.<br>
portmaster: A open source extensible firewall with GUI.(Highly recommeded for security)<br>
kwallermanager keepassxc: For saving passwords locally<br>
flatpak: Unlock tons of software from some another world gparted: Helps in partitions your drive<br>
eog gwenview shotwell: Some good Image Viewers<br>
gimp inkscape krita pinta darktable: Image Processing & editing tools but for free<br>
thunderbird: A highly sane email client.(Poor UI by deault, but can be modified)<br>
telegram-desktop whatsapp-for-linux: If you use telegram<br>
firefox: Go to Browser for you, with best security practice and better focus on privacy.<br>
Notejot: A beautiful notetaking application.
:::


![Fandom Linux](data/reference-meme.jpg)

## TBC


::: warning
Views are personal
:::