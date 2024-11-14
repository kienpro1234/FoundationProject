import React, { useContext } from "react";
import classes from "./HeaderUser.module.css";
import Header from "./Header";
import { loginContext } from "../../context/loginContext";
import useLogout from "../../hooks/useLogout";
import { Link, redirect } from "react-router-dom";
import { getToken } from "../../utils/util";
export default function HeaderUser({ user }) {
  //lấy ra handleLogout để logout, remove AT và setIsLogin = false
  const { handleLogout, navigate } = useLogout();
  const token = getToken();
  if (!token) {
    navigate("/menu/all");
  }

  return (
    <div className={`${classes.headerUser} d-flex justify-content-between align-items-center`}>
      <div className={`${classes.logo}`}>
        <Link to="/menu">
          <img
            src="https://img.freepik.com/premium-vector/restaurant-logo-design_1128391-17280.jpg"
            alt="logo restaurant"
          />
        </Link>
      </div>
      <div className={`${classes.navbar}`}>
        <ul className={`${classes["headerUser-ul"]} d-flex gap-10 align-items-center`}>
          <Header className="position-relative" style={{ transform: "translateY(-35%)", minWidth: "180px" }} />
          <div className="d-flex gap-2 align-items-center">
            <li>
              <img
                className={classes.avatar}
                src={
                  "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/431240968_431190712682006_1668401436782837892_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Q_Xk-HlaJaUQ7kNvgEe2G5e&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AFfXrKsIi48of07fUdasUbc&oh=00_AYBc4VrX1skg2JbkYoIa9Uu0WE19G_GERlEff6h1FwsrDA&oe=673BBC64"
                }
                alt={"avatar"}
              />
            </li>
            <li className={`${classes.username} text-white fw-bold flex flex-col`} style={{ fontSize: "1.8rem" }}>
              {user.lastName}

              <button onClick={handleLogout} className="text-xs md:text-sm  text-left">
                Đăng xuất
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
