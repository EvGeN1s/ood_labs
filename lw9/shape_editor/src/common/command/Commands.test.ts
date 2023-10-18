import {AddShapeCommand, RemoveShapeCommand, SetFrameCommand} from "./Commands";
import Slide from "../../model/Slide";
import ShapeFactory from "../../model/ShapeFactory";
import ShapeType from "../../model/ShapeType";
import ShapeInterface from "../../model/ShapeInterface";
import Frame from "../../model/Frame";

describe('test add shape command', () => {
    it('should create new shape', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const command: AddShapeCommand = new AddShapeCommand(slide, shapeFactory, ShapeType.ELLIPSE)

        command.execute()

        const shapes: Array<ShapeInterface> = slide.getShapes()
        expect(shapes.length).toBe(1)
        expect(shapes[0].getType()).toBe(ShapeType.ELLIPSE)
    })

    it('should unexcute command', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const command: AddShapeCommand = new AddShapeCommand(slide, shapeFactory, ShapeType.TRIANGLE)
        command.execute()

        command.unexecute()

        const shapes: Array<ShapeInterface> = slide.getShapes()
        expect(shapes.length).toBe(0)
    })

    it('should unexcute command after 2 command execution', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const command1: AddShapeCommand = new AddShapeCommand(slide, shapeFactory, ShapeType.TRIANGLE)
        const command2: AddShapeCommand = new AddShapeCommand(slide, shapeFactory, ShapeType.ELLIPSE)
        command1.execute()
        command2.execute()

        command2.unexecute()

        const shapes: Array<ShapeInterface> = slide.getShapes()
        expect(shapes.length).toBe(1)
        expect(shapes[0].getType()).toBe(ShapeType.TRIANGLE)
    })

    it('should throw error on unexecute call before execution', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const command: AddShapeCommand = new AddShapeCommand(slide, shapeFactory, ShapeType.ELLIPSE)

        const fn = () => {
            command.unexecute()
        }

        expect(fn).toThrowError()
    })
})

describe('test remove shape command', () => {
    it('should execute command', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.TRIANGLE)
        const command: RemoveShapeCommand = new RemoveShapeCommand(slide, shape.getUuid())
        slide.addShape(shape)

        command.execute()

        expect(slide.getShapes().length).toBe(0)
    })

    it('should unexecute command', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.TRIANGLE)
        const command: RemoveShapeCommand = new RemoveShapeCommand(slide, shape.getUuid())
        slide.addShape(shape)
        command.execute()

        command.unexecute()

        expect(slide.getShape(shape.getUuid())).toEqual(shape)
    })

    it('should throw error on unexecute call before execution', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.TRIANGLE)
        const command: RemoveShapeCommand = new RemoveShapeCommand(slide, shape.getUuid())

        const fn = () => {
            command.unexecute()
        }

        expect(fn).toThrowError()
    })
})

describe('test set frame command', () => {
    it('should execute command', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.TRIANGLE)
        slide.addShape(shape)
        const newFrame: Frame = new Frame({x: 100, y: 200}, 300, 400)
        const command: SetFrameCommand = new SetFrameCommand(slide, shape.getUuid(), newFrame)

        command.execute()

        expect(slide.getShape(shape.getUuid()).frame).toEqual(newFrame)
    })

    it('should unexecute command', ()=> {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.TRIANGLE)
        slide.addShape(shape)
        const currFrame: Frame = shape.frame
        const newFrame: Frame = new Frame({x: 100, y: 200}, 300, 400)
        const command: SetFrameCommand = new SetFrameCommand(slide, shape.getUuid(), newFrame)
        command.execute()

        command.unexecute()

        expect(slide.getShape(shape.getUuid()).frame).toEqual(currFrame)
    })

    it('should throw error on unexecute call before execution', () => {
        const slide: Slide = new Slide()
        const shapeFactory: ShapeFactory = new ShapeFactory()
        const shape: ShapeInterface = shapeFactory.createShape(ShapeType.TRIANGLE)
        slide.addShape(shape)
        const newFrame: Frame = new Frame({x: 100, y: 200}, 300, 400)
        const command: SetFrameCommand = new SetFrameCommand(slide, shape.getUuid(), newFrame)


        const fn = () => {
            command.unexecute()
        }

        expect(fn).toThrowError()
    })
})