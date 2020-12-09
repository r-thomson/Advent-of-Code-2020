const fs = require('fs');

const parseLine = (str) => {
	// I initially tried one monster regex, this was much better
	const [parent, childStr] = str.split(' bags contain ');
	const children = childStr === 'no other bags.' ? []
		: childStr.split(', ').map(child => child.match(/(\d+) (.+) bags?/).slice(1));
	return { parent, children };
};

const bags = new Map(); // key: parent bag, value: array of { child, amount }
const input = fs.readFileSync('input.txt').toString().trim();
input.split('\n').forEach(line => {
	const { parent, children } = parseLine(line);
	children.forEach(([amount, child]) => {
		bags.set(parent, [...(bags.get(parent) || []), { child, amount }]);
	});
});

const traverse = (bag) => {
	if (bags.has(bag)) {
		const children = bags.get(bag);
		return children.reduce((acc, { child, amount }) => acc + amount*traverse(child), 1);
	} else {
		return 1;
	}
};
console.log(traverse('shiny gold') - 1);
