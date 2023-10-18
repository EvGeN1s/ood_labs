import ShapeFactory from "../model/ShapeFactory";
import CommandHistory from "../common/CommandHistory";
import ShapeType from "../model/ShapeType";
import {AddShapeCommand, RemoveShapeCommand, SetFrameCommand} from "../common/command/Commands";
import Slide from "../model/Slide";
import Frame from "../model/Frame";
import ShapeInterface from "../model/ShapeInterface";
import Point from "../model/Point";

class SlideController {
    private readonly _commandHistory: CommandHistory
    private readonly _shapeFactory: ShapeFactory
    private readonly _slide: Slide

    constructor(commandHistory: CommandHistory, shapeFactory: ShapeFactory, slide: Slide) {
        this._commandHistory = commandHistory
        this._shapeFactory = shapeFactory
        this._slide = slide
    }

    addShape(shapeType: ShapeType): void {
        let command: AddShapeCommand = new AddShapeCommand(this._slide, this._shapeFactory, shapeType)

        return this._commandHistory.addAndExecute(command)
    }

    removeShape(shapeId: string): void {
        let command: RemoveShapeCommand = new RemoveShapeCommand(this._slide, shapeId)

        return this._commandHistory.addAndExecute(command)
    }

    moveShape(shapeId: string, x: number, y: number) {
        let shape: ShapeInterface = this._slide.getShape(shapeId)
        let frame: Frame = new Frame(new Point(x, y), shape.frame.width, shape.frame.height)

        let command: SetFrameCommand = new SetFrameCommand(this._slide, shapeId, frame)

        return this._commandHistory.addAndExecute(command)
    }

    resizeShape(shapeId: string, width: number, height: number) {
        let shape: ShapeInterface = this._slide.getShape(shapeId)
        let frame: Frame = new Frame(shape.frame.leftTop, width, height)

        let command: SetFrameCommand = new SetFrameCommand(this._slide, shapeId, frame)

        return this._commandHistory.addAndExecute(command)
    }

    canUndo(): boolean {
        return this._commandHistory.canUndo()
    }

    undo(): void {
        if (this.canUndo()) {
            return this._commandHistory.undo()
        }
    }

    canRedo(): boolean {
        return this._commandHistory.canRedo()
    }

    redo(): void {
        if (this.canRedo()) {
            return this._commandHistory.redo()
        }
    }
}

export default SlideController