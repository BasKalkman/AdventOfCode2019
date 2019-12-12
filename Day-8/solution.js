const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf-8');

const layers = [];
let tempStr = '';
for (let i = 0; i < data.length; i++) {
    tempStr = tempStr + data[i];

    if (tempStr.length === 25 * 6) {
        layers.push(tempStr);
        tempStr = '';
    }
}

let leastZeroString = layers.reduce((a, c) => {
    if (!a) {
        a = c;
    }
    return c.match(/0/g).length < a.match(/0/g).length ? c : a;
}, null);

let ones = leastZeroString.match(/1/g).length;
let twos = leastZeroString.match(/2/g).length;
console.log('Part 1: ', ones * twos);
