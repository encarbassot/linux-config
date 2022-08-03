#!/bin/bash

current="$(amixer -D pulse sget Master | awk 'END{print $(NF-1)}' | sed 's/[]%[]//g')"


case "$1" in
    up)
        stat="UP"
        if [ $current -lt 300 ]
        then
            pactl set-sink-volume @DEFAULT_SINK@ +10%
        fi
        ;;
    down)
        stat="DOWN"
        pactl set-sink-volume @DEFAULT_SINK@ -10%
        ;;
    mute)
        pactl set-sink-mute @DEFAULT_SINK@ toggle
        muteStat=$(amixer -D pulse -M get Master | tail -n 1 | awk '{print $(NF)}')
        if [ $muteStat = "[on]" ] 
        then
            stat="UNMUTED"
        else
            stat="MUTED"
        fi

    ;;
esac

level="$(amixer -D pulse sget Master | awk 'END{print $(NF-1)}' | sed 's/[]%[]//g')"

timeout=700
path=~/CODE/linux-config/i3/icons

if [ $stat = "MUTED" ]
then
    notify-send -i "$path/mute.png" -t $timeout "MUTED"
elif [ $level -lt 10 ]
then
    notify-send -i "$path/vol_0.png" -t $timeout "$level% 0"
elif [ $level -lt 40 ]
then
    notify-send -i "$path/vol_1.png" -t $timeout "$level% 1"
elif [ $level -lt 80 ]
then
    notify-send -i "$path/vol_2.png" -t $timeout "$level% 2"
elif [ $level -lt 100]
then
    notify-send -i "$path/vol_3.png" -t $timeout "$level% 3"
elif [ $level -lt 170]
then
    notify-send -i "$path/vol_4.png" -t $timeout "$level% 4"
else
    notify-send -i "$path/vol_5.png" -t $timeout "$level% else"
fi
