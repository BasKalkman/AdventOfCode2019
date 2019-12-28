from collections import Counter

num_min, num_max = [int(x) for x in "147981-691423".split("-")]

countP1 = 0
countP2 = 0

for i in range(num_min, num_max):
    num = str(i)
    if list(num) == sorted(num) and len(list(num)) != len(set(num)):
        countP1 += 1
        if 2 in Counter(num).values():
            countP2 += 1

print("Part 1: ", countP1)
print("Part 2: ", countP2)
