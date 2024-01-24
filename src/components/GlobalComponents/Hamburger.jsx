import React, { useState } from "react";
import styles from "./Hamburger.module.css";

const Hamburger = ({ closed, menuClickHandler }) => {
  const [remove, setRemove] = useState(false);

  const handleClick = () => {
    menuClickHandler();
    setRemove(true);
  };

  return (
    <button
      id="hamburger"
      onClick={handleClick}
      className={`${styles.hamburger} ${!closed ? styles["menu-active"] : ""}`}
    >
      <div
        className={`${styles.line} ${styles["line--first"]} ${
          !remove ? styles.noAnimate : ""
        }`}
      ></div>
      <div
        className={`${styles.line} ${styles["line--second"]} ${
          !remove ? styles.noAnimate : ""
        }`}
      ></div>
      <div
        className={`${styles.line} ${styles["line--third"]} ${
          !remove ? styles.noAnimate : ""
        }`}
      ></div>
    </button>
  );
};

export default Hamburger;
