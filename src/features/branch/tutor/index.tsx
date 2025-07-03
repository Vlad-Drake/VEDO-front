import React, { createContext, useContext, useRef, useState, type RefObject } from "react";
import styles from "./tutor.module.css";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { mergeRefs } from "react-merge-refs";
import { ButtonKit } from "@/shared/ui/buttonKit/buttonKit";

export function TutorWrapper({
    children,
    ref,
    className,
}: {
    children: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
}) {
    return (
        <div className={className} ref={ref}>
            {children}
        </div>
    );
}

export function TutorStep({
    children,
    content,
    index,
    position,
}: {
    children: React.ReactElement;
    position: "top" | "bottom" | "left" | "right";
    content: React.ReactNode;
    index: number;
}) {
    const { currentStep, handleNext, handleSkip } = useTutor();
    const tooltip = useTooltip({
        content,
        position,
        handleNext,
        handleSkip,
        showTooltip: index === currentStep,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyProps = children.props as unknown as any;
    return (
        <>
            {React.cloneElement(children, {
                ref: mergeRefs([tooltip.target.ref, anyProps.ref]),
                className: clsx(tooltip.target.className, anyProps.className),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)}
            {tooltip.tooltip}
        </>
    );
}

interface TutorState {
    currentStep: number;
    handleNext: () => void;
    handleSkip: () => void;
    startTutor: () => void;
}

const TutorContext = createContext<TutorState>({
    currentStep: 0,
    handleNext: () => { },
    handleSkip: () => { },
    startTutor: () => { },
});

export function TutorProvider({ children }: { children: React.ReactNode }) {
    const [stepIndex, setStepIndex] = useState(-1);

    const startOnboarding = () => {
        setStepIndex(0);
    };

    const handleNext = () => {
        setStepIndex((prev) => prev + 1);
    };

    const handleSkip = () => {
        setStepIndex(3);
    };

    return (
        <TutorContext.Provider
            value={{
                currentStep: stepIndex,
                handleNext,
                handleSkip,
                startTutor: startOnboarding,
            }}
        >
            {children}
        </TutorContext.Provider>
    );
}

export function useTutor() {
    const context = useContext(TutorContext);

    if (!context) {
        throw new Error("useTutor must be used within a TutorProvider");
    }

    return context;
}

function useTooltip({
    position,
    showTooltip,
    content,
    handleNext,
    handleSkip,
    isLastStep = false,
}: {
    position: "top" | "bottom" | "left" | "right";
    content: React.ReactNode;
    showTooltip: boolean;
    handleNext: () => void;
    handleSkip: () => void;
    isLastStep?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    return {
        target: {
            ref,
            className: showTooltip ? styles.highlight : "",
        },
        tooltip:
            showTooltip &&
            <>
                <div className={styles.overlay} />
                <div
                    className={`${styles.tooltip} ${styles[position]}`}
                    style={{
                        ...getTooltipPosition(ref.current, position),
                    }}
                >
                    <div className={styles.tooltipContent}>{content}</div>
                    <div className={styles.tooltipButtons}>
                        <ButtonKit
                            btnStatus='default'
                            btnClick={handleSkip}
                            btnType='additional'
                            btnContent={'Завершить'}
                        />
                        <ButtonKit
                            btnStatus='default'
                            btnClick={handleNext}
                            btnType='primary'
                            btnContent={isLastStep ? "Завершить" : "Дальше"}
                        />
                    </div>
                </div>
            </>
        /*createPortal(
            ,
            document.body
        ),*/
    };
}

function getTooltipPosition(
    element: HTMLElement | null,
    position: "top" | "bottom" | "left" | "right"
) {
    if (!element) return {};

    const rect = element.getBoundingClientRect();
    const spacing = 12;
    console.log(rect)
    switch (position) {
        case "top":
            return {
                bottom: `${window.innerHeight - rect.top + spacing}px`,
                left: `${rect.left + rect.width / 2}px`,
                transform: "translateX(-50%)",
            };
        case "bottom":
            return {
                top: `${rect.bottom + spacing}px`,
                left: `${rect.left + rect.width / 2}px`,
                transform: "translateX(-50%)",
            };
        case "left":
            return {
                right: `${window.innerWidth - rect.left + spacing}px`,
                top: `${rect.top + rect.height / 2}px`,
                transform: "translateY(-50%)",
            };
        case "right":
            return {
                left: `${rect.right + spacing}px`,
                top: `${rect.top + rect.height / 2}px`,
                transform: "translateY(-50%)",
            };
    }
}

