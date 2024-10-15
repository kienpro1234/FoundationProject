import React from "react";
import classes from "./MenuLanding.module.css";
import { formatName } from "../../utils/util";
export default function MenuLanding({ foodCategories }) {
  if (foodCategories) {
    console.log("food categories landing", foodCategories);
  }

  let categoryName = null;
  if (foodCategories?.length === 1) {
    categoryName = formatName(foodCategories[0].categoryName).toUpperCase();
  } else if (foodCategories?.length === 2) {
    categoryName =
      formatName(foodCategories[0].categoryName).toUpperCase() + " & " + formatName(foodCategories[1].categoryName).toUpperCase();
  }

  return (
    <div className={`${classes.menuLanding} menuLanding`}>
      <div className={classes["menuLanding-captions"]}>
        <h3>MENU</h3>
        <h2>{categoryName || "TODAY'S MENU"} </h2>
      </div>
    </div>
  );
}
