const { IntCodeComputer } = require('../shared/IntcodeComputer');
const fs = require('fs');
const data = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(',')
    .map(Number);

const pc = new IntCodeComputer(data);
pc.processCode();
