const fs = require('fs');

const parseLine = (str) => {
	// I initially tried one monster regex, this was much better
	const [parent, childStr] = str.split(' bags contain ');
	const children = childStr === 'no other bags.' ? []
		: childStr.split(', ').map(child => child.match(/(\d+) (.+) bags?/).slice(1));
	return { parent, children };
};

const bags = new Map(); // key: child bag, value: array of { parent, amount }
const input = fs.readFileSync('input.txt').toString().trim();
input.split('\n').forEach(line => {
	const { parent, children } = parseLine(line);
	children.forEach(([amount, child]) => {
		bags.set(child, [...(bags.get(child) || []), { parent, amount }]);
	});
});

const seen = new Set();
const stack = ['shiny gold'];
do {
	const current = stack.pop();
	if (!seen.has(current)) {
		seen.add(current);
		if (bags.has(current)) {
			stack.push(...bags.get(current).map(b => b.parent));
		}
	}
} while (stack.length > 0);

console.log(seen.size - 1);
