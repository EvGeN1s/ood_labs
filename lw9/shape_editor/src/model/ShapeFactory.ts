import ShapeType from "./ShapeType";
import Shape from "./Shape";
import Frame from "./Frame";
import {v4 as generateUuid} from "uuid";
import Point from "./Point";
import ShapeInterface from "./ShapeInterface";

class ShapeFactory {
    private readonly _defaultX:number = 100
    private readonly _defaultY:number = 100
    private readonly _defaultWidth:number = 100
    private readonly _defaultHeight:number = 100

    createShape(shapeType: ShapeType): ShapeInterface {
        switch (shapeType) {
            case ShapeType.ELLIPSE:
                return new Shape(generateUuid(), this._createDefaultFrame(), shapeType)
            case ShapeType.RECTANGLE:
                return new Shape(generateUuid(), this._createDefaultFrame(), shapeType)
            case ShapeType.TRIANGLE:
                return new Shape(generateUuid(),this._createDefaultFrame(), shapeType)
            default:
                throw Error('undefined shape type')
        }
    }

    private _createDefaultFrame(): Frame {
        return new Frame(new Point(this._defaultX, this._defaultY),this._defaultWidth, this._defaultHeight)
    }
}

export default ShapeFactory