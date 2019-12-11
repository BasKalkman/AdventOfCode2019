class IntCodeComputer {
    constructor(arr) {
        this.opcode = 0;
        this.input = 0;
        this.phase = null;
        this.output = 0;
        this.i = 0;
        this.data = arr.slice(0);
        this.resetData = arr.slice(0) || [];
    }

    setInput(input) {
        this.input = input;
    }

    setPhase(phase) {
        this.phase = phase;
    }

    setData(arr) {
        this.data = arr.slice(0);
    }

    reset() {
        this.phase = null;
        this.opcode = 0;
        this.input = 0;
        this.output = 0;
        this.i = 0;
        this.data = this.resetData.slice(0);
    }

    processCode() {
        while (this.data[this.i] != 99) {
            this.parseInstruction(this.data[this.i]);
        }

        return this.output;
    }

    parseInstruction(code) {
        this.opcode = code % 100;
        let codeStr = this.data[this.i].toString();
        while (codeStr.length < 5) {
            codeStr = '0' + codeStr;
        }
        let codeArr = codeStr.split('').map(Number);

        let num1 = codeArr[2] === 0 ? this.data[this.data[this.i + 1]] : this.data[this.i + 1];
        let num2 = codeArr[1] === 0 ? this.data[this.data[this.i + 2]] : this.data[this.i + 2];
        let num3 = codeArr[0] === 0 ? this.data[this.data[this.i + 3]] : this.data[this.i + 3];

        let position = this.data[this.i + 3];
        switch (this.opcode) {
            case 1:
                this.add(num1, num2, position);
                break;
            case 2:
                this.multiply(num1, num2, position);
                break;
            case 3:
                this.placeInput(this.data[this.i + 1]);
                break;
            case 4:
                this.placeOutput(num1);
                break;
            case 5:
                this.jumpIfTrue(num1, num2);
                break;
            case 6:
                this.jumpIfFalse(num1, num2);
                break;
            case 7:
                this.lessThan(num1, num2, position);
                break;
            case 8:
                this.itEquals(num1, num2, position);

            case 99:
                break;

            default:
                break;
        }
    }

    // --------------
    // OPCODES
    // --------------
    // Opcode 1
    add(num1, num2, position) {
        this.data[position] = num1 + num2;
        this.i += 4;
    }

    // Opcode 2
    multiply(num1, num2, position) {
        this.data[position] = num1 * num2;
        this.i += 4;
    }

    // Opcode 3
    placeInput(position) {
        if (this.phase) {
            this.data[position] = this.phase;
            this.phase = null;
        } else {
            this.data[position] = this.input;
        }

        this.i += 2;
    }

    // Opcode 4
    placeOutput(value) {
        this.output = value;
        this.i += 2;
    }

    // Opcode 5 - Jump if true
    jumpIfTrue(num1, num2) {
        if (num1 != 0) {
            this.i = num2;
        } else {
            this.i += 3;
        }
    }

    // Opcode 6 - Jump if false
    jumpIfFalse(num1, num2) {
        if (num1 === 0) {
            this.i = num2;
        } else {
            this.i += 3;
        }
    }

    // Opcode 7 - less than
    lessThan(num1, num2, position) {
        if (num1 < num2) {
            this.data[position] = 1;
        } else {
            this.data[position] = 0;
        }
        this.i += 4;
    }

    // Opcode 8 - equals
    itEquals(num1, num2, position) {
        if (num1 === num2) {
            this.data[position] = 1;
        } else {
            this.data[position] = 0;
        }
        this.i += 4;
    }
}

module.exports.IntCodeComputer = IntCodeComputer;
