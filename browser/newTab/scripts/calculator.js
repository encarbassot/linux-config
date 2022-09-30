/*
<tr>
    <td colspan="4"><input type="text" id="result"></td>
</tr>
<tr>
    <td><input type="button" value="c" onclick="clr()" /> </td>
    <td><input type="button" value="±" onclick="clr()" /> </td>
    <td><input type="button" value="%" onclick="clr()" /> </td>
    <td><input type="button" value="÷" onclick="clr()" /> </td>
</tr>
<tr>
    <td><input type="button" value="1" onclick="num('1')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="2" onclick="num('2')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="3" onclick="num('3')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="x" onclick="op('*')" onkeydown="myFunction(event)"> </td>
</tr>
<tr>
    <td><input type="button" value="4" onclick="num('4')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="5" onclick="num('5')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="6" onclick="num('6')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="-" onclick="op('-')" onkeydown="myFunction(event)"> </td>
</tr>
<tr>
    <td><input type="button" value="7" onclick="num('7')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="8" onclick="num('8')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="9" onclick="num('9')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="+" onclick="op('-')" onkeydown="myFunction(event)"> </td>
</tr>
<tr>
    <td colspan="2"><input type="button" value="0" onclick="num('0')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="." onclick="op('.')" onkeydown="myFunction(event)"> </td>
    <td><input type="button" value="=" onclick="solve()"> </td>
</tr>
            */

function callCalculator(dom){
    return new Calculator(dom)
}

class Calculator{
    constructor(dom){
        this.dom={}
        this.makeDom(dom)

        this.currentText=this.dom.input
        this.previousText=this.dom.prevInput
    
        this.buffer=0
        
        
        this.clear()


        document.addEventListener('keydown', function (event) {
            let patternForNumbers = /[0-9]/g;
            let patternForOperators = /[+\-*\/]/g
            if (event.key.match(patternForNumbers)) {
              event.preventDefault();
              calculator.appendNumber(event.key)
              calculator.updateDisplay()
            }
            if (event.key === '.') {
              event.preventDefault();
              calculator.appendNumber(event.key)
              calculator.updateDisplay()
            }
            if (event.key.match(patternForOperators)) {
              event.preventDefault();
              calculator.chooseOperation(event.key)
              calculator.updateDisplay()
            }
            if (event.key === 'Enter' || event.key === '=') {
              event.preventDefault();
              calculator.compute()
              calculator.updateDisplay()
            }
            if (event.key === "Backspace") {
              event.preventDefault();
              calculator.delete()
              calculator.updateDisplay()
            }
            if (event.key == 'Delete') {
              event.preventDefault();
              calculator.clear()
              calculator.updateDisplay()
            }
          
          });
    }

    makeDom(dom){
        const elements=[
            [{type:"text",class:"input",f:"prevInput",colspan:4}],
            [{type:"text",class:"input",f:"input",colspan:4}],
            [
                {value:"AC",class:"function",    f:"clear"},
                {value:"C",class:"function",    f:"delete"},
                {value:"%",class:"function",    f:"percent"},
                {value:"÷",class:"operations",  f:"divide"},
            ],[
                {value:"1",class:"numbers",     f:"num1"},   
                {value:"2",class:"numbers",     f:"num2"},
                {value:"3",class:"numbers",     f:"num3"},
                {value:"x",class:"operations",  f:"multiply"},
            ],[
                
                {value:"4",class:"numbers",     f:"num4"},
                {value:"5",class:"numbers",     f:"num5"},
                {value:"6",class:"numbers",     f:"num6"},
                {value:"-",class:"operations",  f:"substract"},
            ],[
                
                {value:"7",class:"numbers",     f:"num7"},
                {value:"8",class:"numbers",     f:"num8"},
                {value:"9",class:"numbers",     f:"num9"},
                {value:"+",class:"operations",  f:"addition"},
            ],[
                {value:"0",class:"numbers",     f:"num0",colspan:2},
                {value:".",class:"numbers",     f:"decimal"},
                {value:"=",class:"operations",  f:"solve"},
            ],
        ]

        for (const row of elements) {
            const tr=document.createElement("TR")
            for (const info of row) {
                const td = document.createElement("TD")
                tr.appendChild(td)
                const input = document.createElement("INPUT")
                td.appendChild(input)

                let type="button"
                if (Object.hasOwnProperty.call(info, "colspan")) {
                    td.setAttribute("colspan",info.colspan)
                }
                if (Object.hasOwnProperty.call(info, "type")) {
                    type=info.type
                }
                input.type = type
                if (Object.hasOwnProperty.call(info, "value")) {
                    input.value=info.value
                }
                input.classList.add(info.class)
                if(type=="button"){
                    input.setAttribute("info",info.f)
                    //input.addEventListener("click",this.calc)
                    input.onclick= e=>this.calc(e)
                }

                this.dom[info.f]=input

            }
            dom.appendChild(tr)
        }
    }
    


    setOutput(x){
        this.currentText.value=x
    }

    setPrevOutput(x){
        this.previousText.value=x
    }

    calc(x){
        const button = x.target.getAttribute("info")
        switch(button){
            case "num0": 
                this.appendNumber(0)
                break;
            case "num1": 
                this.appendNumber(1)
                break;
            case "num2": 
                this.appendNumber(2)
                break;
            case "num3": 
                this.appendNumber(3)
                break;
            case "num4": 
                this.appendNumber(4)
                break;
            case "num5": 
                this.appendNumber(5)
                break;
            case "num6": 
                this.appendNumber(6)
                break;
            case "num7": 
                this.appendNumber(7)
                break;
            case "num8": 
                this.appendNumber(8)
                break;
            case "num9": 
                this.appendNumber(9)
                break;
            case "decimal":
                this.appendNumber('.')
                break;
            case "multiply":
                this.chooseOperation("*")
                break;
            case "divide":
                this.chooseOperation("/")
                break;
            case "addition":
                this.chooseOperation("+")
                break;
            case "substract":
                this.chooseOperation("-")
                break;
            case "solve":
                this.compute()
                break;
            case "percent":
                this.inputPercent()
                break;
            case "delete":
                this.delete()
                break;
            case "clear":
                this.clear()
                break;
            default:
                console.log(button)

        }
        this.updateDisplay()
    }

    

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        console.log(computation)
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    inputPercent(){
        console.log("Pecent %%");
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(op){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = op
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        return integerDisplay
        
    }

    updateDisplay(){
        this.setOutput( this.getDisplayNumber(this.currentOperand) )
        if (this.operation != null) {
            this.setPrevOutput( `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` )
        } else {
            this.setPrevOutput('')
        }
        
    }
    


    
}
