const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n').map(i => Number.parseInt(i));
const targetSum = 2020;

// Gross O(n^2) implementation

outerLoop: // javascript has labels btw
for (let i = 0; i < input.length - 1; i++) {
	for (let j = i + 1; j < input.length; j++) {
		if (input[i] + input[j] === targetSum) {
			console.log(`${input[i]} * ${input[j]} = ${input[i] * input[j]}`);
			break outerLoop;
		}
	}
}
