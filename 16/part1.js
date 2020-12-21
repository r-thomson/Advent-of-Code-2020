const fs = require('fs');

const range = (lower, upper) => Array.from(Array(upper - lower + 1), (v, i) => +lower + i);

// Certainly not my best parsing work
const input = fs.readFileSync('input.txt').toString().trim();
const [rules, , nearby] = input.split('\n\n');

const valid = new Set();
rules.split('\n').forEach(line => {
	const [low1, high1, low2, high2] = line.match(/\d+/g);
	range(low1, high1).forEach(v => valid.add(v));
	range(low2, high2).forEach(v => valid.add(v));
});

const tickets = nearby.split('\n').slice(1).map(line => line.split(',').map(v => parseInt(v)));
const invalid = tickets.flat().filter(v => !valid.has(v));

console.log(invalid.reduce((a, v) => a + v, 0));
