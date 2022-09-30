#!/bin/bash

#sudo chmod 777 /sys/class/backlight/intel_backlight/brightness

bright="$(cat /sys/class/backlight/intel_backlight/brightness)"
brightMax="$(cat /sys/class/backlight/intel_backlight/max_brightness)"
chunk="$((brightMax/12))"


case "$1" in
    *-u*) #UP
        next=$(($bright + $chunk))
        [ "$next" -ge "$brightMax" ] && next=$brightMax
    ;;
    *-d*) #DOWN
        next=$(($bright - $chunk))
        [ "$next" -lt "$chunk" ] && next="0"
    ;;
    *)
    echo "use -u or --up for UP and -d or -down for DOWN"
    ;;
esac


percent="$(($next*100/$brightMax))"
notify-send -t 700 "$percent%"
echo "$next" > /sys/class/backlight/intel_backlight/brightness
echo "$percent%"


