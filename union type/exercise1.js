"use strict";
function strOrNum(num) {
    return typeof num === "number" ? num : +num;
}
let num = "123";
console.log(strOrNum(num));
//# sourceMappingURL=exercise1.js.map