const dateDOM={}
function callHour(){
    dateDOM["y"]=document.querySelector("#date #year"),
    dateDOM["m"]=document.querySelector("#date #month"),
    dateDOM["d"]=document.querySelector("#date #day"),
    dateDOM["h"]=document.querySelector("#date #hours"),
    dateDOM["M"]=document.querySelector("#date #minutes"),
    dateDOM["s"]=document.querySelector("#date #seconds"),
    dateDOM["millis"]=document.querySelector("#date #millis"),
    dateDOM["monthText"]=document.querySelector("#date #monthText"),
    dateDOM["dayText"]=document.querySelector("#date #dayText"),
    dateDOM["timestamp"]=document.querySelector("#date #timestamp"),

    dateUpdater()
    document.getElementById("date").addEventListener("mouseover",()=>{
        updatable = false
    })

    document.getElementById("date").addEventListener("mouseout",()=>{
        updatable = true
    })

}

let updatable = true

function dateUpdater(){
    const days = ["Diumenge","Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte"]
    const months = ["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Septembre","Octubre","Novembre","Decembre"]
    const t = new Date()
    if(updatable){

        updateDom(dateDOM.y,t.getFullYear())               //YEAR  number
        updateDom(dateDOM.m,leadingZeros(t.getMonth()))    //MONTH number
        updateDom(dateDOM.d,leadingZeros(t.getDate()))     //DAY   number
        updateDom(dateDOM.h,t.getHours())                  //Hour
        updateDom(dateDOM.M,leadingZeros(t.getMinutes()))  //minutes
        updateDom(dateDOM.s,leadingZeros(t.getSeconds()))  //seconds
        updateDom(dateDOM.millis,leadingZeros(t.getMilliseconds(),3))//millis 0-999
        updateDom(dateDOM.monthText,months[t.getMonth()])  //MONTH text
        updateDom(dateDOM.dayText,days[t.getDay()])        //DAT text
        updateDom(dateDOM.timestamp,t.getTime())           //timestamp
    }
        setTimeout(dateUpdater,1)
}


function updateDom(dom,t){
    if(dom.innerText!=t){
        dom.innerText=t
    }
}

function leadingZeros(int,n=2){
    let a = int+""
    while(a.length<n){
        a='0'+a
    }
    return a
}