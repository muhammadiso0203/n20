const sa: string = "abc";
const ta: string = "ahbgdc";

let i: number = 0;
let j: number = 0;

while (i < sa.length && j < ta.length) {
  if (sa[i] === ta[j]) {
    i += 1;
    j += 1;
  } else {
    j += 1;
  }
}
console.log(i === sa.length ? true : false)
