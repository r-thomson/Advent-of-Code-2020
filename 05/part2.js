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
const takenSeats = new Set(input.split('\n').map(decode));
for (const id of takenSeats) {
	if (!takenSeats.has(id + 1) && takenSeats.has(id + 2)) {
		console.log(id + 1);
		break;
	}
}
