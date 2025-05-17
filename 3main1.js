function union(price) {
    if (typeof price === 'string') {
        return price;
    }
    else {
        return price.toString();
    }
}
console.log(union('100'));
