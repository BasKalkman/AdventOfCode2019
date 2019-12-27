from PythonIntcode import IntcodeComputer

data = [int(i) for i in open("./input.txt", "r").read().split(",")]


# PART 1
p1 = IntcodeComputer(data)
p1.data[1] = 12
p1.data[2] = 2

p1.run()

print(p1.data[0])


# PART 2
noun = 0
verb = 0
for i in range(100):
    for j in range(100):
        p1.reset()
        p1.data[1] = i
        p1.data[2] = j
        p1.run()

        if p1.data[0] == 19690720:
            noun = i
            verb = j


print(100 * noun + verb)
