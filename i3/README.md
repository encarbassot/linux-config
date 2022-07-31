## I3 Window Manager
installation as simple as run:
`sudo apt install i3`
then, logout, and in the login menu search for a little gear icon, to select i3

![selectWM](/img/selectWM.png)

#### table of contents
- [Wallpaper](#wallpaper)
- [Touchpad](#touchpad)
- [Screenshots](#screenshots)
- [Power Button](#power-button)
- [Keyboard Layout](#keyboard-layout)
- [Brightness](#brightness)

# Wallpaper
- install FEH ```sudo apt install feh```
- and include the next line i
n `~/.congig/i3/config`
  - `exec --no-startup-id feh --bg-fill ~/Pictures/Wallpapers/hasbullah.jpg`

# TouchPad
to change some functionalites of the touchpad fist run `xinput` and you will se a list of devices, remember the id of the touchpad

![xinput](/img/xinput.png)

then run `xinput list-props ID` or `xinput list-props 11` *in my case*

![xinput-list](/img/xinput-list.png)

for example i want to enable **tap to click** so i have to run 
`xinput set-prop 11 399 1`
this will set the property **399** *Tapping* to **1** or *true*

and also i want to enable *Natrual Scrolling* to invert the scrolling direction of the touchpad
`xinput set-prop 11 318 1`

![xinput-list.then](/img/xinput-list-then.png)

and finaly set the comands to run from i3 startup
```bash
#MOUSE CONFIG
exec --no-startup-id xinput set-prop 11 339 1
exec --no-startup-id xinput set-prop 11 318 1
```


# Screenshots
the preinstalled tool `ìmport` is simple and works well for me
you only need to pass a parameter, the picture path and file name
example: `import ~/Pictures/screenshots/capture.png`
acually you can go a bit more fancy and use:
- **BY DATE**
`import ~/Pictures/screenshots/capture_$(date '+%H_%M_%S-%d_%m_%y').png`\
will output a file **capture_23_41_33-29_07_22.png** based on time and date
- **BY COUNT**
`import ~/Pictures/screenshots/capture_$(ls ~/Pictures/screenshots | wc -l).png`\
will otput a file **capture_0.png**, **capture_1.png** ... but this may have errors\
if you have capture_0 and capture_1, and now you delete caopure_0, then the comand `ls | wc -l` will output 1, but capture_1 already exists, so it will be overwriten over and over.

**Configuration for i3**
you can **bindsym** with `$mod+Shift+p` or simply `Print` will use ImpPant button
```bash
#SCREENSHOT CROP
bindsym $mod+Shift+p --release exec import ~/Pictures/screenshots/capture_$(date '+%H_%M_%S-%d_%m_%y').png
```
or as i did, the last capture will be overwitten in `screenshots/last.png`an then copied to its save format with date
```bash
bindsym Print --release exec import ~/Pictures/screenshots/last.png && cp ~/Pictures/screenshots/last.png ~Pictures/screenshots/capture_$(date '+%H_%M_%S-%d_%m_%y').png
```

# Power Button
first of all its need to disable the system default action,  
located in `/etc/systemd/logind.conf`
```bash
#HandlePowerKey=poweroff
HandlePowerKey=ignore
```
will be uncomented and set value to `ignore`

then in the **i3 config** its posible to create a kinda power menu as we are used to

![power menu](/img/powerMenu.png)

```bash
set "$mode_power" [K]-lock, [L]-logout, [U]-suspend, [R]-reboot, [S]-shutdown
mode "$mode_power" {
    bindsym k exec --no-startup-id ~/.config/i3/scripts/i3exit.sh lock, mode "default"
    bindsym l exec --no-startup-id ~/.config/i3/scripts/i3exit.sh logout, mode "default"
    bindsym u exec --no-startup-id ~/.config/i3/scripts/i3exit.sh suspend, mode "default"
    #bindsym h exec --no-startup-id ~/.config/i3/scripts/i3exit.sh hibernate, mode "default"
    bindsym r exec --no-startup-id ~/.config/i3/scripts/i3exit.sh reboot, mode "default"
    bindsym s exec --no-startup-id ~/.config/i3/scripts/i3exit.sh shutdown, mode "default"

    # back to normal: Enter or Escape
    bindsym Return mode "default"
    bindsym Escape mode "default"
    bindsym XF86PowerOff mode "default"
}
bindsym control+mod1+Delete mode "$mode_power"
bindsym XF86PowerOff mode "$mode_power"
```

i used the fille [i3exit.sh](scripts/i3exit.sh) as a script to run all diferent commands, but it will be possible to run them directly form i3 config

```bash
bindsym k exec --no-startup-id i3lock -c 000000, mode "default"
bindsym l exec --no-startup-id i3-msg exit logout, mode "default"
bindsym u exec --no-startup-id sudo systemctl suspend, mode "default"
#bindsym h exec --no-startup-id systemctl hibernate, mode "default"
bindsym r exec --no-startup-id sudo reboot, mode "default"
bindsym s exec --no-startup-id sudo poweroff, mode "default"
```


# Keyboard Layout

```bash
setxkbmap -layout dk


setxkbmap -optino caps:none
```
[https://eliasbrasa.wordpress.com/2014/09/23/deshabilitar-la-tecla-de-bloqueo-mayusculas-en-linux/](https://eliasbrasa.wordpress.com/2014/09/23/deshabilitar-la-tecla-de-bloqueo-mayusculas-en-linux/)

```bash

setxkbmap -layout "dk,es" -option "grp:alt_shift_toggle"
#change layout with alt + shift
```

# Brightness
after a while of try and error i came up with this solution
*(my computer has Fn+Brightness keys)* so i used this in the *keybind*

```bash
bindsym XF86MonBrightnessUp exec --no-startup-id ~/.config/i3/scripts/brightness.sh up
bindsym XF86MonBrightnessDown exec --no-startup-id ~/.config/i3/scripts/brightness.sh down
```

i created the [brightness.sh](scripts/brightness.sh) script to help me in this task

```bash
#!/bin/bash

echo $1 >> ~/CODE/linux-config/i3/scripts/test.txt

bright="$(cat /sys/class/backlight/intel_backlight/brightness)"
brightMax="$(cat /sys/class/backlight/intel_backlight/max_brightness)"
chunk="$((brightMax/8))"


case "$1" in
    up)
        next=$(($bright + $chunk))
        [ "$next" -ge "$brightMax" ] && next=$brightMax
        ;;
    down)
        next=$(($bright - $chunk))
        [ "$next" -lt "$chunk" ] && next="0"
        ;;
esac

percent="$(($next*100/$brightMax))"
notify-send "brightness: $percent%"
echo "$next" | tee /sys/class/backlight/intel_backlight/brightness
```