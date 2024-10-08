import React from "react";
import classes from "./Food.module.css";

import Button from "../UI/Button";

export default function Food({ food }) {
  return (
    <div className={`food ${classes["food-container"]}`}>
      <div className={`d-flex gx-0  justify-content-center ${classes.food}`}>
        <div className="col-6 pe-4">
          <img className={classes.image} src={food.image} alt={food.image} />
        </div>
        <div className="col-6">
          <div>
            <h1 className={classes.name}>{food.dishName.toUpperCase()}</h1>
            {/* <i className="fa fa-star text-warning"></i>
            <span style={{ color: "#999" }}>
              {food.starAmount} ({food.reviewAmount} reviews)
            </span>{" "} */}
            {/* |
            <span style={{ color: "#999" }}>
              {" "}
              <span style={{ fontWeight: "bolder" }}>
                Ordered {food.orderedAmount}
              </span>
            </span>
            //  */}

            <p className={classes.price}>{food.price}</p>
            <Button className={"food-review-button food-order-button"}>
              ORDER
            </Button>
            <div className={classes["food-mainInfo"]}>
              <div className={classes.ingredients}>
                <h3 className="fw-bold">
                  <img
                    className="d-inline me-2"
                    src="https://img.tastykitchen.vn/cates/2021/12/17/icon1-e753.svg"
                    alt="https://img.tastykitchen.vn/cates/2021/12/17/icon1-e753.svg"
                  />
                  Ingredients:
                </h3>
                <p>{food.ingredient}</p>
              </div>
              <div className={classes.portion}>
                <h3 className="fw-bold">
                  <img
                    className="d-inline me-2"
                    src="https://static.tastykitchen.vn/images/icon-food/icon2.svg"
                    alt="https://static.tastykitchen.vn/images/icon-food/icon2.svg"
                  />
                  Portion:
                </h3>
                <p>{food.portion}</p>
              </div>
              <div>
                <h3 className="fw-bold">
                  <img
                    className="d-inline me-2"
                    src="https://img.tastykitchen.vn/cates/2021/12/17/icon3-420b.svg"
                    alt="https://static.tastykitchen.vn/images/icon-food/icon2.svg"
                  />
                  Cooking time:
                </h3>
                <p>{food.cookingTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <h3 className="fw-bold">
          <img
            className="d-inline me-2"
            src="https://img.tastykitchen.vn/cates/2021/12/17/icon4-c817.svg"
            alt="https://img.tastykitchen.vn/cates/2021/12/17/icon4-c817.svg"
          />
          Description
        </h3>
        <p>{food.description}</p>
      </div>
    </div>
  );
}
