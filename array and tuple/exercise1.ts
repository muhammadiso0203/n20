function minElem(arr:number[]):number | undefined{
   if(arr.length === 0){
      return undefined
   }
   return Math.min(...arr)
}

let nums:number[]=[1,2,3,4,5]
console.log(minElem(nums))