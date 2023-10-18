type UndoIconProps = {
    canUndo: boolean
}

function UndoIcon(props: UndoIconProps) {
    const fillColor: string = props.canUndo ? "blue" : "white"

    return (
        <svg viewBox="0 0 100 100">
            <rect x={40} y={37.5} width={50} height={25} fill={fillColor}></rect>
            <polygon points={`5, 50
                    40, 25
                    40,75
                    `} fill={fillColor}></polygon>

        </svg>
    )
}

export default UndoIcon