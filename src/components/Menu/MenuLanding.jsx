import React from "react";
import classes from "./MenuLanding.module.css";
export default function MenuLanding() {
  return (
    <div className={`${classes.menuLanding} menuLanding`}>
      <div className={classes["menuLanding-captions"]}>
        <h3>MENU</h3>
        <h2>TODAY'S MENU</h2>
      </div>
    </div>
  );
}
