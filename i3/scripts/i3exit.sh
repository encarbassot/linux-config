#!/bin/sh

#chmod +x i3exit.sh
#cp i3exit.sh ~/.config/i3/scripts/



modBrightness(){
    touch test.txt
    bright="$(cat /sys/class/backlight/intel_backlight/brightness)"
    brightMax="$(cat /sys/class/backlight/intel_backlight/max_brightness)"
    chunk="$((brightMax/8))"
    echo $chunk
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

    echo "$next" | sudo tee /sys/class/backlight/intel_backlight/brightness
}


#this code i found in several places, so there is no creator to give credit
# https://faq.i3wm.org/question/2824/i3exit-script-doesnt-work.1.html
case "$1" in
    lock)
        i3lock -c 000000
        ;;
    logout)
        i3-msg exit
        ;;
    suspend)
        sudo systemctl suspend || pm-suspend || i3lock -c 000000
        ;;
    hibernate)
        sudo systemctl hibernate || pm-hibernate
        ;;
    reboot)
        sudo reboot
        ;;
    shutdown)
        sudo poweroff
        ;;
    closeLid)
        i3lock -e -f -i ~/Pictures/Wallpapers/wallpaper.png -t
        sudo systemctl suspend
        ;;
    brightnessUp)
        modBrightness up

        ;;
    brightnessDown)
        modBrightness down
        ;;
    *)
        echo "Usage: $0 {lock|logout|suspend|hibernate|reboot|shutdown|closeLid|brightnessUp|brightnessDown}"
        exit 2
esac

exit 0