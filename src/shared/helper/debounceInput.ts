import { useRef } from "react";

export function useDebounceInput() {
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    function debounceInput(callback: () => void) {

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(callback, 600);
    };

    return debounceInput;
}



