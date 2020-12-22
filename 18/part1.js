const fs = require('fs');

// Something interesting in JS: isNan and Number.isNaN are not the same (unlike parseInt)
const tokenize = exprStr => exprStr.match(/(\d+|[+*()])/g).map(tkn => isNaN(tkn) ? tkn : parseInt(tkn));

const parse = (expression) => {
	const iterator = tokenize(expression).values();
	const parserFn = () => {
		const elements = [];
		for (let {value, done} = iterator.next(); !done; {value, done} = iterator.next()) {
			if (value === ')') { break; }
			elements.push(value === '(' ? parserFn() : value);
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
