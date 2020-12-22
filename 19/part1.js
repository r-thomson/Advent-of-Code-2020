const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();
const [ruleInput, messageInput] = input.split('\n\n');

const messages = messageInput.split('\n');
const rules = new Map();
ruleInput.split('\n').forEach(line => {
	const [ruleNumber, ruleText] = line.split(': ');
	rules.set(ruleNumber, ruleText);
});

const buildRegexStr = (rule) => {
	if (rule.match(/"[a-z]"/)) {
		return rule.slice(1, -1); // remove quotes
	} else {
		const subRules = rule.split(' | ').map(rule => {
			return rule.split(' ').map(ruleNum => buildRegexStr(rules.get(ruleNum))).join('');
		});
		return `(?:${subRules.join('|')})`;
	}
};

const regex = new RegExp(`^${buildRegexStr(rules.get('0'))}$`);
console.log(messages.filter(msg => msg.match(regex)).length);
