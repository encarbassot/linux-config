#!/bin/sh

#chmod +x i3exit.sh
#cp i3exit.sh ~/.config/i3/scripts/



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
        sudo systemctl suspend | pm-suspend | i3lock -c 000000
        ;;
    hibernate)
        sudo systemctl hibernate | pm-hibernate
        ;;
    reboot)
        sudo reboot
        ;;
    shutdown)
        sudo poweroff
        ;;
    *)
        echo "Usage: $0 {lock|logout|suspend|hibernate|reboot|shutdown}"
        exit 2
esac

exit 0