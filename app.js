document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    const heightsInput = document.getElementById('heights');
    const methodSelect = document.getElementById('method');
    const totalWaterDisplay = document.getElementById('total-water');
    const svg = document.getElementById('tank-svg');

    calculateBtn.addEventListener('click', function() {
        const input = heightsInput.value.trim();
        if (!input) {
            alert('Please enter block heights.');
            return;
        }

        const heights = input.split(',').map(h => parseInt(h.trim())).filter(h => !isNaN(h));
        if (heights.length === 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const method = methodSelect.value;
        let totalWater;
        if (method === 'brute') {
            totalWater = trapBruteForce(heights);
        } else {
            totalWater = trapOptimized(heights);
        }

        totalWaterDisplay.textContent = `Total water: ${totalWater} units`;

        drawVisualization(heights, totalWater);
    });

    function drawVisualization(heights, totalWater) {
        // Clear previous drawing
        svg.innerHTML = '';

        const width = 800;
        const height = 400;
        const barWidth = width / heights.length;
        const maxHeight = Math.max(...heights, 1);
        const scaleY = (height - 50) / maxHeight; // Leave space for labels

        // Draw bars
        heights.forEach((h, i) => {
            const x = i * barWidth;
            const barHeight = h * scaleY;
            const y = height - barHeight - 20; // 20 for bottom margin

            // Draw bar
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', x);
            bar.setAttribute('y', y);
            bar.setAttribute('width', barWidth - 2); // Small gap between bars
            bar.setAttribute('height', barHeight);
            bar.setAttribute('fill', '#8B4513'); // Brown for blocks
            svg.appendChild(bar);

            // Label height
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x + barWidth / 2);
            label.setAttribute('y', y - 5);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '12');
            label.textContent = h;
            svg.appendChild(label);
        });

        // Calculate water levels
        const waterLevels = [];
        for (let i = 0; i < heights.length; i++) {
            let maxLeft = 0;
            let maxRight = 0;
            for (let j = 0; j <= i; j++) {
                maxLeft = Math.max(maxLeft, heights[j]);
            }
            for (let j = i; j < heights.length; j++) {
                maxRight = Math.max(maxRight, heights[j]);
            }
            waterLevels[i] = Math.min(maxLeft, maxRight) - heights[i];
        }

        // Draw water
        waterLevels.forEach((w, i) => {
            if (w > 0) {
                const x = i * barWidth;
                const barHeight = heights[i] * scaleY;
                const waterHeight = w * scaleY;
                const y = height - barHeight - waterHeight - 20;

                const waterRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                waterRect.setAttribute('x', x);
                waterRect.setAttribute('y', y);
                waterRect.setAttribute('width', barWidth - 2);
                waterRect.setAttribute('height', waterHeight);
                waterRect.setAttribute('fill', '#00BFFF'); // Blue for water
                waterRect.setAttribute('opacity', '0.7');
                svg.appendChild(waterRect);
            }
        });
    }
});