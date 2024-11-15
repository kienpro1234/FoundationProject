import React, { useState } from "react";
import Button from "../UI/Button";
import classes from "./MenuCategorySection.module.css";
import { formatName, getRoleLS } from "../../utils/util";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DOMAIN } from "../../utils/const";
import { deleteFood } from "../../apis/foodApi";
import { toast } from "react-toastify";
import LoadingIndicator from "../UI/LoadingIndicator";
import FoodItem from "../FoodItem/FoodItem";

export default function MenuCategorySection({ category }) {
  console.log("check data", category);
  const [idToDelete, setIdToDelete] = useState("");
  const queryClient = useQueryClient();
  console.log("category list", category.dishes);

  //Có thể viết query này ở component cha, tránh mỗi category lại call api 1 lần
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
  console.log("idtoDelte", idToDelete);

  const deleteMutation = useMutation({
    mutationFn: deleteFood,
    onSuccess: () => {
      toast.success("Xóa thành công");

      queryClient.invalidateQueries(["menu"]);
    },
    onError: (err) => {
      console.error("Xóa thất bại", err);
      toast.error("Xóa thất bại");
    },
  });

  const handleClickDelete = (id) => {
    setIdToDelete(id);
  };

  const handleCancelDelete = () => {
    setIdToDelete("");
  };

  const handleConfirmDelete = (id) => {
    console.log("id xoa", id);
    deleteMutation.mutate(id);
    setIdToDelete("");
  };

  const mostPopularArray = data?.dishes.map((food) => food.dishName);

  return (
    <div className="menu-category">
      <h3 className={classes.title}>
        <span>{formatName(category.categoryName.toUpperCase())}</span>
      </h3>
      <ul className={`row gx-4 px-3 ${classes.category}`}>
        {category?.dishes?.map((food) => {
          return (
            <li className="col-md-3 col-6 pe-2 md:!pe-3 mb-4 " key={food.id}>
              <div className={`${classes["menu-category-content"]} shadow-1 p-2 md:!p-3 rounded-md`}>
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

                  <div className="overflow-hidden">
                    <Link to={`/food/${food.id}`}>
                      <img
                        className={`${classes.image} hover:scale-110 transition`}
                        src={food.image}
                        alt={food.dishName}
                      />
                    </Link>
                  </div>
                  <Link to={`/food/${food.id}`}>
                    <p className={`fw-bold ${classes.foodName}`}>{food.dishName}</p>
                  </Link>
                  <p className={classes.price}>${food.price}</p>
                </div>
                <div className={`${classes.footer} d-flex align-items-center justify-between`}>
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
                <button className={`${classes["foodInfo-fav-btn"]}`}>
                  <i className="fa-regular fa-heart"></i>
                </button>

                {getRoleLS() === "admin" && (
                  <>
                    <button className={`${classes["foodInfo-edit-btn"]}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <div>
                      <button
                        onClick={() => handleClickDelete(food.id)}
                        className={`${classes["foodInfo-delelte-btn"]}`}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                      {idToDelete === food.id && (
                        <div className={`${classes["pop-up"]} shadow-lg`}>
                          <p className="text-center mb-3">Are you sure to delete?</p>
                          <button
                            onClick={handleCancelDelete}
                            type="button"
                            className="text-red-700 hover:text-white border-2 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleConfirmDelete(food.id)}
                            type="button"
                            className="text-blue-700 hover:text-white border-2 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                          >
                            Yes
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </li>
            // <FoodItem
            //   food={food}
            //   handleCancelDelete={handleCancelDelete}
            //   handleClickDelete={handleClickDelete}
            //   handleConfirmDelete={handleConfirmDelete}
            //   mostPopularArray={mostPopularArray}
            //   showPopUp={showPopUp}
            //   deleteMutation={deleteMutation}
            // />
          );
        })}
      </ul>
    </div>
  );
}
