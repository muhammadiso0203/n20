function identity(value) {
    return value;
}
console.log(identity(0));
console.log(identity("str"));
console.log(identity({}));
var Stack = /** @class */ (function () {
    function Stack() {
        this.values = [];
    }
    Stack.prototype.push = function (value) {
        this.values.push(value);
    };
    Stack.prototype.pop = function () {
        return this.values.pop();
    };
    return Stack;
}());
var numberStack = new Stack();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2
console.log(numberStack.pop()); // 1
console.log(numberStack.pop());
