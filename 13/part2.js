const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();
const busses = input.split('\n')[1].split(',').map(b => parseInt(b));

/* BASIC IDEA OF THIS SOLUTION (Chinese remainder theorem)
We want t where (t + index) % busID === 0 for every item in busses
If we start with a bus ID of 7, we only need to check every 7th number once we find a matching
timestamp, because any other number wouldn't satisfy the condition for the first bus.
Say the second bus is 13, we can skip ahead 7 * 13 at a time. Repeat for every other bus.
Essentially, we're filtering out everything that won't satisfy for the previous busses.
This solution also probably won't work as implemented if the values aren't coprime. */

let i = 0, time = 1, stride = 1;
while (i < busses.length) {
	if (isNaN(busses[i])) { i++; continue; }
	
	if ((time + i) % busses[i] === 0) {
		stride *= busses[i];
		i += 1;
	} else {
		time += stride;
	}
}

console.log(time);
