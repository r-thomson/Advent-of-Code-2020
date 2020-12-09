const fs = require('fs');

const check = (instructions) => {
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
	const callHistory = new Set();  // Instruction pointers already executed

	while (curPointer < instructions.length) {
		if (callHistory.has(curPointer)) { throw Error('Infinite loop'); }
		callHistory.add(curPointer);
		const [op, arg] = instructions[curPointer];
		ops[op](arg);
	}
	if (curPointer !== instructions.length) { throw Error('Wrong exit code'); }
	return accumulator;
};

const input = fs.readFileSync('input.txt').toString().trim();
const instructions = input.split('\n').map(line => line.split(' '));

// Prepare for an ugly brute-force solution
for (let i = 0; i < instructions.length; i++) {
	const [op, arg] = instructions[i];
	if (op !== 'acc') { // We can't flip an acc
		const permutation = instructions.slice(); // I wish splice was non-mutating
		permutation.splice(i, 1, [op === 'jmp' ? 'nop' : 'jmp', arg]);
		
		try {
			const accumulatedValue = check(permutation);
			console.log(accumulatedValue);
			break;
		} catch { continue; }
	}
}
