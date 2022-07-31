# fishfetch
## _A screen fetcher but only with the important info_

"screenfetch" or "neofetch" when ran, they fill the entirety of the screen and also they are so slow.  
So I made my own with only the info that I want, and also is much more fast to load.

- Fast to load
- Small footprint
- Only the important info

if you download it some commands may not work based on your distro, you may have to tweak the commands a bit. The commands had been made for **20.04.1-Ubuntu**

![Screenshot](/img/screenshot.png)

And because I'm using Fish as a shell, the ascii-art is a cute fish

Also, there is an option for extended info

![Screenshot-large](/img/screenshot-large.png)


## Configure

### *make it runable on the path*

you may want to remove the .sh to the file, and make it runable with
```sh
chmod +x fishfetch
```

- **option A**
use `printenv PATH` or `echo $PATH` to see all locations where you can put the script,  
and put the script inside one of those
- **option B**
adding your own folder to the path where the script is.
    ```sh
    export PATH="$HOME/bin:$PATH"
    ```
    where `$HOME/bin` is your folder, or `~/bin`
    
### _how to configure it to boot when a terminal is launched_
- **using Bash**
just edit the `~/.bashrc` and at the end add:
    ```sh
    fishfetch   # if you set on the path
    # or
    ./path/to/fishfetch.sh # if you dont
    ```
- **using Fish**
create a file `~/.config/fish/config.fish` if it doesn't exist and add the same line
    ```sh
    fishfetch   # if you set on the path
    # or
    ./path/to/fishfetch.sh # if you dont
    ```
    
