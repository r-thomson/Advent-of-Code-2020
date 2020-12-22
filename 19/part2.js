const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();
const [ruleInput, messageInput] = input.split('\n\n');

const messages = messageInput.split('\n');
const rules = new Map();
ruleInput.split('\n').forEach(line => {
	const [ruleNumber, ruleText] = line.split(': ');
	rules.set(ruleNumber, ruleText);
});

rules.set('8', '42 | 42 8');
rules.set('11', '42 31 | 42 11 31');

// JavaScript's regular expression engine doesn't support recursion, we can't do this the 'right' way
// So, let's just hack together special cases for rules 8 and 11!
const buildRegexStr = (rule) => {
	if (rule.match(/"[a-z]"/)) {
		return rule.slice(1, -1); // remove quotes
	} else if (rule === rules.get('8')) {
		return `(?:${buildRegexStr(rules.get('42'))}+)`;
	} else if (rule === rules.get('11')) {
		// Speaking of hacks: this requires recursion, so instead we hard-code with a fixed length
		const regex31 = buildRegexStr(rules.get('31')), regex42 = buildRegexStr(rules.get('42'));
		const versions = [];
		for (let i = 1; i <= 9; i++) {
			versions.push(`(?:${regex42}{${i}}${regex31}{${i}})`);
		}
		return `(?:${versions.join('|')})`;
	} else {
		const subRules = rule.split(' | ').map(rule => {
			return rule.split(' ').map(ruleNum => buildRegexStr(rules.get(ruleNum))).join('');
		});
		return `(?:${subRules.join('|')})`;
	}
};

const regex = new RegExp(`^${buildRegexStr(rules.get('0'))}$`);
console.log(messages.filter(msg => msg.match(regex)).length);
