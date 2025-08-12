import clsx from "clsx";
import classes from "./notification.module.scss";

export const NOTIFICATION_TYPES = {
  Success: "success",
  Info: "info",
  Error: "error",
  Alert: "alert",
} as const;

export type NotificationTypes =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

export function NotificationKit({
  children,
  type,
  width = "auto",
}: {
  children: React.ReactNode;
  type: NotificationTypes;
  width?: string;
}) {
  if (children === null || children === undefined) return;
  return (
    <div className={classes["notification-shadow"]} style={{ width }}>
      <div
        className={clsx(
          classes["notification-block"],
          type === NOTIFICATION_TYPES.Success && classes[type],
          type === NOTIFICATION_TYPES.Info && classes[type],
          type === NOTIFICATION_TYPES.Error && classes[type],
          type === NOTIFICATION_TYPES.Alert && classes[type]
        )}
      >
        {children}
      </div>
    </div>
  );
}
