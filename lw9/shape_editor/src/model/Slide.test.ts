import Slide from "./Slide";
import ShapeInterface from "./ShapeInterface";
import Shape from "./Shape";
import ShapeType from "./ShapeType";
import Frame from "./Frame";
import ObserverInterface from "./observer/0bserverInterface";

const testId: string = 'test'

describe('slide', () => {
    it('should add shape', () => {
        const slide: Slide = new Slide()
        const shape: ShapeInterface = new Shape(testId, new Frame({x: 10, y: 20}, 100, 100), ShapeType.TRIANGLE)

        slide.addShape(shape)

        const resultShape = slide.getShape(testId)
        expect(slide.getShapes().length).toBe(1)
        expect(resultShape).toEqual(shape)
    })

    it('should remove shape', () => {
        const slide: Slide = new Slide()
        const shape: ShapeInterface = new Shape(testId, new Frame({x: 10, y: 20}, 100, 100), ShapeType.TRIANGLE)
        slide.addShape(shape)

        slide.removeShape(shape.getUuid())

        expect(slide.getShapes().length).toBe(0)
    })

    it('should throw error on delete not existing shape', () => {
        const slide: Slide = new Slide()

        const fn = () => {
            slide.removeShape(testId)
        }

        expect(fn).toThrowError()
    })

    it('should change shape\'s frame', () => {
        const slide: Slide = new Slide()
        const shape: ShapeInterface = new Shape(testId, new Frame({x: 10, y: 20}, 100, 100), ShapeType.TRIANGLE)
        slide.addShape(shape)
        const newFrame: Frame = new Frame({x: 100, y: 200}, 300, 400)

        slide.setShapeFrame(shape.getUuid(), newFrame)

        expect(slide.getShape(testId).frame).toEqual(newFrame)
    })

    it('should not get not existing shape', () => {
        const slide: Slide = new Slide()

        const fn = () => {
            slide.getShape(testId)
        }

        expect(fn).toThrowError()
    })
})

class abstractObserver implements ObserverInterface {
    count: number = 0

    update(): void {
        this.count++
    }

    getId(): string {
        return testId
    }
}

describe('slide\'s notifier functional tests', () => {
    it('should notify observers', ()=> {
        const slide: Slide = new Slide()
        const observer1 = new abstractObserver()
        const observer2 = new abstractObserver()
        slide.addEventListener(observer1)
        slide.addEventListener(observer2)

        slide.notify()

        expect(observer1.count).toBe(1)
        expect(observer2.count).toBe(1)
    })

    it('should remove event listener', () => {
        const slide: Slide = new Slide()
        const observer = new abstractObserver()
        slide.addEventListener(observer)

        slide.removeObserver(observer.getId())

        slide.notify()
        expect(observer.count).toBe(0)
    })

    it('should throw error on delete not existing observer', () => {
        const slide: Slide = new Slide()
        const observer = new abstractObserver()

        const fn = () => {
            slide.removeShape(observer.getId())
        }

        expect(fn).toThrowError()
    })
})