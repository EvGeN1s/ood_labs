import ObserverInterface from "../../../model/observer/0bserverInterface";
import Slide from "../../../model/Slide";
import {v4 as generateUuid} from "uuid";

class SlideObserver implements ObserverInterface {
    private _setShapes: Function
    private _slide: Slide
    private _uuid: string

    constructor(setShapes: Function, slide: Slide) {
        this._setShapes = setShapes
        this._slide = slide
        this._uuid = generateUuid()
    }

    update(): void {
        this._setShapes(this._slide.getShapes())
    }

    getId(): string {
        return this._uuid
    }
}

export default SlideObserver