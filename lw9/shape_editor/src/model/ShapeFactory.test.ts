import ShapeFactory from "./ShapeFactory";
import ShapeInterface from "./ShapeInterface";
import ShapeType from "./ShapeType";

describe('shape factory test', () => {
    it('test create ellipse', () => {
        const shapeFactory: ShapeFactory = new ShapeFactory()

        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.ELLIPSE)

        expect(shape.getType()).toBe(ShapeType.ELLIPSE)
    })

    it('test create triangle', () => {
        const shapeFactory: ShapeFactory = new ShapeFactory()

        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.TRIANGLE)

        expect(shape.getType()).toBe(ShapeType.TRIANGLE)
    })

    it('test create rectangle', () => {
        const shapeFactory: ShapeFactory = new ShapeFactory()

        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.RECTANGLE)

        expect(shape.getType()).toBe(ShapeType.RECTANGLE)
    })

    it('should throw error on create shape with not existing type', () => {
        const shapeFactory: ShapeFactory = new ShapeFactory()

        const fn = () => {
            shapeFactory.createShape(3)
        }

        expect(fn).toThrowError()
    })
})