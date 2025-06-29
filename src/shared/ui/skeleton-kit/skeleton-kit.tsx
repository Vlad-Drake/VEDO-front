import clsx from "clsx";
import styles from './skeleton-kit.module.css';

type SkeletonTypes = 'rect' | 'text';

export function SkeletonKit({
    type
}: {
    type: SkeletonTypes
}) {
    return (
        <div className={clsx(styles[type], styles["skeleton-content"])}></div>
    );
}