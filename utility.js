var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function updateProduct(product, updates) {
    return __assign(__assign({}, product), updates);
}
var product2 = {
    id: 2,
    name: "second"
};
var product3 = {
    id: 3,
    name: "third",
    price: 3
};
var updatedProduct3 = __assign(__assign({}, product3), { description: "Yangilangan izoh" });
console.log(updatedProduct3);
