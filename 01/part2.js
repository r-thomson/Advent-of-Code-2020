const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n').map(i => Number.parseInt(i));
const targetSum = 2020;

// Even worse O(n^3) implementation

outerLoop:
for (let i = 0; i < input.length - 1; i++) {
	for (let j = i + 1; j < input.length; j++) {
		for (let k = j + 1; k < input.length; k++) {
			if (input[i] + input[j] + input[k] === targetSum) {
				console.log(`${input[i]} * ${input[j]} * ${input[k]} = ${input[i] * input[j] * input[k]}`);
				break outerLoop;
			}
		}
	}
}
