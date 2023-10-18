import React, {useEffect} from "react";

type ElementPositionType = {
    x: number;
    y: number;
};

type MousePositionType = {
    x: number;
    y: number;
};

type DeltaType = {
    x: number;
    y: number;
}

export const useDragAndDrop = (
    ref: React.RefObject<any>,
    selectedItemId: string | null,
    setDelta: Function,
    getDelta: Function,
    getContentById: Function,
    changePosition: Function
) => {
    let scale: number = 1;

    let scaledDelta: DeltaType = {
        x: 0,
        y: 0,
    };

    let startPos: MousePositionType = {
        x: 0,
        y: 0,
    };

    let modelPos: ElementPositionType = {
        x: 0,
        y: 0,
    };

    let newPos: ElementPositionType = {
        x: 0,
        y: 0,
    };

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.addEventListener("mousedown", onMouseDown);
        }
    }, []);

    const onMouseDown = (e: MouseEvent) => {
        setDelta({x: 0, y: 0});

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

        modelPos = newPos;

        const content = getContentById(selectedItemId);

        changePosition(
            content.getUuid(),
            content.frame.leftTop.x + scaledDelta.x,
            content.frame.leftTop.y + scaledDelta.y
        )

        scaledDelta = {x: 0, y: 0};
        setDelta(scaledDelta);
    }

    const onMouseMove = (e: MouseEvent) => {
        const delta: DeltaType = {x: e.pageX - startPos.x, y: e.pageY - startPos.y};

        if (document.documentElement.clientWidth > 1366) {
            scale = 1.9;
        } else if (document.documentElement.clientWidth > 1024) {
            scale = 0.8;
        } else if (document.documentElement.clientWidth > 768) {
            scale = 0.66;
        } else if (document.documentElement.clientWidth > 480) {
            scale = 0.5;
        } else {
            scale = 0.33;
        }

        scaledDelta = {x: (delta.x) / scale, y: (delta.y) / scale};

        newPos = {
            x: modelPos.x + scaledDelta.x > 0 ? modelPos.x + scaledDelta.x : 0,
            y: modelPos.y + scaledDelta.y > 0 ? modelPos.y + scaledDelta.y : 0
        };

        setDelta(scaledDelta)
    }
}