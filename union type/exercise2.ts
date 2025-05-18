function input(inp: boolean | string):string | number{
   return typeof inp === "boolean" ? "true" : inp.length
}

let inp: boolean | string = "hello world"
console.log(input(inp))