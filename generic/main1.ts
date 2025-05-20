function identity<T>(value:T):T{
    return value
}

console.log(identity<number>(1))
console.log(identity<string>("1"))
console.log(identity<object>({
    id: 1,
    name: "Akrom"
}))
