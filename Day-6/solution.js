const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const allOrbits = {};

for (orbit of data) {
    let masses = orbit.split(')').map(e => e.toString());

    // Init orbits if not yet there
    if (!allOrbits[masses[0]]) {
        allOrbits[masses[0]] = {
            name: masses[0],
            orbits: null,
            orbittedBy: []
        };
    }

    if (!allOrbits[masses[1]]) {
        allOrbits[masses[1]] = {
            name: masses[1],
            orbits: null,
            orbittedBy: []
        };
    }

    allOrbits[masses[0]].orbittedBy.push(masses[1]);
    allOrbits[masses[1]].orbits = masses[0];
}

let orbitCount = 0;

for (let mass in allOrbits) {
    let tempMass = allOrbits[mass];
    while (tempMass.orbits !== null) {
        orbitCount++;
        tempMass = allOrbits[tempMass.orbits];
    }
}

console.log(orbitCount);
// END OF PART 1
let santa = allOrbits['SAN'];
let santaLoc = allOrbits[santa.orbits];

let me = allOrbits['YOU'];
let myMap = new Map();
let myLoc = allOrbits[me.orbits];
while (myLoc.orbits != null) {
    myMap.set(myLoc.name, myMap.size);
    myLoc = allOrbits[myLoc.orbits];
}

let steps = 0;
while (santaLoc.orbits != null) {
    if (myMap.has(santaLoc.name)) {
        console.log('Part 2 steps: ', steps + myMap.get(santaLoc.name));
        return;
    }
    steps++;
    santaLoc = allOrbits[santaLoc.orbits];
}
