function isNameExist(userName: string | null | undefined):string{
    if(!userName){
      return "Mehmon"
    }else{
      return "Qiymat mavjud"
    }
}

let userName: string | null | undefined = undefined
console.log(isNameExist(userName))