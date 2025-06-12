function twoCitySchedCost(costs: number[][]): number {
  costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));

  const n = costs.length / 2;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += costs[i][0]; 
  }

  for (let i = n; i < costs.length; i++) {
    sum += costs[i][1]; 
  }

  return sum;
}


console.log(twoCitySchedCost([
  [10, 20],
  [30, 200],
  [400, 50],
  [30, 20],
])); 




