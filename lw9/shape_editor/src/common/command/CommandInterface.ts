interface CommandInterface {
    execute(): void
    unexecute(): void
}

export default CommandInterface