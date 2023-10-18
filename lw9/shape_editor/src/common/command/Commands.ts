import ShapeType from "../../model/ShapeType";
import CommandInterface from "./CommandInterface";
import Slide from "../../model/Slide";
import ShapeFactory from "../../model/ShapeFactory";
import ShapeInterface from "../../model/ShapeInterface";
import Frame from "../../model/Frame";

class AddShapeCommand implements CommandInterface {
    private readonly _slide: Slide
    private readonly _shapeFactory: ShapeFactory
    private readonly _shapeType: ShapeType
    private _shape: ShapeInterface | null = null

    constructor(slide: Slide, shapeFactory: ShapeFactory, shapeType: ShapeType) {
        this._slide = slide
        this._shapeFactory = shapeFactory
        this._shapeType = shapeType
    }

    execute(): void {
        if (this._shape === null) {
            this._shape = this._shapeFactory.createShape(this._shapeType)
        }

        return this._slide.addShape(this._shape)
    }

    unexecute() {
        if (this._shape === null) {
            throw new Error('Can not unexecute command before execution')
        }

        return this._slide.removeShape(this._shape.getUuid())
    }
}


class SetFrameCommand implements CommandInterface {
    private readonly _slide: Slide

    private readonly _shapeId: string
    private readonly _frame: Frame
    private _oldFrame: Frame | null = null

    constructor(slide: Slide, shapeId: string, frame: Frame) {
        this._slide = slide

        this._shapeId = shapeId
        this._frame = frame
    }

    execute(): void {
        let shape: ShapeInterface = this._slide.getShape(this._shapeId)
        this._oldFrame = shape.frame

        this._slide.setShapeFrame(this._shapeId, this._frame)
    }

    unexecute(): void {
        if (this._oldFrame === null) {
            throw new Error('Can not unexecute command before execution')
        }

        this._slide.setShapeFrame(this._shapeId, this._oldFrame)
    }
}

class RemoveShapeCommand implements CommandInterface {
    private readonly _slide: Slide
    private readonly _shapeId: string
    private _shape: ShapeInterface | null = null

    constructor(slide: Slide, shapeId: string) {
        this._slide = slide
        this._shapeId = shapeId
    }

    execute(): void {
        this._shape = this._slide.getShape(this._shapeId)

        return this._slide.removeShape(this._shapeId)
    }

    unexecute(): void {
        if (this._shape === null) {
            throw new Error('Can not unexecute command before execution')
        }

        return this._slide.addShape(this._shape)
    }
}

export {
    AddShapeCommand,
    RemoveShapeCommand,
    SetFrameCommand
}