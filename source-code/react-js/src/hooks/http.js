import { QueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
export const queryClient = new QueryClient();
// export function useFetch(fetchFn, initialValue) {
//     const [isFetching, setIsFetching] = useState(false);
//     const [error, setError] = useState(null);
//     const [fetchedData, setFetchedData] = useState(initialValue);
//     useEffect(() => {
//         async function fetchData() {
//             setIsFetching(true);
//             try {
//                 const data = await fetchFn();
//                 setTimeout(() => {
//                     setIsFetching(false)
//                 }, 5000)

//                 setFetchedData(data);
//             } catch (error) {
//                 console.log(error)
//                 setError({ message: error.message || "Failed to fetch data." });
//                 setIsFetching(false);
//             }
//         }
//         fetchData();
//     }, [fetchFn])

//     return {
//         isFetching,
//         fetchedData,
//         error,
//         setFetchedData
//     };
// }
export function useSubmit(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(initialValue);

    function fetchFuncCaller() {
        try {
            setIsFetching(true);
            setTimeout(() => {
                setIsFetching(false);
            }, 5000);
        } catch (error) {
            setError(true);
            setIsFetching(false);
        }
    }
    return {
        isFetching,
        fetchedData,
        error,
        fetchFuncCaller,
    };
}

export const usePost = (
    initialFunction,
    onSuccess = () => {},
    onError = () => {}
) => {
    const [isFetching, setIsFetching] = useState(false);

    const handlePost = useCallback(
        async(options = {}) => {
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
                console.error("An error occurred:", error);
                throw error; // Rethrow the error for the caller to handle if needed
            }
        }, [initialFunction, onSuccess, onError]
    );

    return { isFetching, handlePost };
};

export async function fetchFunction({ url, options }) {
    const response = await fetch(url, options);
    const data = await response.json();
    return;
}
export async function fetchFun({ url, options }) {
    const response = await fetch(url, options);
    if (!response.ok) {
        let error = new Error("An error occurred while fetching the data.");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    return await response.json();
}
export function getToken() {
    return localStorage.getItem("user-token");
}
export async function processSignUpForm(formData) {
    const fd = Object.fromEntries(formData.entries());
    return {
        email: fd.email,
        password: fd.password,
        username: fd.username,
        phoneNumber: fd["phone-number"],
        dateOfBirth: fd["birthday-date"],
        firstName: fd["first-name"],
        lastName: fd["last-name"],
        address: fd.address,
        gender: fd.gender,
        role: fd["user-role"],
    };
}
export async function isAuthenticatedUser(token) {
    try {
        const response = await fetchFun({
            url: "http://localhost:8081/user/auth/verify-token",
            options: {
                method: "GET",
                headers: {
                    "x-access-token": token,
                },
            },
        });

        if (response && response.message === "Token is valid") {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error verifying token:", error);
        return false;
    }
}

export function processLoginForm(formData) {
    const fd = Object.fromEntries(formData.entries());
    return {
        email: fd.email,
        password: fd.password,
    };
}