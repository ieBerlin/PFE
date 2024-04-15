import { useState } from "react";

export function useFetch(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(initialValue);

    const fetchData = async() => {
        setIsFetching(true);
        try {
            const data = await fetchFn();

            setTimeout(() => setIsFetching(false), 5000)

            setFetchedData(data);
        } catch (error) {
            setError({ message: error.message || "Failed to fetch data." });
            setIsFetching(false);
        }
    };

    return {
        isFetching,
        fetchedData,
        error,
        fetchData
    };
}

/**
 * const errorsMayHappend = [{
        description: "Invalid email value",
    },
    {
        title: "Invalid password",
        description: "Invalid password value",
    },
];
 */