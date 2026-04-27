// Brute Force Solution for Water Tank Problem
function trapBruteForce(height) {
    let totalWater = 0;
    const n = height.length;

    for (let i = 0; i < n; i++) {
        let maxLeft = 0;
        let maxRight = 0;

        // Find max height to the left
        for (let j = i; j >= 0; j--) {
            maxLeft = Math.max(maxLeft, height[j]);
        }

        // Find max height to the right
        for (let j = i; j < n; j++) {
            maxRight = Math.max(maxRight, height[j]);
        }

        // Water trapped at this position
        totalWater += Math.min(maxLeft, maxRight) - height[i];
    }

    return totalWater;
}