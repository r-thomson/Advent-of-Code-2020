/* global BigInt */
const fs = require('fs');

const applyMask = (mask, number) => {
	const zeroMask = parseInt(mask.replaceAll('X', '1'), 2);
	const oneMask = parseInt(mask.replaceAll('X', '0'), 2);
	// JS bitwise operators are limited to 32 bits, so we need to wrap in BigInt
	return Number((BigInt(number) & BigInt(zeroMask)) | BigInt(oneMask));
};

const memory = new Map();
let mask = null;

const input = fs.readFileSync('input.txt').toString().trim();
input.split('\n').forEach(line => {
	if (line.startsWith('mask')) {
		mask = line.slice('mask = '.length);
	} else if (line.startsWith('mem')) {
		const [, addr, value] = line.match(/mem\[(\d+)\] = (\d+)/);
		memory.set(addr, applyMask(mask, value));
	} else {
		throw Error('Bad input');
	}
});

console.log(Array.from(memory.values()).reduce((a, v) => a + v, 0));
