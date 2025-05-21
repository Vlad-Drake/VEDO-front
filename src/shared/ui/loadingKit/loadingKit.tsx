import { useEffect, useRef, useState } from "react";
import classes from "./loadingKit.module.scss";
//import VEDOIco from './assets/VEDO-ico.svg';
import VEDOIco from "./assets/VEDI-ico-list.svg";

export function LoadingKit() {
  const intervalId = useRef<number | null>(null);
  const [text, setText] = useState("Загрузка");

  useEffect(() => {
    intervalId.current = window.setInterval(() => {
      setText((prev) => {
        if (prev.endsWith("...")) {
          return "Загрузка";
        } else {
          return prev + ".";
        }
      });
    }, 1000);

    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  return (
    <div className={classes["loading"]}>
      {/*<div className={classes['satellite']}></div>*/}

      <img src={VEDOIco} alt="" />
      <p>{text}</p>
    </div>
  );
}
