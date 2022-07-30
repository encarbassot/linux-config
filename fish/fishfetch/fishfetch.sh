#!/bin/bash

date="$(date +'%H:%M %d/%m/%y')"
host="$(hostname)"
uptime="$(uptime -p | sed 's/up //')"

volume="$(amixer -D pulse sget Master | awk 'END{print $(NF-1),$NF}')"

battery="$(upower -i /org/freedesktop/UPower/devices/battery_BAT0| grep "percentage" | awk '{ print $NF}')"
batstat="$(upower -i /org/freedesktop/UPower/devices/battery_BAT0| grep "state" | awk '{ print $NF}')"
batinfo="$(upower -i /org/freedesktop/UPower/devices/battery_BAT0| grep "time to" | awk '{print $(NF-1)" " $NF}')"

bright="$(cat /sys/class/backlight/intel_backlight/brightness)"
brightMax="$(cat /sys/class/backlight/intel_backlight/max_brightness)"
brightness=$((($bright*100)/3484))

outip="$(curl ifconfig.me -s)"
inip="$(hostname -I)"

mem="$(df /dev/sda5 -h | awk 'END{printf "[%s] %s/%s",$5,$3,$2}')" 


#colors
bold="$(tput bold)"
black="$(tput setaf 0)"
red="$(tput setaf 1)"
green="$(tput setaf 2)"
yellow="$(tput setaf 3)"
blue="$(tput setaf 4)"
magenta="$(tput setaf 5)"
cyan="$(tput setaf 6)"
white="$(tput setaf 7)"
reset="$(tput sgr0)"

batcol=$green

if [ $batstat == "discharging" ]; then
	batcol=$red
fi

#fonts
lc="${reset}${bold}${yellow}"	#labels
nc="${reset}${bold}${yellow}"	#user & hostname
nb="${reset}${yellow}"		#labels non bold
sp="${reset}${bold}${magenta}" 	#spacers
ic="${reset}"			#info
c0="${reset}${yellow}"		#ascii-art
c1="${reset}${white}${bold}"	#ascii-art details

#░░░░░░░░░░░░░░░░░
#░░░░▄▄████▄▄░░░░░
#░░░██████████░░░░
#░░░██▄▄██▄▄██░░░░
#░░░░▄▀▄▀▀▄▀▄░░░░░
#░░░▀░░░░░░░░▀░░░░
#░░░░░░░░░░░░░░░░░

a="a"

if [ -z "$1" ]; then #simpler
cat <<EOF
${c0}       _______     ${nc}  ${USER}${ic}@${nc}${nc}${host} ${ic}${date}${reset}
${c0}     \-       -/   ${lc} VOLUME: ${ic}${volume}
${c0}  \_/           \  ${lc} BRIGHT: ${ic}[${brightness}%]${reset}
${c0}  |          ${c1}O O${c0} | ${lc}BATTERY: ${ic}[${battery}] ${batcol}${batstat}${ic} ${batinfo}${reset}
${c0}  |_  <    )   3 ) ${lc} UPTIME: ${ic}${uptime}${reset}
${c0}  / \           /  ${lc}NETWORK: ${ic}${bold}${inip}- ${outip}${reset}
${c0}     /-_______-\   ${lc} MEMORY: ${ic}${mem}${reset}

EOF

else #extended
os="$(lsb_release -ds)"
codename="$(lsb_release -cs)"
kernel="$(uname -sri)"
packages="$(dpkg -l | wc -l)"
shell="$(basename "${SHELL}")"
ui="$(basename "${XDG_CURRENT_DESKTOP}")"

cat <<EOF
${c0}       _______     ${nc}  ${USER}${ic}@${nc}${nc}${host} ${ic}${date}${reset}
${c0}     \-       -/   ${lc} VOLUME: ${ic}${volume}
${c0}  \_/           \  ${lc} BRIGHT: ${ic}[${brightness}%]${reset}
${c0}  |          ${c1}O O${c0} | ${lc}BATTERY: ${ic}[${battery}] ${batcol}${batstat}${ic} ${batinfo}${reset}
${c0}  |_  <    )   3 ) ${lc} UPTIME: ${ic}${uptime}${reset}
${c0}  / \           /  ${lc}NETWORK: ${ic}${bold}${inip}- ${outip}${reset}
${c0}     /-_______-\   ${lc} MEMORY: ${ic}${mem}${reset}
${c0}                   ${lc}     OS: ${ic}${os}${sp} - ${nb}${codename}
${c0}                   ${lc} KERNEL: ${ic}${kernel}${reset}
${c0}                   ${lc}PACKAGS: ${ic}${packages}${reset}
${c0}                   ${lc}  SHELL: ${ic}${shell}${reset}
${c0}                   ${lc}     WM: ${ic}${ui}${reset}

EOF

fi

