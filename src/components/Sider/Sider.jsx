import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./Sider.module.css";
import SiderMenu from "./SiderMenu";


export default function Sider() {
  return (
    <section className={classes.sider}>
      <Link to={"/menu"}>
        <img
          src="https://img.freepik.com/premium-vector/restaurant-logo-design_1128391-17280.jpg"
          alt="restaurant logo"
        />
      </Link>

      <div className={classes["sider-content"]}>
        <SiderMenu />
        <div className={classes["sider-footer"]}>
          <div className={classes["sider-contact"]}>
            <p>
              <i className="fa fa-clock"></i> 10:00 - 18:00
            </p>
            <p>
              <i className="fa fa-phone"></i> 1900 633 818
            </p>
          </div>
          <div className={classes["sider-icon"]}>
            <i className="fab fa-facebook-f text-primary"></i>
            <i className="fab fa-instagram text-danger"></i>
            <i className="fab fa-github"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
