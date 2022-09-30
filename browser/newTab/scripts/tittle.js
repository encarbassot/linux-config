
const titles=[
    "Hello :3",
    "Hi :)",
    "Hola Eloi",
    "Bon dia",
    "Bona tarda"
    
]

function callChangeTittle(){
    setScrollTitle()
    
}

function changeTitle(recursive = true){
    document.title=titles[Math.floor(Math.random()*titles.length)]
    if(recursive){
        setTimeout(changeTitle,5000+Math.floor(Math.random()*30000))
    }
}


let titleScroll="-----------Hello-"
function setScrollTitle(recursive = true){
    titleScroll=titleScroll.slice(1)+titleScroll.slice(0,1)
    document.title=titleScroll
    if(recursive){
        setTimeout(setScrollTitle,500)
    }
}
