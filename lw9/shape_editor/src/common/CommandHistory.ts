import CommandInterface from "./command/CommandInterface";

class CommandHistory {
    private readonly _commands: Array<CommandInterface> = []
    private _currIndex = -1

    addAndExecute(command: CommandInterface): void {
        command.execute()

        this._clearRedo()

        this._commands.push(command)
        this._currIndex++
    }

    canUndo() {
        return this._currIndex > -1
    }

    undo(): void {
        if (!this.canUndo()) {
            return
        }

        this._commands[this._currIndex].unexecute()
        this._currIndex--
    }

    canRedo() {
        return this._currIndex < (this._commands.length - 1)
    }

    redo(): void {
        if (!this.canRedo()) {
            return
        }

        this._currIndex++
        this._commands[this._currIndex].execute()
    }

    private _clearRedo(): void {
        this._commands.splice(this._currIndex, this._commands.length - 1 - this._currIndex)
    }
}

export default CommandHistory