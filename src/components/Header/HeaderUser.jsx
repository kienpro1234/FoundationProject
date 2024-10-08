import React from "react";
import classes from "./HeaderUser.module.css";
export default function HeaderUser() {
  return (
    <div className={`${classes.headerUser} d-flex justify-content-between align-items-center`}>
      <div className={`${classes.logo}`}>
        <img
          src="https://img.freepik.com/premium-vector/restaurant-logo-design_1128391-17280.jpg"
          alt="logo restaurant"
        />

      </div>
      <div className={`${classes.navbar}`}>
        <ul className="d-flex gap-10">
            <li>Avatar</li>
            <li>Bang Van</li>
        </ul>
      </div>
    </div>
  );
}
