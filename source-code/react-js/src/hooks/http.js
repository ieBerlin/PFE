import { useCallback, useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(initialValue);
    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setTimeout(() => {
                    setIsFetching(false)
                }, 5000)

                setFetchedData(data);
            } catch (error) {
                console.log(error)
                setError({ message: error.message || "Failed to fetch data." });
                setIsFetching(false);
            }
        }
        fetchData();
    }, [fetchFn])

    return {
        isFetching,
        fetchedData,
        error,
        setFetchedData
    };
}
export function useSubmit(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(initialValue);

    function fetchFuncCaller() {
        try {
            setIsFetching(true)
            setTimeout(() => {
                setIsFetching(false)
            }, 5000)
        } catch (error) {
            setError(true)
            setIsFetching(false)

        }
    }
    return {
        isFetching,
        fetchedData,
        error,
        fetchFuncCaller
    };
}

export const usePost = (initialFunction, onSuccess = () => {}, onError = () => {}) => {
    const [isFetching, setIsFetching] = useState(false);

    const handlePost = useCallback(async(options = {}) => {
        setIsFetching(true);
        try {
            const response = await initialFunction(options);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setIsFetching(false);
            onSuccess(data);
            return data;
        } catch (error) {
            setIsFetching(false);
            onError(error);
            console.error('An error occurred:', error);
            throw error; // Rethrow the error for the caller to handle if needed
        }
    }, [initialFunction, onSuccess, onError]);

    return { isFetching, handlePost };
};