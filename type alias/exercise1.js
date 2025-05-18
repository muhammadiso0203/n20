"use strict";
let phones = [
    { brand: "Apple", model: "Iphone 14", price: 1200 },
    { brand: "Samsung", model: "Note 10+", price: 1000 },
    { brand: "Xiaomi", model: "Mi 12", price: 800 }
];
function expensivePhone(phoneList) {
    if (phoneList.length === 0) {
        return null;
    }
    return phoneList.reduce((prev, curr) => curr.price > prev.price ? curr : prev);
}
console.log(expensivePhone(phones));
//# sourceMappingURL=exercise1.js.map