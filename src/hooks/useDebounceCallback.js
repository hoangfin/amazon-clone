import { useCallback, useEffect, useRef } from "react";

export const useDebounceCallback = (callback, delay) => {
    const scheduledTask = useRef();

    useEffect(() => {
        return () => { window.clearTimeout(scheduledTask.current); }
    }, []);

    return useCallback(
        (...args) => {
            if (scheduledTask.current) {
                window.clearTimeout(scheduledTask.current);
            }
            scheduledTask.current = window.setTimeout(() => callback(...args), delay);
        },
        [callback, delay]
    );
};
