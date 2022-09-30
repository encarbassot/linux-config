const draggingWindows = new Draggable()

let calculator

window.onload=()=>{
    

    callChangeTittle()
    
    callHour()

    calculator = callCalculator(document.getElementById("calculator"))

    draggingWindows.push(document.getElementById("calculatorContainer"))

}