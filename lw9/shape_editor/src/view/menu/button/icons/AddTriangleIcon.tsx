function AddTriangleIcon(): JSX.Element {
    return (<svg viewBox="0 0 100 100">
        <polygon points={`50, 0
                    0,100
                    100,100
                    `} fill="blue"></polygon>
    </svg>)
}

export default AddTriangleIcon