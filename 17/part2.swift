import Foundation

var activePositions = Set<Vec4>() // Stores all positions that are in an 'active' state

// Load the initial state
let input = try! String(contentsOfFile: "input.txt")
input.split(separator: "\n").enumerated().forEach { (y, line) in
	line.enumerated().forEach { (x, ch) in
		if ch == "#" { activePositions.insert(Vec4(x: x, y: y, z: 0, w: 0)) }
	}
}

for _ in 1...6 {
	// We need to run the simulation for every currently active position, plus everything adjacent
	let simulationSpace = activePositions
		.map { adjacentCoords(to: $0) }
		.reduce(activePositions) { $0.union($1) }
	
	var activeNext = Set<Vec4>()
	for pos in simulationSpace {
		let activeAdj = adjacentCoords(to: pos).filter(activePositions.contains).count
		if activePositions.contains(pos) && (activeAdj == 2 || activeAdj == 3) {
			activeNext.insert(pos)
		} else if !activePositions.contains(pos) && activeAdj == 3 {
			activeNext.insert(pos)
		}
	}
	
	activePositions = activeNext
}

print(activePositions.count)

// I could have sworn that Swift has hashable tuples...
struct Vec4: Equatable, Hashable {
	var x: Int
	var y: Int
	var z: Int
	var w: Int
}

func adjacentCoords(to pos: Vec4) -> Set<Vec4> {
	var adjacent: Set<Vec4> = []
	for x in -1...1 {
		for y in -1...1 {
			for z in -1...1 {
				for w in -1...1 {
					guard x != 0 || y != 0 || z != 0 || w != 0 else { continue }
					adjacent.insert(Vec4(x: pos.x + x, y: pos.y + y, z: pos.z + z, w: pos.w + w))
				}
			}
		}
	}
	return adjacent
}
