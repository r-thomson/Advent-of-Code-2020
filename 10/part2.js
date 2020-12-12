const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();
const adapterRatings = input.split('\n').map(line => Number.parseInt(line));
adapterRatings.push(0); // It turns out having a 0 at the start is really important
adapterRatings.sort((a, b) => a - b); // ascending sort

const cache = new Map(); // Makes a recursive solution viable
const recursive = (index) => {
	if (index === adapterRatings.length - 1) { return 1; }
	if (cache.has(index)) { return cache.get(index); }
	
	const next = [];
	for (let i = index + 1; adapterRatings[i] <= adapterRatings[index] + 3; i++) {
		next.push(i);
	}
	
	const result = next.map(recursive).reduce((a, v) => a + v);
	cache.set(index, result);
	return result;
};

console.log(recursive(0));
