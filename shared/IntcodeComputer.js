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
        while (this.opcode != 99) {
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
            // ADD
            case 1:
                this.data[position] = num1 + num2;
                this.i += 4;
                break;
            // MULTIPLY
            case 2:
                this.data[position] = num1 * num2;
                this.i += 4;
                break;
            // INPUT
            case 3:
                if (this.phase !== null) {
                    this.data[this.data[this.i + 1]] = this.phase;
                    this.phase = null;
                } else {
                    this.data[this.data[this.i + 1]] = this.input;
                }

                this.i += 2;
                break;
            // OUTPUT
            case 4:
                this.output = num1;
                this.i += 2;
                break;
            // JUMP IF TRUE
            case 5:
                if (num1 != 0) {
                    this.i = num2;
                } else {
                    this.i += 3;
                }
                break;
            // JUMP IF FALSE
            case 6:
                if (num1 === 0) {
                    this.i = num2;
                } else {
                    this.i += 3;
                }
                break;
            // LESS THAN
            case 7:
                if (num1 < num2) {
                    this.data[position] = 1;
                } else {
                    this.data[position] = 0;
                }
                this.i += 4;
                break;
            // EQUAL
            case 8:
                if (num1 === num2) {
                    this.data[position] = 1;
                } else {
                    this.data[position] = 0;
                }
                this.i += 4;
                break;
            // STOP
            case 99:
                break;

            default:
                break;
        }
    }
}

module.exports.IntCodeComputer = IntCodeComputer;
