const fs = require('fs');

const PREAMBLE_LEN = 25;
const input = fs.readFileSync('input.txt').toString().trim();
const numbers = input.split('\n').map(str => Number.parseInt(str));

let firstInvalid = undefined;
for (let i = PREAMBLE_LEN; i < numbers.length; i++) {
	const target = numbers[i];
	const available = new Set(numbers.slice(i - PREAMBLE_LEN, i));
	
	if (!Array.from(available).some(val => (target !== 2 * val) && available.has(target - val))) {
		firstInvalid = target;
		break;
	}
}

const sum = (arr => arr.reduce((a, b) => a+b, 0)); // reducer

for (let i = 0; i < numbers.length; i++) {
	const contiguous = [];
	// Collect contiguous numbers until their sum reaches firstInvalid
	for (let j = i; sum(contiguous) < firstInvalid; j++) {
		contiguous.push(numbers[j]);
	}
	
	if (contiguous.length > 1 && sum(contiguous) === firstInvalid) {
		// 10 minutes of debugging here because I forgot that JS array sorting is stupid by default
		contiguous.sort((a, b) => a - b);
		console.log(contiguous.shift() + contiguous.pop());
		break;
	}
}
