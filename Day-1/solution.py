import math

# Part 1
data = open("./input.txt", "r").read().split("\n")

fuelPart1 = 0

for mass in data:
    fuelPart1 += math.floor(int(mass) / 3) - 2


print(fuelPart1)


# Part 2
def calcFuel(mass):
    fuel = math.floor(int(mass) / 3) - 2

    if fuel <= 0:
        return 0

    return fuel + calcFuel(fuel)


fuelPart2 = 0
for mass in data:
    fuelPart2 += calcFuel(mass)

print(fuelPart2)
