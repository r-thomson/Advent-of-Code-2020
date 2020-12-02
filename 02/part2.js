const fs = require('fs');

const isValid = (str) => {
	const regex = /(\d+)-(\d+) (.): (.+)/;
	const [, low, high, char, pass] = str.match(regex);

	return (pass[low-1] === char) !== (pass[high-1] === char);
};

const input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);
console.log(input.filter(isValid).length);
