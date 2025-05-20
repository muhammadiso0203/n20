"use strict";
class Stack {
    constructor(arr = []) {
        this.arr = arr;
    }
    addElem(val) {
        this.arr.push(val);
    }
    deleteElem() {
        this.arr.pop();
    }
    getInfo() {
        return this.arr;
    }
}
const stack1 = new Stack();
stack1.addElem(1);
stack1.deleteElem();
console.log(stack1.getInfo());
//# sourceMappingURL=main2.js.map