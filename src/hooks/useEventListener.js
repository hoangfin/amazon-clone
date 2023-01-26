import { useEffect, useRef } from "react";

export const useEventListener = (type, element = window, listener, options) => {
    const listenerRef = useRef(listener);

    // swap different listener on same event type and element
    // without removing, adding listener again in second useEffect
    useEffect(() => {
        listenerRef.current = listener;
    }, [listener]);

    useEffect(
        () => {
            // early exit if element is undefined or element
            // does not have addEventListener function
            if (!element?.addEventListener) return;

            element.addEventListener(type, listenerRef.current, options);
            return () => {
                element.removeEventListener(type, listenerRef.current, options);
            };
        },
        [type, element, options]
    );

};
