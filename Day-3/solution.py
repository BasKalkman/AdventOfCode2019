import re

data = open("./input.txt").read().split("\n")

wireOne = {}
wireTwo = {}
coordOne = {"x": 0, "y": 0}
coordTwo = {"x": 0, "y": 0}
wireOneSteps = 0
wireTwoSteps = 0

for i in data[0].split(","):
    d = i[0]
    num = int(re.findall(r"\d+", i)[0])
    for move in range(num):
        wireOneSteps += 1
        if d == "U":
            coordOne["y"] += 1
        if d == "D":
            coordOne["y"] += -1
        if d == "L":
            coordOne["x"] += -1
        if d == "R":
            coordOne["x"] += 1

        coord_str = (coordOne["x"], coordOne["y"])
        if coord_str not in wireOne:
            wireOne.setdefault(coord_str, wireOneSteps)


collisions = []
steps = []

for i in data[1].split(","):
    d = i[0]
    num = int(re.findall(r"\d+", i)[0])
    for move in range(num):
        wireTwoSteps += 1
        if d == "U":
            coordTwo["y"] += 1
        if d == "D":
            coordTwo["y"] += -1
        if d == "L":
            coordTwo["x"] += -1
        if d == "R":
            coordTwo["x"] += 1

        coord_str = (coordTwo["x"], coordTwo["y"])
        if coord_str in wireOne:
            collisions.append(abs(int(coordTwo["x"])) + abs(int(coordTwo["y"])))
            steps.append(wireOne.get(coord_str) + wireTwoSteps)

print("Part 1: ", min(collisions))
print("Part 2: ", min(steps))

