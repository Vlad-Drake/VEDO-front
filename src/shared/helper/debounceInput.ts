import { useRef } from "react";

export function useDebounceInput() {
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    function debounceInput(callback: () => void) {

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(callback, 600);
    };

    return debounceInput;
}



