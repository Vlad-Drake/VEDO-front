import { useRef, useState } from "react";
import styles from './tooltip.module.css';

export type TooltipStateModel = {
    isVisible: boolean,
    position: {
        x: number,
        y: number,
    }
}

type UseTooltipProps = {
    placement: "top" | "bottom" | "left" | "right",
    offset: number,
    delay: number,
}

function useTooltip({
    setState,
    ref,
}: {
    setState: (value: React.SetStateAction<TooltipStateModel>) => void,
    ref: React.RefObject<HTMLDivElement | null>
}) {
    let showTimeout: number;

    const calculatePosition = (target: HTMLElement, placement: UseTooltipProps['placement'], offset: number) => {
        if (!ref.current) return { x: 0, y: 0 };
        const rect = target.getBoundingClientRect();
        const tooltipRect = ref.current.getBoundingClientRect();
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;

        let x = 0;
        let y = 0;

        switch (placement) {
            case "top":
                x = targetCenterX - tooltipRect.width / 2;
                y = rect.top - tooltipRect.height - offset!;
                break;
            case "bottom":
                x = targetCenterX - tooltipRect.width / 2;
                y = rect.bottom + offset!;
                break;
            case "left":
                x = rect.left - tooltipRect.width - offset!;
                y = targetCenterY - tooltipRect.height / 2;
                break;
            case "right":
                x = rect.right + offset!;
                y = targetCenterY - tooltipRect.height / 2;
                break;
        }

        return { x, y };
    };

    const showTooltip = ({ placement, offset, delay }: UseTooltipProps) => (e: React.MouseEvent | React.FocusEvent) => {
        const target = e.currentTarget as HTMLElement;
        showTimeout = window.setTimeout(() => {
            setState({
                isVisible: true,
                position: calculatePosition(target, placement, offset),
            });
        }, delay);
    };

    const hideTooltip = () => {
        clearTimeout(showTimeout);
        setState((prev) => ({
            ...prev,
            isVisible: false,
        }));
    };

    return {
        getContainerProps: ({ placement, offset, delay }: UseTooltipProps) => ({
            onMouseEnter: showTooltip({ placement, offset, delay }),
            onMouseLeave: hideTooltip,
            onFocus: showTooltip({ placement, offset, delay }),
            onBlur: hideTooltip,
        })
    }
}

export function TooltipKit({
    children,
    content,
    placement = 'bottom',
    offset = 8,
    delay = 0,
}: {
    children: React.ReactNode,
    content: React.ReactNode,
    placement?: UseTooltipProps["placement"],
    offset?: number,
    delay?: number,
}) {
    const [state, setState] = useState<TooltipStateModel>({
        isVisible: false,
        position: { x: 0, y: 0, }
    });

    const ref = useRef<HTMLDivElement | null>(null);

    const { getContainerProps } = useTooltip({ setState, ref });

    return (
        <>
            <div {...getContainerProps({ placement, offset, delay })}>
                {children}
            </div>
            <div
                role="tooltip"
                className={`${styles.tooltip} ${styles[`tooltip-${placement}`]}`
                }
                style={{
                    transform: `translate(${state.position.x}px, ${state.position.y}px)`,
                    opacity: state.isVisible ? 1 : 0,
                    visibility: state.isVisible ? "visible" : "hidden",
                }}
                ref={ref}
            >
                <div>
                    {content}
                </div>
            </div >
        </>
    );
}