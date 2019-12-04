const input = '147981-691423'.split('-');

// Within range
// Two adjacent numbers are the same
// Number to the right never lower than left.

function sorted(num) {
    let newNum = num
        .toString()
        .split('')
        .sort()
        .join('');
    return newNum;
}

let matched = 0;
for (let i = parseInt(input[0]); i <= parseInt(input[1]); i++) {
    if (sorted(i) === i.toString()) {
        let numStr = i.toString();
        let count = 0;
        let doubled = false;

        for (let x = 0; x < numStr.length; x++) {
            if (numStr[x] === numStr[x + 1] && numStr[x] != numStr[x + 2] && numStr[x] != numStr[x - 1]) {
                doubled = true;
            }
        }

        if (doubled === true) {
            matched++;
        }
    }
}

console.log(matched);
