import SlideView from "./slide/SlideView";
import SlideController from "../controller/SlideController";
import Slide from "../model/Slide";
import {useEffect, useState} from "react";
import ShapeType from "../model/ShapeType";
import Menu from "./menu/Menu";

type ViewProps = {
    controller: SlideController
    slide: Slide
}

function View(props: ViewProps): JSX.Element {
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
    const [canUndo, setCanUndo] = useState<boolean>(props.controller.canUndo())
    const [canRedo, setCanRedo] = useState<boolean>(props.controller.canRedo())

    useEffect(() => {
        updateUndoAndRedo()
    })

    const changeShapeSize = (id: string, width: number, height: number) => {
        props.controller.resizeShape(id, width, height)
    }

    const changeShapePosition = (id: string, x: number, y: number) => {
        props.controller.moveShape(id, x, y)
    }

    const getShapeById = (id: string) => {
        return props.slide.getShape(id)
    }

    const addShape = (shapeType: ShapeType) => {
        props.controller.addShape(shapeType)
    }

    const removeShape = (shapeId: string) => {
        props.controller.removeShape(shapeId)
        setSelectedItemId(null)
    }

    const updateUndoAndRedo = () => {
        setCanUndo(props.controller.canUndo())
        setCanRedo(props.controller.canRedo())
    }

    const undo = () => {
        props.controller.undo()
        updateUndoAndRedo()
    }

    const redo = () => {
        props.controller.redo()
        updateUndoAndRedo()
    }

    return (
        <div className="view">
            <Menu removeShape={removeShape}
                  selectedShapeId={selectedItemId}
                  addShape={addShape}
                  undo={undo}
                  redo={redo}
                  canUndo={canUndo}
                  canRedo={canRedo}
            />
            <SlideView
                slide={props.slide}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                getShapeById={getShapeById}
                changeShapePosition={changeShapePosition}
                changeShapeSize={changeShapeSize}
            />
        </div>
    )
}

export default View