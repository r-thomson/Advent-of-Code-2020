const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();
const adapterRatings = input.split('\n').map(line => Number.parseInt(line));
adapterRatings.sort((a, b) => a - b); // ascending sort

const joltDiffCounts = { 1: 0, 2: 0, 3: 0 };

adapterRatings.reduce((curJoltage, adapterRating) => {
	const diff = adapterRating - curJoltage;
	joltDiffCounts[diff] += 1;
	return curJoltage + diff;
}, 0) + 3;
joltDiffCounts[3] += 1;

console.log(joltDiffCounts[1] * joltDiffCounts[3]);
