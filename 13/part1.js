const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();
const earliestTime = parseInt(input.split('\n')[0]);
const arrivals = input.split('\n')[1].split(',').map(v => parseInt(v)).filter(v => !isNaN(v));

const earliestBus = arrivals.reduce((accID, curID) => {
	const accMod = earliestTime % accID;
	const curMod = earliestTime % curID;
	return curMod > accMod ? curID : accID;
});

console.log((earliestBus - earliestTime % earliestBus) * earliestBus);
