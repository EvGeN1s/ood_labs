import ShapeType from "../../../model/ShapeType";
import Frame from "../../../model/Frame";
import {MouseEvent, useEffect, useRef, useState} from "react";
import {BoxSizeDiffType} from "../SlideView";
import {useDragAndDrop} from "../../../hooks/useDragAndDrop";
import {useResize} from "../../../hooks/useResize";
import ShapeInterface from "../../../model/ShapeInterface";

type ShapeViewProps = {
    shapeType: ShapeType
    frame: Frame
    isSelected: boolean
    id: string
    onClick: Function
    selectedItemId: string | null
    getContentById: (shapeId: string) => ShapeInterface
    changeShapePosition: (shapeId: string, x: number, y: number) => void
    changeShapeSize: (shapeId: string, width: number, height: number) => void
}

type DeltaType = {
    x: number;
    y: number;
};

function ShapeView(props: ShapeViewProps): JSX.Element {
    const minSize = 5;
    const frame = props.frame
    const [delta, setDelta] = useState<DeltaType>({x: 0, y: 0})
    const [resizerPosition, setResizerPosition] = useState<PositionType>({
        x: 0,
        y: 0,
    })
    let shapeView: JSX.Element = <></>

    const ref = useRef<any>(null);
    const boxResizerRef = useRef<any>(null);
    type PositionType = {
        x: number;
        y: number;
    };
    const [boxSizeDiff, setBoxSizeDiff] = useState<BoxSizeDiffType>({
        x: 0,
        y: 0,
    });

    const getDelta = () => {
        return delta
    }

    const resizerSize = 5;

    useEffect(() => {
        const selectedElementsGroupRect = ref.current?.getBBox();

        if (!selectedElementsGroupRect) {
            return
        }

        let newResizerPosition: PositionType = {
            x:
                selectedElementsGroupRect?.x +
                selectedElementsGroupRect?.width -
                resizerSize / 2,
            y:
                selectedElementsGroupRect?.y +
                selectedElementsGroupRect?.height -
                resizerSize / 2,
        };

        setResizerPosition(newResizerPosition);

    }, [
        props.isSelected,
        delta,
        boxSizeDiff,
        ref.current?.getBBox().width,
    ]);

    useDragAndDrop(ref, props.id, setDelta, getDelta, props.getContentById, props.changeShapePosition)
    useResize(
        boxResizerRef,
        setBoxSizeDiff,
        props.id,
        props.getContentById,
        props.changeShapeSize,
    );

    switch (props.shapeType) {
        case ShapeType.ELLIPSE:
            const xRadius: number = Math.abs(Math.round((frame.width + boxSizeDiff.x) / 2))
            const yRadius: number = Math.abs(Math.round((frame.height + boxSizeDiff.y) / 2))

            shapeView = <ellipse
                key={props.id}
                cx={frame.leftTop.x + Math.round((frame.width + boxSizeDiff.x) / 2) + delta.x}
                cy={frame.leftTop.y + Math.round(frame.height + boxSizeDiff.y) / 2 + delta.y}
                rx={xRadius}
                ry={yRadius}
                fill="red"
                onMouseDown={(e: MouseEvent) => props.onClick(e, props.id)}
            ></ellipse>
            break
        case ShapeType.RECTANGLE:
            shapeView = <rect
                key={props.id}
                x={frame.leftTop.x + delta.x > 0 ? frame.leftTop.x + delta.x : 0}
                y={frame.leftTop.y + delta.y > 0 ? frame.leftTop.y + delta.y : 0}
                width={frame.width + boxSizeDiff.x > minSize
                    ? frame.width + boxSizeDiff.x
                    : minSize}
                height={frame.height + boxSizeDiff.y > minSize
                    ? frame.height + boxSizeDiff.y
                    : minSize}
                fill="green"
                onMouseDown={(e: MouseEvent) => props.onClick(e, props.id)}
            ></rect>
            break
        case ShapeType.TRIANGLE:
            shapeView = <polygon
                key={props.id}
                points={`${frame.leftTop.x + Math.round((frame.width + boxSizeDiff.x)) / 2 + delta.x},${frame.leftTop.y + delta.y}
          ${frame.leftTop.x + delta.x},${frame.leftTop.y + Math.round((frame.height + boxSizeDiff.y)) + delta.y}
          ${frame.leftTop.x + Math.round((frame.width + boxSizeDiff.x)) + delta.x},${frame.leftTop.y + Math.round((frame.height + boxSizeDiff.y)) + delta.y}
          `}
                fill="blue"
                onMouseDown={(e: MouseEvent) => props.onClick(e, props.id)}
            ></polygon>
    }


    return (
        <>
            <g
                ref={ref}
                style={props.isSelected ? {outline: "2px solid #93ca79", cursor: "move"} : {}}
            >
                {shapeView}
            </g>
            <rect
                ref={boxResizerRef}
                style={{display: props.isSelected ? "block" : "none",}}
                x={resizerPosition.x}
                y={resizerPosition.y}
                width={resizerSize}
                height={resizerSize}
                fill="black"
            ></rect>
        </>
    )

}

export default ShapeView