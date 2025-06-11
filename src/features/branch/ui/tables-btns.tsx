import classes from '../branch.module.scss';

export function TablesButtons({
    clickTop,
    clickDown,
    clickDelete,
}: {
    clickTop: () => void,
    clickDown: () => void,
    clickDelete: () => void,
}) {
    return (
        <div className={classes["list-content__control-row"]}>
            <button
                onClick={clickTop}
            >
                ▲
            </button>
            <button
                onClick={clickDown}
            >
                ▼
            </button>
            <button
                onClick={clickDelete}
            >
                ✖
            </button>
        </div>
    );
}