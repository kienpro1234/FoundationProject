import React from "react";
import Button from "../UI/Button";
import classes from "./MenuCategorySection.module.css";

import { Link } from "react-router-dom";

export default function MenuCategorySection({ category }) {
  return (
    <div className="menu-category">
      <h3 className={classes.title}>
        <span>{category.categoryName.toUpperCase()}</span>
      </h3>
      <ul className={`row gx-0 px-3 ${classes.category}`}>
        {category?.dishes?.map((food) => {
          return (
            <li className="col-4 pe-3 mb-2" key={food.id}>
              <div>
                <div className={classes.foodInfo}>
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
                <div className="d-flex align-items-center justify-between">
                  <div className="food-review ">
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
