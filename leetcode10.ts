// letters in even indices, numbers in odd indices
const q = "a1c1e1";

const res: number[] = [];

for (let i = 0; i < q.length; i++) {
  if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(q[i])) {
    res.push(q.charCodeAt(i));
  } else {
    res.push(res[res.length - 1] + Number(q[i]));
  }
}

console.log(String.fromCharCode(...res))
