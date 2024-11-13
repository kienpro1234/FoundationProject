import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MenuComponent.module.css";
import { useQuery } from "@tanstack/react-query";
import { DOMAIN } from "../../utils/const";
import { formatName } from "../../utils/util";
import ErrorBlock from "../UI/ErrorBlock";
import LoadingIndicator from "../UI/LoadingIndicator";
// import Footer from "../Footer/Footer";
import axios from "axios";
import { http } from "../../utils/http";

export default function MenuComponent() {
  console.log(DOMAIN + "category");
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["menu-navbar"],
  //   queryFn: async ({ signal }) => {
  //     console.log("hellollo");
  //     try {
  //       console.log("sau hello");
  //       const res = await axios.get(`${DOMAIN}category`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         signal,
  //       });
  //       console.log("res ne", res);

  //       console.log("1", res.json());

  //       console.log("rs1", res.text());
  //       console.log("content type", res.headers.get("Content-Type"));

  //       const result = await res.json();
  //       console.log("result", result);
  //       return result.data;

  //       // return res.json();
  //     } catch (err) {
  //       throw err;
  //     }
  //   },
  // });

  //Dùng axios
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu-navbar"],
    queryFn: async ({ signal }) => {
      try {
        console.log("sau hello");
        const res = await http.get(`category`, { signal });

        // if (res.status < 200 || res.status >= 300) {
        //   throw new Error("Không thể fetch manu category");
        // }

        console.log("res ne", res);

        const result = res.data;
        console.log("result", result);

        return result.data;
      } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
      }
    },
  });

  console.log("data", data);
  let content;

  if (isError) {
    console.log("lỗi rồi", error);
    content = <ErrorBlock title={"An error occured"} message={error.message} />;
  }

  if (isLoading) {
    content = <LoadingIndicator customClass={"loading-menuComponent-config"} />;
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
        {data.map((cat, index) => (
          <li key={index}>
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
