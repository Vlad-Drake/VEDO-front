import clsx from "clsx";
import styles from './skeleton-kit.module.css';

type SkeletonTypes = 'rect' | 'text';

export function SkeletonKit({
    type,
    width = '300px'
}: {
    type: SkeletonTypes,
    width?: string,
}) {
    return (
        <div className={clsx(styles[type], styles["skeleton-content"])} style={{ width }}></div>
    );
}