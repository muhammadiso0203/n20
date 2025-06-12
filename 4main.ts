function intersect(nums1: number[], nums2: number[]): number[] {
    const map: Record<number, number> = {};
    const result: number[] = [];
    
    for (const num of nums1) {
        map[num] = (map[num] || 0) + 1;
    }
    
    for (const num of nums2) {
        if (map[num]) {
        result.push(num);
        map[num]--;
        }
    }
    
    return result;
};

console.log(intersect([1, 2, 2, 1], [2, 2]));