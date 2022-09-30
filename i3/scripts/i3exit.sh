#!/bin/sh

#chmod +x i3exit.sh
#cp i3exit.sh ~/.config/i3/scripts/

#this code i found in several places, so there is no creator to give credit
# https://faq.i3wm.org/question/2824/i3exit-script-doesnt-work.1.html
case "$1" in
    lock)
        systemctl suspend && i3lock -c 0000FF --image=/home/elio/Pictures/Wallpapers/shrek.png
        ;;
    logout)
        i3-msg exit
        ;;
    suspend)
        systemctl suspend
        # || pm-suspend || i3lock -c 000000
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