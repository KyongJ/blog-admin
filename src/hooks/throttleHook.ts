/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef} from 'react';

export default function useThrottle(fn: () => void, delay: number, dep = []) {
    const { current } = useRef<any>({ fn, timer: null });
    useEffect(() => {
        current.fn = fn;
    }, [fn]);

    return React.useCallback((...args) => {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer;
            }, delay);
            current.fn(...args);
        }
    }, dep);
}
