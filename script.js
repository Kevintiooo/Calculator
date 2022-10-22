const numButton = document.querySelectorAll('[data_num]');
const operButton = document.querySelectorAll('[data_oper]');
const clearButton = document.querySelector('[data_clear]');
const deleteButton = document.querySelector('[data_del]');
const equalButton = document.querySelector('[data_equal]');
const firstOperrandTextElement = document.querySelector('[first_oper]');
const currentOperrandTextElement = document.querySelector('[curr_oper]');

class Calculator{
    constructor(firstOperrandTextElement, currentOperrandTextElement){
        this.firstOperrandTextElement = firstOperrandTextElement
        this.currentOperrandTextElement = currentOperrandTextElement
        this.clear()
    }

    clickNum(number){
        if(number === '.' && this.currentOperrand.includes('.')) return
        this.currentOperrand = this.currentOperrand.toString() + number.toString()
    }

    doOperations(operation){
        if(this.currentOperrand === '') return
        if(this.firstOperrand !== ''){
            this.result()
        }
        this.operation = operation
        this.firstOperrand = this.currentOperrand
        this.currentOperrand = ''
    }

    result(){
        let computation
        const prev = parseFloat(this.firstOperrand)
        const current = parseFloat(this.currentOperrand)
        if(isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            
            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break    
                
            case '÷':
                computation = prev / current
                break

            case '%':
                computation = (prev/100) * current
                break    
                
            case '^':
                computation = prev**current
                break

            default:
                return
        }
        this.currentOperrand = computation
        this.operation = undefined
        this.firstOperrand = ''
    }

    delete(){
        this.currentOperrand = this.currentOperrand.toString().slice(0, -1)
    }

    clear(){
        this.currentOperrand = ''
        this.firstOperrand = ''
        this.operation = undefined
    }

    getdisplayNum(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
       let intergerDisplay
       if(isNaN(integerDigits)){
            intergerDisplay = ''
       }
       else{
            intergerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
       }
       if(decimalDigits != null){
            return `${intergerDisplay}.${decimalDigits}`
       }
       else{
        return intergerDisplay
       }
    }

    updateDisplay(){
        this.currentOperrandTextElement.innerText = this.getdisplayNum(this.currentOperrand) 
        if(this.operation != null){
            this.firstOperrandTextElement.innerText = `${ this.getdisplayNum(this.firstOperrand)} ${this.operation} ${this.currentOperrand}`
        }
        else{
            this.firstOperrandTextElement.innerText = ''
        }
    }
}

const calculator = new Calculator(firstOperrandTextElement, currentOperrandTextElement)

numButton.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.clickNum(button.innerText)
        calculator.updateDisplay()
    })
})

operButton.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.doOperations(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button=>{
    calculator.result()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button=>{
    calculator.delete()
    calculator.updateDisplay()
})