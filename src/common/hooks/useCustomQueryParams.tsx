import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

const useCustomQueryParams = () => {
    const searchParams = useSearchParams();

    const createQueryString = useCallback((name: string, value: string) => {
        if (!searchParams) {
            return ''; // Handle case where searchParams is null or undefined
        }

        const params = new URLSearchParams(searchParams.toString()); // Create a new instance to maintain immutability
        params.set(name, value);
        return params.toString();
    }, [searchParams]);

    return {
        createQueryString,
        searchParams
    };
};

export default useCustomQueryParams;
