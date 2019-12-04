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

// PART 1
let matched = 0;
for (let i = parseInt(input[0]); i <= parseInt(input[1]); i++) {
    let numStr = i.toString();
    let obj = {};
    for (let char of numStr) {
        console.log(char);
        obj[char] ? obj[char]++ : (obj[char] = 1);
    }
    console.log(Object.values(obj));

    if (Object.values(obj).includes(2)) {
        matched++;
    }
}

console.log(matched);
