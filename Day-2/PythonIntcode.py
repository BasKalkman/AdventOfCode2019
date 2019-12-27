class IntcodeComputer:
    def __init__(self, data):
        self.data = data
        self.opcode = -1
        self.i = 0
        self.reset_data = data[:]

    def run(self):
        while self.opcode != 99:
            self.opcode = self.data[self.i] % 100
            self.run_opcode(self.opcode)

    def run_opcode(self, opcode):
        num1, num2, num3 = self.data[self.i + 1 : self.i + 4]
        # ADD
        if opcode == 1:
            self.data[num3] = self.data[num1] + self.data[num2]
            self.i += 4
        # MULTIPLY
        if opcode == 2:
            self.data[num3] = self.data[num1] * self.data[num2]
            self.i += 4
        # HALT
        if opcode == 99:
            pass

    def reset(self):
        self.data = self.reset_data[:]
        self.opcode = -1
        self.i = 0

