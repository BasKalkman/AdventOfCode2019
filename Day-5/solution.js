const { IntCodeComputer } = require('../shared/IntcodeComputer');
const fs = require('fs');
const data = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(',')
    .map(Number);

const pc = new IntCodeComputer(data.slice(0));
pc.setInput(1);
let resultP1 = pc.processCode();

console.log('Part 1: ', resultP1);

pc.reset();
pc.setInput(5);
let resultP2 = pc.processCode();

console.log('Part 2: ', resultP2);
