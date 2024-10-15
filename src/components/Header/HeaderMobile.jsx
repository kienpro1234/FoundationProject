import React, { useContext, useRef, useState } from "react";
import classes from "./HeaderMobile.module.css";
import { Link } from "react-router-dom";
import SearchContext from "../../context/headerContext";

export default function HeaderMobile() {
  const { isSearching, setIsSearching } = useContext(SearchContext);
  const { isMenuOpen, setIsMenuOpen } = useContext(SearchContext);
  console.log("ismenuopen", isMenuOpen);
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    setIsSearching(() => {
      inputRef.current.focus();
      return true;
    });
  };

  const handleBackSearch = () => {
    setIsSearching(false);
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div
      className={`${isMenuOpen ? classes["header-open-menu"] : classes.header}`}
    >
      <div className={`${classes["header-logo"]}`}>
        <Link to={"/menu/all"}>
          <img
            src="https://img.freepik.com/premium-vector/restaurant-logo-design_1128391-17280.jpg"
            alt="restaurant logo"
          />
        </Link>
      </div>

      <ul className={`${classes.navbar}`}>
        {!isMenuOpen ? (
          <>
            <div
              className={`${
                isSearching
                  ? classes["header-search-open"]
                  : classes["header-search"]
              } `}
            >
              <button
                className={`${isSearching ? classes.btnBack : classes.hidden}`}
                onClick={handleBackSearch}
              >
                <i className="fa fa-arrow-left"></i>
              </button>
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
            <div className={classes["header-auth"]}>
              <Link to={"/userinfo"}>
                <button>
                  <i className="fa fa-user"></i>
                </button>
              </Link>
            </div>
            <div className={classes["header-fav"]}>
              <button>
                <i className="fa fa-heart"></i>
              </button>
            </div>
            <div className={classes["header-cart"]}>
              <button>
                <i className="fa fa-shopping-cart"></i>
              </button>
            </div>
          </>
        ) : (
          <></>
        )}

        <div>
          {!isMenuOpen ? (
            <button onClick={handleOpenMenu}>
              <i className="fa fa-bars"></i>
            </button>
          ) : (
            <button onClick={handleCloseMenu}>
              <i class="fa fa-times"></i>
            </button>
          )}
        </div>
      </ul>
    </div>
  );
}
