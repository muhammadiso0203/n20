function searchElement(arr, n) {
  let ind = -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      ind = i;
      break;
    }
  }
  console.log(ind);
}

const arr = [10, 20, 30, 40, 50];
let n = 30;
searchElement(arr, n);
