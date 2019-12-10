const { IntCodeComputer } = require('../shared/IntcodeComputer');
const fs = require('fs');

const data = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(',')
    .map(Number);
data[1] = 12;
data[2] = 2;

const pc = new IntCodeComputer(data);

pc.processCode();

// PART 1
function checkInput(arr) {
    let i = 0;
    while (data[i] != 99) {
        let instruction = arr.slice(i + 1, i + 4);
        let num = 0;
        if (data[i] === 1) {
            num = arr[instruction[0]] + arr[instruction[1]];
        }
        if (data[i] === 2) {
            num = arr[instruction[0]] * arr[instruction[1]];
        }

        arr[instruction[2]] = num;

        i += 4;
    }
}
checkInput(data);

console.log('Part1: ', data[0]);

// PART 2
const p2 = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(',')
    .map(Number);
const requiredOutput = 19690720;

for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
        let testArr = p2.slice(0);
        testArr[1] = i;
        testArr[2] = j;
        checkInput(testArr);

        if (testArr[0] === requiredOutput) {
            console.log('RESULT: ', 100 * i + j);
            return;
        }
    }
}
