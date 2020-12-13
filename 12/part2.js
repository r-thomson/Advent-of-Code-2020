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
let waypointOff = [10, 1]; // +east/-west, +north/-south

const input = fs.readFileSync('input.txt').toString().trim();
const moves = input.split('\n').map(line => ({ instr: line.slice(0, 1), amount: parseInt(line.slice(1)) }));

moves.forEach(({instr, amount}) => {
	switch (instr) {
	case 'N':
		waypointOff[1] += amount;
		break;
	case 'S':
		waypointOff[1] -= amount;
		break;
	case 'E':
		waypointOff[0] += amount;
		break;
	case 'W':
		waypointOff[0] -= amount;
		break;
	case 'L': {
		const angle = degreesToRadians(amount % 360);
		const [x, y] = waypointOff;
		waypointOff = [
			x * Math.cos(angle) - y * Math.sin(angle),
			x * Math.sin(angle) + y * Math.cos(angle)
		];
		break;
	}
	case 'R': {
		const angle = degreesToRadians(amount % 360);
		const [x, y] = waypointOff;
		waypointOff = [
			 x * Math.cos(angle) + y * Math.sin(angle),
			-x * Math.sin(angle) + y * Math.cos(angle)
		];
		break;
	}
	case 'F': {
		position = position.map((v, i) => v + amount * waypointOff[i]);
		break;
	}
	default:
		throw new Error('Unknown command');
	}
});

console.log(Math.abs(position[0]) + Math.abs(position[1]));
