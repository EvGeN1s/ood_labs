import CommandInterface from "./command/CommandInterface";
import CommandHistory from "./CommandHistory";

class abstractCommand implements CommandInterface {
    count: number = 0

    execute() {
        this.count++
    }

    unexecute() {
        this.count--
    }
}

describe('command history tests', ()=> {
    it('should not allow to undo or redo after construction', ()=> {
        const commandHistory = new CommandHistory()

        expect(commandHistory.canRedo()).toBeFalsy()
        expect(commandHistory.canUndo()).toBeFalsy()
    })

    it('should add and execute abstract command', () => {
        const commandHistory = new CommandHistory()
        const command: abstractCommand = new abstractCommand()

        commandHistory.addAndExecute(command)

        expect(command.count).toBe(1)
        expect(commandHistory.canRedo()).toBeFalsy()
        expect(commandHistory.canUndo()).toBeTruthy()
    })

    it('should clear redo history after adding new command', () => {
        const commandHistory = new CommandHistory()
        const command1: abstractCommand = new abstractCommand()
        const command2: abstractCommand = new abstractCommand()
        const command3: abstractCommand = new abstractCommand()
        commandHistory.addAndExecute(command1)
        commandHistory.addAndExecute(command2)
        commandHistory.undo()

        commandHistory.addAndExecute(command3)

        expect(commandHistory.canRedo()).toBeFalsy()
        expect(commandHistory.canUndo()).toBeTruthy()
    })

    it('should undo executed command', () => {
        const commandHistory = new CommandHistory()
        const command: abstractCommand = new abstractCommand()
        commandHistory.addAndExecute(command)

        commandHistory.undo()

        expect(command.count).toBe(0)
        expect(commandHistory.canUndo()).toBeFalsy()
    })

    it('should redo command', () => {
        const commandHistory = new CommandHistory()
        const command: abstractCommand = new abstractCommand()
        commandHistory.addAndExecute(command)
        commandHistory.undo()

        commandHistory.redo()

        expect(command.count).toBe(1)
        expect(commandHistory.canRedo()).toBeFalsy()
        expect(commandHistory.canUndo()).toBeTruthy()
    })
})