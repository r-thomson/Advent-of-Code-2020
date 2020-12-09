const fs = require('fs');

let curPointer = 0;
let accumulator = 0;
const ops = {
	acc(arg) {
		accumulator += +arg;
		curPointer++;
	},
	jmp(arg) {
		curPointer += +arg;
	},
	nop() {
		curPointer++;
	}
};
const callHistory = new Set(); // Instruction pointers already executed

const input = fs.readFileSync('input.txt').toString().trim();
const instructions = input.split('\n').map(line => line.split(' '));

while (curPointer < instructions.length) {
	if (callHistory.has(curPointer)) { break; } // Stop when the same instruction is ran twice
	callHistory.add(curPointer);
	const [op, arg] = instructions[curPointer];
	ops[op](arg);
}

console.log(accumulator);
