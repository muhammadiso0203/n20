class Stack<T>{
    arr: T[];

    constructor(arr:T[] = []){
       this.arr = arr
    }

    addElem(val: T):void{
       this.arr.push(val)
    }

    deleteElem():void{
        this.arr.pop()
    }
    
    getInfo():T[]{
       return this.arr
    }
}

const stack1 = new Stack<number>()
stack1.addElem(1)
stack1.deleteElem()
console.log(stack1.getInfo())