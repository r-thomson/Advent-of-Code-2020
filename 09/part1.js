const fs = require('fs');

const PREAMBLE_LEN = 25;
const input = fs.readFileSync('input.txt').toString().trim();
const numbers = input.split('\n').map(str => Number.parseInt(str));

for (let i = PREAMBLE_LEN; i < numbers.length; i++) {
	const target = numbers[i];
	const available = new Set(numbers.slice(i - PREAMBLE_LEN, i));
	
	if (!Array.from(available).some(val => (target !== 2 * val) && available.has(target - val))) {
		console.log(target);
		break;
	}
}
