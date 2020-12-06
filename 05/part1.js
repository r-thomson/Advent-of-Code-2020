const fs = require('fs');

const getRowCol = str => [str.slice(0, 7), str.slice(7, 10)];
const getSeatID = (row, column) => row * 8 + column;

const decode = (str) => {
	const [row, col] = getRowCol(str);
	// Not the most satisfying solution, but it works well: just parse as a binary int
	const rowIndex = Number.parseInt(row.replaceAll('F', 0).replaceAll('B', 1), 2);
	const colIndex = Number.parseInt(col.replaceAll('L', 0).replaceAll('R', 1), 2);
	return getSeatID(rowIndex, colIndex);
};

const input = fs.readFileSync('input.txt').toString().trim();
console.log(input.split('\n').map(decode).reduce((val, acc) => Math.max(val, acc)));
