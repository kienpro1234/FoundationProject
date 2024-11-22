import React, { useContext, useRef, useState } from "react";
import classes from "./HeaderMobile.module.css";
import { Link } from "react-router-dom";
import SearchContext from "../../context/headerContext";
import { useMediaQuery } from "react-responsive";
import { countFoodInCartList } from "../../utils/util";
import { CartContext } from "../../context/cartContext";

export default function HeaderMobile({ configImg, title }) {
  const { cartList } = useContext(CartContext);
  const { isSearching, setIsSearching } = useContext(SearchContext);
  const { isMenuOpen, setIsMenuOpen } = useContext(SearchContext);
  const inputRef = useRef(null);

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
      className={`${isMenuOpen ? classes["header-open-menu"] : classes.header} ${
        isDesktop && "bg-emerald-600 px-20 py-1"
      } ${title === "cart" ? "relative border-b shadow-sm" : ""}`}
    >
      <div className={`${classes["header-logo"]}`}>
        <Link to={"/menu/all"}>
          <img
            className={configImg || ""}
            src="https://img.freepik.com/premium-vector/restaurant-logo-design_1128391-17280.jpg"
            alt="restaurant logo"
          />
        </Link>
      </div>

      {title ? <h3 className="absolute left-1/2 -translate-x-1/2 font-semibold">Ordering Cart</h3> : ""}

      {/* Chú thích:
      - Logo luôn hiện 
      - Nếu menu chưa open thì hiển thị đầy đủ mục ở header, nếu ngược lại thì không hiển thị, mà chỉ hiển thị close button thôi
      */}
      <ul className={`${classes.navbar}`}>
        {!isMenuOpen ? (
          <>
            {isMobile && title === "cart" ? (
              ""
            ) : (
              <>
                {isMobile && (
                  <div className={`${isSearching ? classes["header-search-open"] : classes["header-search"]}`}>
                    <div className={`${isSearching ? classes.btnBack : classes.hidden}`}>
                      <button className={`button-click-expand`} onClick={handleBackSearch}>
                        <i className="fa fa-arrow-left"></i>
                      </button>
                    </div>
                    <input
                      ref={inputRef}
                      className={`${isSearching ? classes["search-open"] : classes["search-close"]}`}
                      type="text"
                    />
                    <div className={`${isSearching ? classes["button-search-open"] : classes["button-search"]}`}>
                      <button className={`button-click-expand`} onClick={handleSearchClick}>
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                )}

                <div className={classes["header-auth"]}>
                  <Link to={"/userinfo"}>
                    <button className={`button-click-expand`}>
                      <i className="fa fa-user"></i>
                    </button>
                  </Link>
                </div>
                <div className={`${classes["header-fav"]} transition-all hover:text-red-600`}>
                  <button className={`button-click-expand`}>
                    <i className="fa fa-heart"></i>
                  </button>
                </div>
                {isMobile && (
                  <>
                    <Link to={"/cart"} className="fixed bottom-1/4 right-4 z-10">
                      <div
                        className={`${classes["header-cart"]} flex size-10 items-center justify-center rounded-full bg-red-500 text-sm text-white`}
                      >
                        <div className="absolute -right-[1px] -top-1 flex size-4 items-center justify-center rounded-full bg-blue-400">
                          <span className="text-sm font-bold text-white">{countFoodInCartList(cartList)}</span>
                        </div>
                        <button className={`button-click-expand`}>
                          <i className="fa fa-shopping-cart"></i>
                        </button>
                      </div>
                    </Link>

                    <div>
                      <button className={`button-click-expand`} onClick={handleOpenMenu}>
                        <i className="fa fa-bars"></i>
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <div>
            <button className={`button-click-expand }`} onClick={handleCloseMenu}>
              <i className="fa fa-times"></i>
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}
