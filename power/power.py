from sshkeyboard import *
import sys
import os
import math
import subprocess

testing = False
rows,columns = 0,0

sliders = {
        "V":{
            "name":"Volume ",
            "keys":["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"],
            "command":["amixer -D pulse sset Master ","% -q"],
            "map":100,      #map the value from 0 to 100
            "color":"blue",
            "commandInfo":"amixer -D pulse sget Master | awk 'END{print $NF,$(NF-1)}'"
            },
        "B":{
            "name":"Brightness",
            "keys":["[","{","}","(","=","*",")","+","]","!"],
            "command":["echo "," | sudo tee /sys/class/backlight/intel_backlight/brightness > /dev/null"],
            "map":3484, #cat /sys/class/backlight/intel_backlight/max_brightness
            "color":"cyan",
            "preview":"0-9"
            }
        }

commands = {
        "S":["Suspend","systemctl suspend","green"],
        "P":["PowerOff","systemctl poweroff","green"],
        "L":["LogOut","i3-msg exit","green"],
        "M":["Mute","amixer -D pulse sset Master toggle | awk 'END{pint $NF}'","cyan"],
        "Q":["Quit  (esc)","exit","red"]
        }


col={
    "def":"\033[39m",
    "green":"\033[32m",
    "red":"\033[31m",
    "orange":"\033[33m",
    "blue":"\033[34m",
    "magenta":"\033[35m",
    "cyan":"\033[36m",
    "lightGray":"\033[37m",
    "black":"\033[40m",
    "clr":"\033[2J",
    "underline":"\033[4m",
    "blink":"\033[5m",
    "bg_black":"\033[40m",
    "bg_red":"\033[41m",
    "bg_green":"\033[42m",
    "bg_orange":"\033[43m",
    "bg_blue":"\033[44m",
    "bg_magenta":"\033[45m",
    "bg_cyan":"\033[46m",
    "bg_lightGray":"\033[47m",
    "bg_def":"\033[49m",
    "bg_darkGray":"\033[100m",
    "bg_lightRed":"\033[101m",
    "bg_lightGreen":"\033[102m",
    "bg_yellow":"\033[103m",
    "bg_lightBlue":"\033[104m",
    "bg_lightPurple":"\033[105m",
    "bg_teal":"\033[106m",
    "bg_white":"\033[107m"
    }



irrelevant = False
def p(x,important = False):
    global irrelevant
    if important:
        print(x)
        return 

    if irrelevant:
        print('\033[u',end='')
        pass
    else:
        print('\033[s',end='')
        irrelevant = True

    spc = " "*(int(columns)-len(x))
    print(f'{x}{spc}',flush=True,end="")


def os_(s,exi=True):
    p(s[0])
    os_write(s[1],exi)


def os_write(x,exi=True):
    if testing:
        p("Testing:"+x)
    else:
        os.system(x)
    if exi:
        ex()

def ex():
    stop_listening()
    #exit()

def makeText(txt,char,color="green"):
    result = ""
    done = False
    if char in txt:
        for ch in txt:
            if ch.lower() == char.lower() and not done:
                result+= f'{col[color]}[{ch}]{col["def"]}'
                done = True
            else:
                result += ch
    else:
        result = f'{col[color]}[{char}]{col["def"]} {txt}'

    return result

def command2txt(c):
    return subprocess.Popen(c,shell=True,stdout=subprocess.PIPE).stdout.read().decode("utf-8")[:-1:]

def makeTextS(k,s):
    char = s['preview'] if 'preview' in s else s['keys'][0]+"-"+s['keys'][-1]
    txt  = s['name'] + f'\t({k})'
    color = s['color']
    if "commandInfo" in s.keys():
        txt +="\t"+command2txt(s['commandInfo'])
    return makeText(txt,char,color)


def setSlider(s,p):
    p = min(int(p),100)
    v = str(round(p*s["map"]/100))
    c=s["command"]
    com = c[0]+v+c[1] if type(c) is list and len(c)>1 else c+v
    os_((f'{s["name"]}: [{str(p)}%]',com),False)

def slide(s,i):
    n = len(s["keys"])-1
    m = s["map"]
    v =  0 if i == 0 else i/n*m
    percent = round(v/m*100)
    setSlider(s,percent)

def keyboard(e):
    if e.upper() in commands:
        os_(commands[e.upper()])
        return
    
    for k,s in sliders.items():
        if e in s["keys"]:
            slide(s,s["keys"].index(e))
            return
    p(e)

def main():
    global rows, columns 
    rows, columns = os.popen('stty size', 'r').read().split()
    if len(sys.argv)>2:
        arg2, arg = sys.argv[2], sys.argv[1].upper()
        if arg in sliders.keys():
            setSlider(sliders[arg],arg2)
            return 0
    elif len(sys.argv)>1:
        arg = sys.argv[1].upper()
        if arg in commands.keys():
            os_(commands[arg])
            return 0

    for k,s in sliders.items():
        p(makeTextS(k,s),True)

    for key,data in commands.items():
        name,com,color = data
        p(makeText(name,key,color),True)
    
    listen_keyboard(on_release=keyboard)




if __name__ == "__main__":
    main()