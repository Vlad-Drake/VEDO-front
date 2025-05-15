import classes from './notification.module.scss';

export const NOTIFICATION_TYPES = {
    Success: 'success',
    Info: 'info',
    Error: 'error',
    Alert: 'alert'
} as const;

export type NotificationTypes = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

export function NotificationKit({
    children,
    type,
    width = 'auto'
}:{
    children: React.ReactNode,
    type: NotificationTypes,
    width?: string,
}) {
    if(children === null || children === undefined) return;
    console.log(type)
    return (
        <div className={classes["notification-shadow"]} style={{ width }}>
            <div className={`${classes["notification-block"]} `}>{/*was :class="{'red': status === 0, 'green': status === 1}"*/}
                <p>{children}</p>
            </div>
        </div>
    );
}