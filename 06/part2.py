from collections import defaultdict  # basically the only reason I did this one in Python

count = 0

with open('input.txt') as file:
	groups = file.read().strip().split('\n\n')

for group in groups:
	questions = defaultdict(int)
	lines = group.split('\n')
	for line in lines:
		for char in line:
			questions[char] += 1
	count += len([v for v in questions.values() if v == len(lines)])

print(count)
