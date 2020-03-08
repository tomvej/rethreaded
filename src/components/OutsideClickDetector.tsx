import React, {FC, ReactNode, useEffect, useRef} from 'react';

type OutsideClickDetectorProps = {
    onOutsideClick: () => void;
    children: ReactNode;
}

const OutsideClickDetector: FC<OutsideClickDetectorProps> = ({onOutsideClick, children}) => {
    const wrapper = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): void => {
            if (!wrapper.current?.contains(event.target as Node)) {
                onOutsideClick();
            }
        };
        window.addEventListener('mousedown', handleOutsideClick);
        return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, [onOutsideClick]);

    return (
        <div ref={wrapper}>
            {children}
        </div>
    )
};

export default OutsideClickDetector;
