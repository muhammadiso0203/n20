const costs = [
  [10, 20],
  [30, 200],
  [400, 50],
  [30, 20],
];

costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
let n: number = costs.length / 2;
let total: number = 0;

for (let i = 0; i < costs.length; i++) {
  if (i < n) {
    total += costs[i][0];
  } else {
    total += costs[i][1];
  }
}
console.log(costs);
console.log(total);

