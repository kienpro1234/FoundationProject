import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { getToken } from "../../utils/util";

//THêm class riêng cho esapase, tắt luôn, chứ k chờ
export default function Header({ className, ...props }) {
  //Dùng redux hay context api quản lý state sau
  const inputDiv = useRef(null);
  const inputRef = useRef(null);

  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

  // Kiểm tra nếu có accessToken thì setIsLogin = true để bên dưới render có điều kiện
  //isLogin ở đây khác với isLogin

  const token = getToken();

  const handleClickOutside = (event) => {
    if (inputDiv.current && !inputDiv.current.contains(event.target)) {
      setIsSearching(false);
    }
  };

  const handleEscDown = (event) => {
    if (event.key === "Escape") {
      setIsSearching(false);
    }
  };

  const handleSearchClick = () => {
    setIsSearching(() => {
      inputRef.current.focus();
      return true;
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscDown);
    };
  });

  let content;
  console.log(location.pathname);
  if (location.pathname === "/userinfo") {
    content = (
      <div>
        <Link to={"/menu"} className="text-white">
          <button>
            <i className="fa fa-home"></i>
          </button>
        </Link>
      </div>
    );
  } else {
    content = (
      <>
        <div ref={inputDiv} className={classes["header-search"]}>
          <input
            ref={inputRef}
            className={`${
              isSearching ? classes["search-open"] : classes["search-close"]
            }`}
            type="text"
          />
          <button
            className={`${
              isSearching
                ? classes["button-search-open"]
                : classes["button-search"]
            }`}
            onClick={handleSearchClick}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        {token ? (
          <div className={classes["header-auth"]}>
            <Link to={"/userinfo"}>
              <button>
                <i className="fa fa-user"></i>
              </button>
            </Link>
          </div>
        ) : (
          <div className={classes["header-auth-notLog"]}>
            <Link>
              <button>
                <i className="fa fa-user"></i>
              </button>
            </Link>
            <div className={`${classes["login-menu-container"]}`}>
              <ul className={`${classes["login-menu"]}`}>
                <Link
                  to={"/register"}
                  className="text-slate-800 hover:text-slate-800 text-sm"
                >
                  <li className="mb-2">Sign up</li>
                </Link>
                <Link
                  to={"/login"}
                  className="text-slate-800 hover:text-slate-800 text-sm"
                >
                  <li>Sign in</li>
                </Link>
                <div className={`${classes["login-menu-overlay"]}`}></div>
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`${classes.header} ${className}`} {...props}>
      {content}

      <div className={classes["header-fav"]}>
        <button>
          <i className="fa fa-heart"></i>
        </button>
      </div>
      <div className={classes["header-cart"]}>
        <button>
          <Link to={"/cart"} className="fa fa-shopping-cart"></Link>
        </button>
      </div>
    </div>
  );
}
