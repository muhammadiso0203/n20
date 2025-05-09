function evenAndOdd(arr) {
  for (let i of arr) {
    switch (true) {
      case i % 2 == 0:
        console.log(`Even:[${i}]`);
        break;
      default: {
        console.log(`Odd:[${i}]`);
      }
    }
  }
}

const arr = [1, 2, 3, 4, 5, 6];
evenAndOdd(arr);
