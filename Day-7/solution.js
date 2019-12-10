const fs = require('fs');
const { IntCodeComputer } = require('../shared/IntcodeComputer');
const data = fs
    .readFileSync('./example.txt', 'utf-8')
    .split(',')
    .map(Number);

function getInputArray(i) {
    let n1 = i % 5;
    let n2 = Math.floor(i / 5) % 5;
    let n3 = Math.floor(i / 25) % 5;
    let n4 = Math.floor(i / 125) % 5;
    let n5 = Math.floor(i / 625) % 5;

    return `${n5}${n4}${n3}${n2}${n1}`.split('').map(Number);
}

const amplifiers = [];
for (let i = 0; i < 5; i++) {
    let pc = new IntCodeComputer(data);
    amplifiers.push(pc);
}

const outputs = [];
let highestOutput = 0;
for (let i = 0; i < Math.pow(5, 5); i++) {
    // Get next phase setting
    let phaseSetting = getInputArray(i);
    // Reset amps
    amplifiers.forEach(e => e.reset());

    // Run amp 1
    amplifiers[0].changeInput(phaseSetting[0], 0);
    let resultAmp1 = amplifiers[0].processCode();

    // Run amp 2
    amplifiers[1].changeInput(phaseSetting[1], resultAmp1);
    let resultAmp2 = amplifiers[1].processCode();

    // Run amp 3
    amplifiers[2].changeInput(phaseSetting[2], resultAmp2);
    let resultAmp3 = amplifiers[2].processCode();

    // Run amp 4
    amplifiers[3].changeInput(phaseSetting[3], resultAmp3);
    let resultAmp4 = amplifiers[3].processCode();

    // Run amp 5
    amplifiers[4].changeInput(phaseSetting[4], resultAmp4);
    let resultAmp5 = amplifiers[4].processCode();

    outputs.push({ resultAmp5, phaseSetting });
    if (resultAmp5 > highestOutput) {
        highestOutput = resultAmp5;
    }
}

// let highestOutput = 0;
// let phaseTest = [];
// for (let output of outputs) {
//     if (output.resultAmp5 > highestOutput) {
//         highestOutput = output.resultAmp5;
//         phaseTest = output.phaseSetting;
//     }
// }

// console.log('Highest output: ', Math.max(...outputs));
console.log('Highest output: ', highestOutput);
