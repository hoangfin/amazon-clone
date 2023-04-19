import { useCallback, useEffect, useRef, useState } from "react";

export const useService = (service) => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const isRequestCancelled = useRef(false);
    const currentRequest = useRef(null);

    const fetch = useCallback(
        async (...args) => {
            setIsFetching(true);
            setError(null);
            const requestID = Symbol();         // create request id
            currentRequest.current = requestID; // hold reference
            try {
                const response = await service(...args);

                console.log(response);

                if (isRequestCancelled.current) {
                    return;
                }
                // ignore all previous request and update data
                // only if current request is the latest one
                if (currentRequest.current === requestID) {
                    setData(response);
                    setIsFetching(false);
                    return response;
                }
            } catch (err) {
                setError(err);
                setIsFetching(false);
                return Promise.reject(err);
            }
        },
        [service]
    );

    useEffect(() => {
        return () => { isRequestCancelled.current = true; };
    }, []);

    return [data, fetch, isFetching, error, setError];
};