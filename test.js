// Test the functions
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

function trapOptimized(height) {
    let totalWater = 0;
    let left = 0;
    let right = height.length - 1;
    let maxLeft = 0;
    let maxRight = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= maxLeft) {
                maxLeft = height[left];
            } else {
                totalWater += maxLeft - height[left];
            }
            left++;
        } else {
            if (height[right] >= maxRight) {
                maxRight = height[right];
            } else {
                totalWater += maxRight - height[right];
            }
            right--;
        }
    }

    return totalWater;
}

const heights = [0,4,0,0,0,6,0,6,4,0];
console.log('Brute Force Result:', trapBruteForce(heights));
console.log('Optimized Result:', trapOptimized(heights));