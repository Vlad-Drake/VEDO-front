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
          type === "success" && classes[type],
          type === "info" && classes[type],
          type === "error" && classes[type],
          type === "alert" && classes[type]
        )}
      >
        {children}
      </div>
    </div>
  );
}
