import {RefObject, useEffect, useRef} from 'react';

export default <R extends Element>(focus: boolean): RefObject<R> => {
    const element = useRef<R>(null);
    useEffect(() => {
        if (focus && element.current) {
            element.current.scrollIntoView({
                // behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            });
        }
    }, [focus]);
    return element;
}
