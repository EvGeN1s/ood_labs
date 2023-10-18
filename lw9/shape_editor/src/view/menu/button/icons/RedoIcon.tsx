type RedoIconProps = {
    canRedo: boolean
}

function RedoIcon(props: RedoIconProps):JSX.Element {
    const fillColor: string = props.canRedo ? "blue" : "white"
    return (
        <svg viewBox="0 0 100 100">
        <polygon points={`95, 50
                    60, 25
                    60,75
                    `} fill={fillColor}></polygon>
        <rect x={10} y={37.5} width={50} height={25} fill={fillColor}></rect>
    </svg>
    )
}

export default RedoIcon