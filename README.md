# Water Tank Problem

This project solves the classic "Trapping Rain Water" problem. Given an array of block heights, we calculate how much water can be trapped between the blocks after it rains.

## Problem Description

We have blocks of different heights arranged in a line. When it rains, water gets trapped in the depressions between taller blocks. The goal is to compute the total amount of water that can be held.

For example, with heights [0,4,0,0,0,6,0,6,4,0], the total trapped water is 18 units.

## My Approach

I started by understanding that water at any position depends on the tallest blocks to its left and right. The water level at a position is limited by the shorter of those two maxima.

For the brute force method, I simply iterate through each position and calculate the max left and max right heights by scanning the array each time. It's straightforward but slow for large arrays.

The optimized version uses two pointers starting from both ends. I track the current max heights as I move inward, adding water when the current height is less than the max. This way, I only traverse the array once.

## Implementation

I built a web app with HTML, CSS, and vanilla JavaScript. Users can input the heights, choose the algorithm, and see a visual representation using SVG.

The visualization shows the blocks as brown rectangles and the trapped water as blue overlays.

## Files

- `index.html`: Main page structure
- `styles.css`: Styling
- `app.js`: App logic and SVG drawing
- `brute.js`: Brute force algorithm
- `optimized.js`: Optimized algorithm

## Running the App

Open `index.html` in a browser. Enter comma-separated heights, select a method, and click calculate to see the result and visualization.