import Circle from "./assets/circle.svg";
import classes from "./buttonKit.module.scss";

export const BTN_STATUSES = {
  Default: "default",
  Disabled: "disabled",
  Loading: "loading",
} as const;

export type BtnStatuses = (typeof BTN_STATUSES)[keyof typeof BTN_STATUSES];

export const COLOR_TYPE = {
  Primary: "primary",
  Additional: "additional",
  Secondary: "secondary",
  Outline: "outline",
  Soft: "soft",
} as const;

export type BtnTypes = (typeof COLOR_TYPE)[keyof typeof COLOR_TYPE];

type ButtonType = "button" | "submit" | "reset";

export function ButtonKit({
  children,
  status,
  onClick,
  width,
  type = "button",
  colorType,
}: {
  children: React.ReactNode;
  status: BtnStatuses;
  onClick: () => void;
  width?: string;
  type?: ButtonType;
  colorType: BtnTypes;
}) {
  const handleClick = () => {
    if (status !== "default") return;
    onClick();
  };

  return (
    <button
      className={`${classes["button"]} ${classes[`${colorType}${status !== BTN_STATUSES.Default ? "-" + status : ""}`]}`}
      style={{ width }}
      onClick={handleClick}
      type={type}
    >
      <span
        className={
          status === BTN_STATUSES.Loading ? classes["invisible"] : ""
        }
      >
        {children}
      </span>
      {status === BTN_STATUSES.Loading && (
        <div className={classes["loader"]}>
          <img src={Circle} alt="" />
        </div>
      )}
    </button>
  );
}
