import { useCallback, useEffect, useRef, useState } from "react";

export function useFetch(fetchAPI) {

    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const isMounted = useRef(null);
    const currentRequest = useRef(null);

    const fetch = useCallback(
        async (...params) => {
            if (!isMounted.current) {
                return;
            }

            if (!isFetching) {
                setIsFetching(true);
            }

            // give this fetch request an ID
            const requestID = Symbol();

            // hold reference to the latest request
            currentRequest.current = requestID;
            const fetchedData = await fetchAPI(...params);

            // update data only when component is still mounted and
            // the returned data must be from the latest request
            if (isMounted.current && currentRequest.current === requestID) {
                setData(fetchedData);
                setIsFetching(false);
            }
        },
        []
    );

    useEffect(() => {
        isMounted.current = true;

        return () => { isMounted.current = false; };
    }, []);

    return [data, isFetching, fetch];
}