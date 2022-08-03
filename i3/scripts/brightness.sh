#!/bin/bash

bright="$(cat /sys/class/backlight/intel_backlight/brightness)"
brightMax="$(cat /sys/class/backlight/intel_backlight/max_brightness)"
chunk="$((brightMax/12))"


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
notify-send -t 700 "brightness: $percent%"
echo "$next" | tee /sys/class/backlight/intel_backlight/brightness


