import Frame from "./Frame";
import ShapeType from "./ShapeType";

interface ShapeInterface {
    getUuid(): string

    set frame(frame: Frame)
    get frame(): Frame

    getType(): ShapeType
}

export default ShapeInterface