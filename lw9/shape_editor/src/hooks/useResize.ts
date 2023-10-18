import React, {useEffect} from "react";

type MousePositionType = {
    x: number;
    y: number;
};

export const useResize = (
    resizerRef: React.RefObject<any>,
    setBoxSizeDiff: Function,
    selectedItemId: string|null,
    getContentById: Function,
    changeShapeSize: Function
) => {
    let startPos: MousePositionType = {
        x: 0,
        y: 0,
    };

    let diff = {
        x: 0,
        y: 0,
    }

    useEffect(() => {
        if (resizerRef && resizerRef.current) {
            resizerRef.current.addEventListener("mousedown", onMouseDown);
        }
    }, []);

    const onMouseDown = (e: MouseEvent) => {
        startPos = {
            x: e.pageX,
            y: e.pageY,
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseUp = (e: MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);


        const item = getContentById(selectedItemId)
        if (item) {
            changeShapeSize(item.getUuid(), item.frame.width + diff.x, item.frame.height + diff.y)
        }

        setBoxSizeDiff({x: 0, y: 0});
    };

    const onMouseMove = (e: MouseEvent) => {
        let scale = 1.9;

        diff = {
            x: (e.pageX - startPos.x) / scale,
            y: (e.pageY - startPos.y) / scale,
        };

        setBoxSizeDiff(diff);
    };
};
