const fs = require('fs');
const { IntCodeComputer } = require('../shared/IntcodeComputer');
const data = fs
    .readFileSync('./example.txt', 'utf-8')
    .split(',')
    .map(Number);

// Generate phaseSettings array
let phaseSettings = [];
for (let i = 0; i < Math.pow(5, 5); i++) {
    let n1 = i % 5;
    let n2 = Math.floor(i / 5) % 5;
    let n3 = Math.floor(i / 25) % 5;
    let n4 = Math.floor(i / 125) % 5;
    let n5 = Math.floor(i / 625) % 5;

    let arr = [n5, n4, n3, n2, n1];
    let test = [...new Set(arr)];

    if (test.length == arr.length) {
        phaseSettings.push(arr);
    }
}

// Generate amplifiers
const amplifiers = [];
for (let i = 0; i < 5; i++) {
    let pc = new IntCodeComputer(data.slice(0));
    amplifiers.push(pc);
}

const outputs = [];
for (let i = 0; i < phaseSettings.length; i++) {
    let phaseSetting = phaseSettings[i];

    let result = 0;
    // Reset computers, set phase
    amplifiers.forEach((e, index) => {
        e.reset();
        e.setData(data.slice(0));
        e.setPhase(phaseSetting[index]);
        e.setInput(result);
        result = e.processCode();
    });

    outputs.push({ result, phaseSetting });
}

let highest = outputs.reduce((a, c) => {
    return a.result > c.result ? a : c;
}, {});

console.log('highest: ', highest);
