import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MenuComponent.module.css";
import { useQuery } from "@tanstack/react-query";
import { DOMAIN } from "../../utils/const";
import { formatName } from "../../utils/util";
import ErrorBlock from "../UI/ErrorBlock";
import LoadingIndicator from "../UI/LoadingIndicator";
import Footer from "../Footer/Footer";

export default function MenuComponent() {
  console.log(DOMAIN + "category");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu-navbar"],
    queryFn: async ({ signal }) => {
      try {
        const res = await fetch(`${DOMAIN}category`, { signal });
        const result = await res.json();
        console.log(result);
        return result.data;
      } catch (err) {
        throw err;
      }
    },
  });

  console.log("data", data);
  let content;

  if (isError) {
    content = <ErrorBlock title={"An error occured"} message={error.message} />;
  }

  if (isLoading) {
    content = <LoadingIndicator customClass={"loading-menuComponent-config"}/>;
  }

  if (data) {
    content = (
      <>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to={"all"}
          >
            All
          </NavLink>
        </li>
        {data.map((cat) => (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to={cat.categoryName}
            >
              {formatName(cat.categoryName)}
            </NavLink>
          </li>
        ))}
      </>
    );
  }

  return (
    <section className={`${classes.menu}`}>
      <div className={classes["menu-index"]}>
        <h3 style={{ letterSpacing: ".05em" }}>MENU</h3>
        <ul className={classes["menu-categories"]}>{content}</ul>
        
      </div>
      
    </section>
  );
}
