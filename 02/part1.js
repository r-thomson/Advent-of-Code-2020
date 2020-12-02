const fs = require('fs');

const isValid = (str) => {
	const regex = /(\d+)-(\d+) (.): (.+)/;
	const [, low, high, char, pass] = str.match(regex);

	const occurrences = (pass.match(new RegExp(char, 'g')) || []).length;
	return (occurrences >= low && occurrences <= high);
};

const input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);
console.log(input.filter(isValid).length);
