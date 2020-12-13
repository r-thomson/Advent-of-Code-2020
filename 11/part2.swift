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
			.filter { moveAmount in
				var cursor: (x: Int, y: Int) = at + moveAmount
				while let seat = state[safe: cursor.y]?[safe: cursor.x] {
					if seat == .occupied { return true }
					if seat == .empty { return false }
					cursor = cursor + moveAmount
				}
				return false
			}
			.count
	}
	
	func next() -> SeatLayout {
		let newState = self.state.enumerated().map { (y, line) -> [SeatCondition] in
			line.enumerated().map { (x, el) -> SeatCondition in
				switch el {
				case .empty:
					return occupiedCount(at: (x, y)) == 0 ? .occupied : .empty
				case .occupied:
					return occupiedCount(at: (x, y)) >= 5 ? .empty : .occupied
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

// https://stackoverflow.com/a/54144574
func +<T: Numeric> (lhs: (T, T), rhs: (T, T)) -> (T, T) {
	return (lhs.0 + rhs.0, lhs.1 + rhs.1)
}
