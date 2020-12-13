const fs = require('fs');

// Corrects for floating point errors around whole numbers, so Math.sin(Math.PI) isn't 1.2246467991473532e-16
const floatCorrectDecorator = (fn) => ((...args) => {
	const exact = fn(...args), rounded = Math.round(exact);
	return Math.abs(exact - rounded) <= Number.EPSILON ? rounded : exact;
});
Math.sin = floatCorrectDecorator(Math.sin);
Math.cos = floatCorrectDecorator(Math.cos);

const degreesToRadians = radians => radians * (Math.PI / 180);

let position = [0, 0]; // +east/-west, +north/-south
let facing = 0; // east = 0°, north = 90, ...

const input = fs.readFileSync('input.txt').toString().trim();
const moves = input.split('\n').map(line => ({ instr: line.slice(0, 1), amount: parseInt(line.slice(1)) }));

moves.forEach(({instr, amount}) => {
	switch (instr) {
	case 'N':
		position[1] += amount;
		break;
	case 'S':
		position[1] -= amount;
		break;
	case 'E':
		position[0] += amount;
		break;
	case 'W':
		position[0] -= amount;
		break;
	case 'L':
		facing += amount;
		break;
	case 'R':
		facing -= amount;
		break;
	case 'F': {
		const angle = degreesToRadians(facing % 360); // Normalize to reduce float err accumulation
		const unit = [Math.cos(angle), Math.sin(angle)];
		position = position.map((v, i) => v + amount * unit[i]);
		break;
	}
	default:
		throw new Error('Unknown command');
	}
});

console.log(Math.abs(position[0]) + Math.abs(position[1]));
