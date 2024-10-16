import React from "react";
import Button from "../UI/Button";
import classes from "./MenuCategorySection.module.css";
import { formatName } from "../../utils/util";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DOMAIN } from "../../utils/const";

export default function MenuCategorySection({ category }) {
  console.log("check data", category);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu", "most-popular"],
    queryFn: async ({ signal }) => {
      try {
        const res = await fetch(`${DOMAIN}category/most-popular`, { signal });

        const result = await res.json();

        return result.data;
      } catch (err) {
        throw err;
      }
    },
  });

  const mostPopularArray = data?.dishes.map((food) => food.dishName);
  console.log("ktra", mostPopularArray);
  return (
    <div className="menu-category">
      <h3 className={classes.title}>
        <span>{formatName(category.categoryName.toUpperCase())}</span>
      </h3>
      <ul className={`row gx-4 px-3 ${classes.category}`}>
        {category?.dishes?.map((food) => {
          return (
            <li className="col-md-3 col-6 pe-3 mb-4" key={food.id}>
              <div className={classes["menu-category-content"]}>
                <div className={classes.foodInfo}>
                  <p className={`${classes["foodInfo-status"]}`}>
                    {/* lấy từ data cho vào đây  food.status*/}
                    {food.status}
                  </p>
                  {mostPopularArray && mostPopularArray.includes(food.dishName) && (
                    <span className={`${classes["sale-status"]}`}>
                      {/* Kiểm tra sale status tương ứng để xuất ra logo tương ứng với css tương ứng */}
                      {/* <i class="fa-solid fa-fire"></i> */}
                    </span>
                  )}

                  <button className={`${classes["foodInfo-fav-btn"]}`}>
                    <i class="fa-regular fa-heart"></i>
                  </button>
                  <Link to={`/food/${food.id}`}>
                    <img
                      className={classes.image}
                      src={food.image}
                      alt={food.dishName}
                    />
                  </Link>
                  <Link to={`/food/${food.id}`}>
                    <p className={`fw-bold ${classes.foodName}`}>
                      {food.dishName}
                    </p>
                  </Link>
                  <p className={classes.price}>{food.price}</p>
                </div>
                <div
                  className={`${classes.footer} d-flex align-items-center justify-between`}
                >
                  <div className="food-review">
                    <div className="d-flex gap-1 align-items-center">
                      <i className="fa fa-star text-warning"></i>
                      {/* <p>
                        {food.starAmount} ({food.reviewAmount} reviews)
                      </p> */}
                    </div>
                    {/* <div
                      className={`${classes["food-review-detail"]} d-flex align-items-center gap-2`}
                    >
                      <i className="fa fa-shopping-cart"></i>
                      <p>Ordered {food.orderedAmount} times</p>
                    </div> */}
                  </div>
                  <div>
                    <Button className="food-review-button">ORDER</Button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
