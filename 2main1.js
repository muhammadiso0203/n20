var phones = [
    { brand: "Apple", model: "iPhone 15", price: 1200 },
    { brand: "Samsung", model: "Galaxy S24", price: 1100 },
    { brand: "Xiaomi", model: "Mi 13", price: 900 },
    { brand: "OnePlus", model: "12 Pro", price: 950 }
];
function ExpensivePhone(phones) {
    return phones.reduce(function (max, phone) { var _a; return (phone.price > ((_a = max === null || max === void 0 ? void 0 : max.price) !== null && _a !== void 0 ? _a : 0) ? phone : max); }, phones[0]);
}
var expensivePhone = ExpensivePhone(phones);
console.log(expensivePhone);
