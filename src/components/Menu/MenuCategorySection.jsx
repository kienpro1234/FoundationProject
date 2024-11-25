import React, { useState } from "react";
import Button from "../UI/Button";
import classes from "./MenuCategorySection.module.css";
import { formatName, getRoleLS, transformCategoryNameToURL } from "../../utils/util";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DOMAIN } from "../../utils/const";
import { deleteFood } from "../../apis/foodApi";
import { toast } from "react-toastify";
import ModalOrdering from "../ModalOrdering/ModalOrdering";
import { fetchCategoryDetail } from "../../apis/category.api";

export default function MenuCategorySection({ category, catQueryData, catName }) {
  console.log("cat data", catQueryData);
  console.log("check data", category);
  const [idToDelete, setIdToDelete] = useState("");
  const queryClient = useQueryClient();

  //Có thể viết query này ở component cha, tránh mỗi category lại call api 1 lần
  const { data: mostPopularData } = useQuery({
    queryKey: ["menu", "most-popular"],
    queryFn: async ({ signal }) => {
      try {
        const res = await fetch(`${DOMAIN}dishes/category/most%20popular`, { signal });

        const result = await res.json();

        return result.data;
      } catch (err) {
        throw err;
      }
    },
  });

  console.log("data log xem ra gi", mostPopularData);

  // const URL = `${DOMAIN}dishes/category/${}`;
  let categoryNameURL = "";
  if (category) {
    categoryNameURL = transformCategoryNameToURL(`${category.categoryName}`);
    console.log("category ton tai", category);
  }
  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu", categoryNameURL],
    queryFn: () => fetchCategoryDetail(categoryNameURL),
    enabled: Boolean(category),
  });

  let finalCategoryData = [];
  if (categoryData) {
    finalCategoryData = categoryData.data.data;
  }

  if (catQueryData) {
    finalCategoryData = catQueryData;
  }

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

  const mostPopularArray = mostPopularData?.map((food) => food.dishName);

  return (
    <div className="menu-category">
      {category && finalCategoryData?.length > 0 && (
        <h3 className={classes.title}>
          {category && <span>{formatName(category?.categoryName.toUpperCase() || "")}</span>}
          {/* <span>{formatName(category?.categoryName.toUpperCase() || "") || catName}</span> */}
        </h3>
      )}
      {catName && <h3 className={classes.title}>{catName && <span>{catName}</span>}</h3>}

      <ul className={`row gx-4 px-3 ${classes.category}`}>
        {finalCategoryData?.map((food) => {
          return (
            <li className="col-md-3 col-6 mb-4 pe-2 md:!pe-3" key={food.dishId}>
              <div className={`${classes["menu-category-content"]} rounded-md p-2 shadow-1 md:!p-3`}>
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
                    <Link to={`/food/${food.dishId}`}>
                      <img
                        className={`${classes.image} transition hover:scale-110`}
                        src={food.image}
                        alt={food.dishName}
                      />
                    </Link>
                  </div>
                  <Link to={`/food/${food.dishId}`}>
                    <p className={`fw-bold ${classes.foodName}`}>{food.dishName}</p>
                  </Link>
                  <p className={classes.price}>${food.price}</p>
                </div>
                <div className={`${classes.footer} d-flex align-items-center justify-between`}>
                  <div className="food-review">
                    <div className="d-flex align-items-center gap-1">
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
                    {/* Tách component để xử lý state bên này, do có 2 component dùng modal này */}
                    <ModalOrdering
                      itemCart={food}
                      title={"Choose order detail"}
                      id={`CHOOSE_ORDER_DETAIL${food.dishId}`}
                      size={"sm"}
                      triggeredButton={<Button className="food-review-button">ORDER</Button>}
                    ></ModalOrdering>
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
                        onClick={() => handleClickDelete(food.dishId)}
                        className={`${classes["foodInfo-delelte-btn"]}`}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                      {idToDelete === food.dishId && (
                        <div className={`${classes["pop-up"]} shadow-lg`}>
                          <p className="mb-3 text-center">Are you sure to delete?</p>
                          <button
                            onClick={handleCancelDelete}
                            type="button"
                            className="mb-2 me-2 rounded-lg border-2 border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleConfirmDelete(food.dishId)}
                            type="button"
                            className="mb-2 me-2 rounded-lg border-2 border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
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
