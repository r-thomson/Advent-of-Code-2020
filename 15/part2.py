from collections import defaultdict

input = [0, 5, 4, 1, 10, 14, 7]

hist = defaultdict(list)
last = input[-1]

for i, number in enumerate(input):
    hist[number].append(i + 1)

# This runs in 43 seconds on my machine
# It would take more than 43 seconds to optimize the code
for turn in range(len(input) + 1, 30000000 + 1):
    if len(hist[last]) > 1:
        number = hist[last][-1] - hist[last][-2]
    else:
        number = 0

    hist[number].append(turn)
    last = number

print(last)
