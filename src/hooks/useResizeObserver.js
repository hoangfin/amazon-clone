import { useState, useCallback, useLayoutEffect } from "react";

export const useResizeObserver = (entry) => {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    const handleResize = useCallback(entries => {
        setWidth(entries[0].contentRect.width);
        setHeight(entries[0].contentRect.height);
    }, []);

    useLayoutEffect(() => {
        if (entry) {
            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(entry);
            return () => resizeObserver.disconnect();
        }
    }, [entry]);

    return [width, height];
};
