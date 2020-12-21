const fs = require('fs');

class Range {
	constructor(low, high) {
		this.low = low, this.high = high;
	}
	
	includes(val) {
		return val >= this.low && val <= this.high;
	}
}

const input = fs.readFileSync('input.txt').toString().trim();
const [rules, yours, nearby] = input.split('\n\n');

const fields = new Map(); // field name: [Range]
rules.split('\n').forEach(line => {
	const [field, ranges] = line.split(':');
	const [low1, high1, low2, high2] = ranges.match(/\d+/g);
	fields.set(field, [new Range(low1, high1), new Range(low2, high2)]);
});

const yourTicket = yours.split('\n')[1].split(',').map(v => parseInt(v));

const validTickets = nearby.split('\n').slice(1)
	.map(line => line.split(',').map(v => parseInt(v)))
	.filter(ticket => ticket.every(val =>
		[...fields.values()].flat().some(range => range.includes(val)))
	);

const ticketFieldNum = validTickets[0].length; // assuming they're all the same
const discoveredFields = new Map(); // field name: index in ticket

// Get ready for some realy gnarly code
for (let i = 0; i < ticketFieldNum; i++) {
	searchLoop:
	for (let i = 0; i < ticketFieldNum; i++) {
		if (new Set(discoveredFields.keys()).has(i)) { continue; }
	
		// Try to find a rule that uniquely validates this field
		let matchingField = null;
		for (const field of fields.keys()) {
			if (discoveredFields.has(field)) { continue; }
			
			// Check if this rule matches this field on every ticket
			if (validTickets.every(ticket => fields.get(field).some(range => range.includes(ticket[i])))) {
				if (matchingField == null) {
					matchingField = field;
				} else {
					continue searchLoop; // We can't uniquely solve this index, move on
				}
			}
		}
		if (matchingField) {
			discoveredFields.set(matchingField, i);
			break;
		}
	}
}

console.log(
	[...discoveredFields.keys()]
		.filter(k => k.startsWith('departure'))
		.map(k => yourTicket[discoveredFields.get(k)])
		.reduce((a, v) => a * v, 1)
);
