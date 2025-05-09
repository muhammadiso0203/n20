function gradeAnalysis(arr) {
  for (let i of arr) {
    switch (true) {
      case i == "A":
        console.log(`90-100: ${i}`);
        break;
      case i == "B":
        console.log(`80-89: ${i}`);
        break;
      case i == "C":
        console.log(`70-79: ${i}`);
        break;
      case i == "D":
        console.log(`60-69: ${i}`);
        break;
      default: {
        console.log(`0-59: ${i}`);
      }
    }
  }
}

const arr = ["A", "B", "C", "D", "F"];
gradeAnalysis(arr)