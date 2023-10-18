import Slide from "../../model/Slide";
import ShapeView from "./shape/ShapeView";
import {MouseEvent, useState} from "react";
import ShapeInterface from "../../model/ShapeInterface";
import SlideObserver from "./observer/SlideObserver";

type SlideViewProps = {
    slide: Slide
    selectedItemId: string | null
    setSelectedItemId: (selectedItemId: string | null) => void
    getShapeById: (shapeId: string) => ShapeInterface
    changeShapePosition: (shapeId: string, x: number, y: number) => void
    changeShapeSize: (shapeId: string, width: number, height: number) => void
}

export type BoxSizeDiffType = {
    x: number;
    y: number;
};

function SlideView(props: SlideViewProps): JSX.Element {
    const [shapes, setShapes] = useState<Array<ShapeInterface>>([])
    const slideObserver = new SlideObserver(setShapes, props.slide)
    props.slide.addEventListener(slideObserver)

    const onSlideElementClick = (e: MouseEvent, contentId: string) => {
        e.stopPropagation();

        props.setSelectedItemId(contentId)
    }

    const onSvgBackgroundClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target.tagName.toLowerCase() === "svg") {
            if (props.selectedItemId) {
                props.setSelectedItemId(null)
            }
        }
    };

    const shapesView: Array<JSX.Element> = shapes.map((shape) => {
        const isSelected: boolean = shape.getUuid() === props.selectedItemId

        return <ShapeView
            key={shape.getUuid()}
            shapeType={shape.getType()}
            frame={shape.frame}
            isSelected={isSelected}
            id={shape.getUuid()}
            onClick={onSlideElementClick}
            getContentById={props.getShapeById}
            selectedItemId={props.selectedItemId}
            changeShapePosition={props.changeShapePosition}
            changeShapeSize={props.changeShapeSize}
        />
    })

    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 450"
        preserveAspectRatio="none"

        onMouseDown={onSvgBackgroundClick}
    >
        {shapesView}
    </svg>)
}

export default SlideView