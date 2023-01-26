import { useCallback, useEffect, useRef, useState } from "react";

export const useService = (service) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const isRequestCancelled = useRef(false);
    const currentRequest = useRef(null);

    const serviceAPI = useCallback(
        async (...args) => {
            const requestID = Symbol();         // create request id
            currentRequest.current = requestID; // hold reference
            setIsLoading(true);
            try {
                const response = await service(...args);

                if (isRequestCancelled.current) {
                    return;
                }
                // ignore all previous request and update data
                // only if current request is the latest one
                if (currentRequest.current === requestID) {
                    setData(response || null);
                    setIsLoading(false);
                }
            } catch (error) {
                if (isRequestCancelled.current) {
                    return;
                }
                setIsLoading(false);
                return Promise.reject(error);
            }
        },
        [service]
    );

    useEffect(() => {
        return () => { isRequestCancelled.current = true; };
    }, []);

    return [data, serviceAPI, isLoading];
};