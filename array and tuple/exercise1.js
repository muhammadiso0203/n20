"use strict";
function minElem(arr) {
    if (arr.length === 0) {
        return undefined;
    }
    return Math.min(...arr);
}
let nums = [1, 2, 3, 4, 5];
console.log(minElem(nums));
//# sourceMappingURL=exercise1.js.map