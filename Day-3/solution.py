import re
import math

data = open("./input.txt").read().split("\n")

wireOne = {}
wireTwo = {}
coordOne = {"x": 0, "y": 0}
coordTwo = {"x": 0, "y": 0}

for i in data[0].split(","):
    d = i[0]
    num = int(re.findall(r"\d+", i)[0])
    for move in range(num):
        if d == "U":
            coordOne["y"] += 1
        if d == "D":
            coordOne["y"] += -1
        if d == "L":
            coordOne["x"] += -1
        if d == "R":
            coordOne["x"] += 1

        coord_str = "x:{},y:{}".format(coordOne["x"], coordOne["y"])
        if coord_str not in wireOne:
            wireOne.setdefault(coord_str, wireOne.__len__)


collisions = []

for i in data[1].split(","):
    d = i[0]
    num = int(re.findall(r"\d+", i)[0])
    for move in range(num):
        if d == "U":
            coordTwo["y"] += 1
        if d == "D":
            coordTwo["y"] += -1
        if d == "L":
            coordTwo["x"] += -1
        if d == "R":
            coordTwo["x"] += 1

        coord_str = "x:{},y:{}".format(coordTwo["x"], coordTwo["y"])
        if coord_str in wireOne:
            collisions.append(abs(int(coordTwo["x"])) + abs(int(coordTwo["y"])))

print(min(collisions))

