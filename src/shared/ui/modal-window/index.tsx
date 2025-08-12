import { useRef, type ReactNode } from "react"
import classes from './modalWindow.module.scss';

export function ModalWindow({
    children,
    isShow,
    onClose,
}: {
    children: ReactNode,
    isShow: boolean,
    onClose: () => void,
}) {

    if (!isShow) return null;

    const modalRef = useRef<HTMLDivElement>(null);
    const handlePointerDown = (event: React.PointerEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    }

    return (
        <div className={classes['modalWindow']} onPointerDown={handlePointerDown}>
            <div className={classes['content']} ref={modalRef}>
                {children}
            </div>
        </div>
    );
}
