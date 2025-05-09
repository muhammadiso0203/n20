function switchElement(arr, ind1, ind2) {
  const newArr = [...arr];
  const t = newArr[ind1];
  newArr[ind1] = newArr[ind2];
  newArr[ind2] = t;
  
  console.log(newArr);
  
}

const arr = [1, 2, 3, 4, 5];
let ind1 = 1;
let ind2 = 3;
switchElement(arr, ind1, ind2);
