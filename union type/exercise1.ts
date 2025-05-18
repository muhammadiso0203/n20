function strOrNum(num: string | number):number | string{
   return typeof num === "number" ? num : +num
}

let num: number | string = "123"
console.log(strOrNum(num))