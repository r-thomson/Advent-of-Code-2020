const fs = require('fs');

const tokenize = exprStr => exprStr.match(/(\d+|[+*()])/g).map(tkn => isNaN(tkn) ? tkn : parseInt(tkn));

// Amazingly, this works.
// Perhaps later I'll come back and rewrite this as a proper operator precedence parser
const parse = (expression) => {
	const iterator = tokenize(expression).values();
	const consume = () => {
		const { value } = iterator.next();
		if (value === '(') { return parserFn(); }
		return value;
	};
	const parserFn = (elements = []) => {
		for (let {value, done} = iterator.next(); !done; {value, done} = iterator.next()) {
			if (value === '(') { elements.push(parserFn()); continue; }
			if (value === ')') { break; }
			if (value === '+') { elements.push([elements.pop(), value, consume()]); continue; }
			elements.push(value);
		}
		return elements;
	};
	return parserFn();
};

const solve = (parsed) => {
	parsed = parsed.map(v => Array.isArray(v) ? solve(v) : v);
	let result = parsed[0];
	for (let i = 1; i < parsed.length; i += 2) {
		if (parsed[i] === '+') {
			result += parsed[i + 1];
		} else if (parsed[i] === '*') {
			result *= parsed[i + 1];
		}
	}
	return result;
};

const input = fs.readFileSync('input.txt').toString().trim();
console.log(input.split('\n').map(line => solve(parse(line))).reduce((a, v) => a + v, 0));
