import React from "react";
import classes from "./HeaderUser.module.css";
import Header from "./Header";
export default function HeaderUser({ user }) {
  //Lấy thông tin người dùng từ bên kia

  return (
    <div
      className={`${classes.headerUser} d-flex justify-content-between align-items-center`}
    >
      <div className={`${classes.logo}`}>
        <img
          src="https://img.freepik.com/premium-vector/restaurant-logo-design_1128391-17280.jpg"
          alt="logo restaurant"
        />
      </div>
      <div className={`${classes.navbar}`}>
        <ul className="d-flex gap-10 align-items-center">
          <Header className="position-relative" style={{transform: "translateY(-35%)"}}/>
          <div className="d-flex gap-2 align-items-center">
            <li>
              <img
                className={classes.avatar}
                src={user.avatar}
                alt={user.avatar}
              />
            </li>
            <li className="text-white fw-bold" style={{fontSize: "1.8rem"}}>{user.name}</li>
          </div>
        </ul>
      </div>
    </div>
  );
}
