import Foundation

let input = try! String(contentsOfFile: "input.txt")
var last = SeatLayout(fromString: input)
var next = last.next()

while last != next {
	last = next
	next = last.next()
}

print(next.state.flatMap { $0 }.filter { $0 == .occupied }.count)

struct SeatLayout: Equatable, CustomStringConvertible {
	var state: [[SeatCondition]]
	
	init(fromString string: String) {
		self.state = string.split(separator: Character("\n"))
			.map { $0.map { SeatCondition(rawValue: $0)! } }
	}
	
	init(state: [[SeatCondition]]) {
		self.state = state
	}
	
	func occupiedCount(at: (x: Int, y: Int)) -> Int {
		// I'm sure there's a better way to do this...
		return [(1, 1), (1, 0), (1, -1), (0, 1), (0, -1), (-1, 1), (-1, 0), (-1, -1)]
			.map { (at.x + $0.0, at.y + $0.1) }
			.filter { state[safe: $0.1]?[safe: $0.0] == .occupied }
			.count
	}
	
	func next() -> SeatLayout {
		let newState = self.state.enumerated().map { (y, line) -> [SeatCondition] in
			line.enumerated().map { (x, el) -> SeatCondition in
				switch el {
				case .empty:
					return occupiedCount(at: (x, y)) == 0 ? .occupied : .empty
				case .occupied:
					return occupiedCount(at: (x, y)) >= 4 ? .empty : .occupied
				case .floor:
					return .floor
				}
			}
		}
		return SeatLayout(state: newState)
	}
	
	var description: String {
		return self.state.map { String($0.map { $0.rawValue }) }.joined(separator: "\n")
	}
}

enum SeatCondition: Character {
	case empty = "L"
	case occupied = "#"
	case floor = "."
}

// https://stackoverflow.com/a/30593673
extension Collection {
	subscript (safe index: Index) -> Element? {
		return indices.contains(index) ? self[index] : nil
	}
}
