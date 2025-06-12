function maximumPopulation(logs: number[][]): number {
    const yearCount: Record<number, number> = {};
    
    for (const [birth, death] of logs) {
        for (let year = birth; year < death; year++) {
            yearCount[year] = (yearCount[year] || 0) + 1;
        }
    }
    
    let maxPopulation = 0;
    let maxYear = 0;
    
    for (const [year, count] of Object.entries(yearCount)) {
        if (count > maxPopulation || (count === maxPopulation && parseInt(year) < maxYear)) {
            maxPopulation = count;
            maxYear = parseInt(year);
        }
    }
    
    return maxYear;
};

console.log(maximumPopulation([[1993, 1999], [2000, 2010]]));