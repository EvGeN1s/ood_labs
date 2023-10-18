import Point from "./Point";

class Frame {
    private _leftTop: Point
    private _width: number
    private _height: number

    constructor(leftTop: Point, width: number, height: number) {
        this._leftTop = leftTop
        this._width = width
        this._height = height
    }

    set width(width: number) {
        this._width = width;
    }

    get width(): number {
        return this._width
    }

    set height(height: number) {
        this._height = height
    }

    get height(): number {
        return this._height
    }

    set leftTop(leftTop: Point) {
        this._leftTop = leftTop
    }

    get leftTop(): Point {
        return this._leftTop
    }
}

export default Frame