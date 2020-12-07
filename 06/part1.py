from collections import defaultdict  # basically the only reason I did this one in Python

count = 0

with open('input.txt') as file:
	groups = file.read().strip().split('\n\n')

for group in groups:
	questions = defaultdict(int)
	for line in group.split('\n'):
		for char in line:
			questions[char] += 1
	count += len(questions)

print(count)
