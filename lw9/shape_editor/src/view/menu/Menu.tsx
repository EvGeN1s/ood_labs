import Button from "./button/Button";
import ShapeType from "../../model/ShapeType";
import "./Menu.css"
import AddRectangleIcon from "./button/icons/AddRectangleIcon";
import AddTriangleIcon from "./button/icons/AddTriangleIcon";
import AddEllipseIcon from "./button/icons/AddEllipseIcon";
import RemoveShapeIcon from "./button/icons/RemoveShapeIcon";
import UndoIcon from "./button/icons/UndoIcon";
import RedoIcon from "./button/icons/RedoIcon";

type MenuProps = {
    addShape: (shapeType: ShapeType) => void
    selectedShapeId: string | null
    removeShape: (shapeId: string) => void
    canUndo: boolean
    canRedo: boolean
    undo: () => void
    redo: () => void
}

function Menu(props: MenuProps): JSX.Element {
    const buttons: Array<JSX.Element> = [
        <Button key="add_rectangle"
                icon={<AddRectangleIcon/>}
                onClick={() => {
                    props.addShape(ShapeType.RECTANGLE)
                }}
        />,
        <Button key="add_triangle"
                icon={<AddTriangleIcon/>}
                onClick={() => {
                    props.addShape(ShapeType.TRIANGLE)
                }}
        />,
        <Button key="add_ellipse"
                icon={<AddEllipseIcon/>}
                onClick={() => {
                    props.addShape(ShapeType.ELLIPSE)
                }}
        />,
        <Button key="undo"
                icon={<UndoIcon canUndo={props.canUndo}/>}
                onClick={() => {
                    if (props.canUndo) {
                        props.undo()
                    }
                }}
        />,

        <Button key="redo"
                icon={<RedoIcon canRedo={props.canRedo}/>}
                onClick={() => {
                    if (props.canRedo) {
                        props.redo()
                    }
                }}
        />,
    ]

    if (props.selectedShapeId) {
        buttons.push(<Button
            key='remove_shape'
            onClick={() => {
                if (props.selectedShapeId) props.removeShape(props.selectedShapeId)
            }} icon={<RemoveShapeIcon/>}/>)
    }

    return (
        <div className="Menu">
            {buttons}
        </div>
    )
}

export default Menu