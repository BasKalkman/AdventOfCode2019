const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');
const wireOneRoute = data[0].split(',');
const wireTwoRoute = data[1].split(',');

// PART 1
const wireOne = new Map();

let coordWireOne = { x: 0, y: 0 };
let coordWireTwo = { x: 0, y: 0 };
let stepsWireOne = 0;
let stepsWireTwo = 0;

wireOneRoute.forEach(e => {
    let num = parseInt(e.match(/\d+/)[0]);
    let dir = e[0];

    for (let i = 0; i < num; i++) {
        if (dir === 'R') {
            coordWireOne.x++;
        }
        if (dir === 'L') {
            coordWireOne.x--;
        }
        if (dir === 'U') {
            coordWireOne.y++;
        }
        if (dir === 'D') {
            coordWireOne.y--;
        }

        stepsWireOne++;
        wireOne.set(`${coordWireOne.x},${coordWireOne.y}`, stepsWireOne);
    }
});

const crossings = [];
const steps = [];
wireTwoRoute.forEach(e => {
    let num = parseInt(e.match(/\d+/)[0]);
    let dir = e[0];

    for (let i = 0; i < num; i++) {
        if (dir === 'R') {
            coordWireTwo.x++;
        }
        if (dir === 'L') {
            coordWireTwo.x--;
        }
        if (dir === 'U') {
            coordWireTwo.y++;
        }
        if (dir === 'D') {
            coordWireTwo.y--;
        }

        stepsWireTwo++;

        let str = `${coordWireTwo.x},${coordWireTwo.y}`;
        if (wireOne.has(str)) {
            crossings.push(str);
            steps.push(wireOne.get(str) + stepsWireTwo);
        }
    }
});

let distances = crossings.map(e => {
    let nums = e.split(',').map(Number);
    return Math.abs(nums[0]) + Math.abs(nums[1]);
});

console.log('Part 1: ', Math.min(...distances));
console.log('Part 2: ', Math.min(...steps));
