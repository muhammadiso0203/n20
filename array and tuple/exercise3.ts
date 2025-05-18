function tuple(user:[string,Date,boolean]){
   console.log(`
Username: ${user[0]}, 
loginTime: ${user[1].toLocaleString()}, 
isLoggedIn: ${user[2]}`)
}

let tpl:[username:string,loginTime:Date,isLoggedIn:boolean] = [
    "Akbar",
    new Date("2024-05-21T10:00:00"),
    true
]
tuple(tpl)