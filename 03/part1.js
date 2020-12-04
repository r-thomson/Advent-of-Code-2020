const fs = require('fs');

// Creates a 2-dimensional boolean array
const input = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);
const map = input.map(line => line.split(''));

const mapGet = ({x, y}) => map[y][x % map[y].length];
const treeAtPoint = ({x, y}) => mapGet({x, y}) === '#';

let treesEncountered = 0;
const slope = {x: 3, y: 1};
for (const pos = {x: 0, y: 0}; pos.y < map.length; pos.x += slope.x, pos.y += slope.y) {
	if (treeAtPoint(pos)) {
		treesEncountered += 1;
	}
}

console.log(treesEncountered);
