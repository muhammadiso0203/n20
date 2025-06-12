function removeAdjacentDuplicates(s: string): string {
  const st: string[] = [];

  for (let c of s) {
    if (st.length && st[st.length - 1] === c) {
      st.pop();
    } else {
      st.push(c); 
    }
  }

  return st.join("");
}

console.log(removeAdjacentDuplicates("abbaca"));  
console.log(removeAdjacentDuplicates("azxxzy"));  
console.log(removeAdjacentDuplicates("aabbcc"));  
console.log(removeAdjacentDuplicates("abc"));  
