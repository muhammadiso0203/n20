function gradeAnalysis(arr) {
  let max = -Infinity;
  let maxAvg = -Infinity;
  let min = Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 90 && arr[i] <= 100) {
      if (arr[i] > max) {
        max = arr[i];
      }
    } else if (arr[i] >= 70 && arr[i] <= 79) {
      if (arr[i] > maxAvg) {
        maxAvg = arr[i];
      }
    } else if (arr[i] >= 0 && arr[i] <= 59) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
  }

  console.log(`Average grade: `, maxAvg);
  console.log(`Highest grade: `, max);
  console.log(`Lowest grade: `, min);
}

const arr = [85, 92, 78, 65, 88, 72, 90, 60, 96, 55, 78, 82];
gradeAnalysis(arr);
