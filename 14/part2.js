/* global BigInt */
const fs = require('fs');

const applyMask = (mask, address) => {
	const oneMask = parseInt(mask.replaceAll('X', '0'), 2);
	address = Number(BigInt(address) | BigInt(oneMask));
	
	// This is a pretty gross solution, but I don't really feel like spending more time on this one
	const addrBinary = address.toString(2).padStart(mask.length, '0'); // address in base2
	const floatCount = (mask.match(/X/g) || []).length; // amount of 'floating' bits
	const permutations = [];
	for (let i = 0; i < Math.pow(2, floatCount); i++) {
		const iterBits = i.toString(2).padStart(floatCount, '0').split('');
		const val = mask.split('').map((ch, i) => ch === 'X' ? iterBits.shift() : addrBinary[i]).join('');
		permutations.push(parseInt(val, 2));
	}
	return permutations;
};

const memory = new Map();
let mask = null;

const input = fs.readFileSync('input.txt').toString().trim();
input.split('\n').forEach(line => {
	if (line.startsWith('mask')) {
		mask = line.slice('mask = '.length);
	} else if (line.startsWith('mem')) {
		const [, addr, value] = line.match(/mem\[(\d+)\] = (\d+)/);
		applyMask(mask, addr).forEach(addr => void memory.set(addr, parseInt(value)));
	} else {
		throw Error('Bad input');
	}
});

console.log(Array.from(memory.values()).reduce((a, v) => a + v, 0));
