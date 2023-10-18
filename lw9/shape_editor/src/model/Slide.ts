import NotifierInterface from "./observer/NotifierInterface";
import ShapeInterface from "./ShapeInterface";
import ObserverInterface from "./observer/0bserverInterface";
import Frame from "./Frame";

class Slide implements NotifierInterface {
    private readonly _shapes: Array<ShapeInterface> = []
    private readonly _observers: Array<ObserverInterface> = []

    addShape(shape: ShapeInterface): void {
        this._shapes.push(shape)
        this.notify()
    }

    removeShape(id: string): void {
        let index: number = this._shapes.findIndex(value => value.getUuid() === id)
        if (index === -1) {
            throw new Error("Shape not found")
        }
        this._shapes.splice(index, 1)
        this.notify()
    }

    setShapeFrame(id: string, frame: Frame): void {
        let index: number = this._shapes.findIndex(value => value.getUuid() === id)
        if (index === -1) {
            throw new Error("Shape not found")
        }

        this._shapes[index].frame = frame
        this.notify()
    }

    getShape(id: string): ShapeInterface {
        let value: ShapeInterface | undefined = this._shapes.find(value => value.getUuid() === id)
        if (value === undefined) {
            throw new Error("Shape not found")
        }
        return value
    }

    getShapes(): Array<ShapeInterface> {
        return this._shapes.map((shape) => {
            return shape
        })
    }

    addEventListener(observer: ObserverInterface): void {
        this._observers.push(observer)
    }

    notify(): void {
        this._observers.forEach((listener) => {
            listener.update()
        })
    }

    removeObserver(observerId: string): void {
        let index: number = this._observers.findIndex(value => value.getId() === observerId)
        if (index === -1) {
            throw new Error("Observer not found")
        }
        this._observers.splice(index, 1)
    }
}

export default Slide