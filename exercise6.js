function diapazon(arr, min, max) {
  const newArr = [];
  for (let i of arr) {
    if (i >= min && i <= max) {
      newArr.push(i)
    }
  }
  console.log(newArr)
}

const arr = [1,2,3,4,5,6,7,8,9,10];
let min = 3;
let max = 7;
diapazon(arr, min, max);
