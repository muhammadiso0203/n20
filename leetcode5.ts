const s: string = "abbaca";

// const copyS = [...s];

// let i: number = 0;

// while (i < copyS.length) {
//   if (copyS[i] === copyS[i + 1]) {
//     copyS.splice(i, 2);
//     i = Math.max(i - 1, 0);
//   } else {
//     i++;
//   }
// }

const st: string[] = [];

for(let c of s){
   if(st.length && st[st.length - 1] === c){
      st.pop()
   }else{
      st.push(c)
   }
}
console.log(st)