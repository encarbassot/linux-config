# THE SHELL
### a Friendly Interactive SHell + Starship

[visit Fish Shell Github](https://github.com/fish-shell/fish-shell)\
[visit starship promtp](https://starship.rs/)


    

to list all your shells you can do `cat /etc/shells`

### Also I created a small fishfetch
a neofetch style but smaller, easy customizable and much more faster  

see it [here](fishfetch/README.md)

![Screenshot](/img/screenshot.png)

## FISH
1. install:
    ```bash
    sudo apt install fish
    ```
2. enable :
    ```bash
    chsh -s /usr/bin/fish
    ```
3.  disable greeting
    ```bash
    nano ~/.config/fish/functions/fish_greeting.fish
    ```

### fish configuration 
#### `~/.config/fish/config.fish`

```bash
if status is-interactive
    # Commands to run in interactive sessions can go here
    fishfetch
end

starhip init fish | source
```

## Starship
its a super customizable prompt for the shell\
#### `~/.config/starship.toml`

```bash
add_newline = false


[line_break]
disabled = true

[character]
success_symbol = "[↪ ](bold green)"
```
