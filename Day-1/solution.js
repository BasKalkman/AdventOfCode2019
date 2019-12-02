const fs = require('fs');

const data = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\r\n')
    .map(Number);

// PART 1
const part1 = data.reduce((a, c) => {
    const fuel = Math.floor(c / 3) - 2;
    return a + fuel;
}, 0);

console.log(part1);

// PART 2
function calcFuel(mass) {
    if (Math.floor(mass / 3) - 2 <= 0) {
        return 0;
    }

    const fuel = Math.floor(mass / 3) - 2;
    const fuelAdded = calcFuel(fuel);

    return fuel + fuelAdded;
}

const part2 = data.reduce((a, c) => {
    return a + calcFuel(c);
}, 0);

console.log(part2);
