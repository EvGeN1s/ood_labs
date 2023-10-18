import Frame from "./Frame";
import ShapeInterface from "./ShapeInterface";
import ShapeType from "./ShapeType";

class Shape implements ShapeInterface {
    private readonly _uuid: string
    private readonly _type: ShapeType
    private _frame: Frame

    constructor(uuid: string, frame: Frame, type: ShapeType) {
        this._uuid = uuid
        this._frame = frame
        this._type = type
    }

    get frame(): Frame {
        return this._frame
    }

    set frame(frame: Frame) {
        this._frame = frame
    }

    getType(): ShapeType {
        return this._type
    }

    getUuid(): string {
        return this._uuid
    }
}

export default Shape