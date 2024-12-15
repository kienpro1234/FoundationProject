import React, { Fragment, useEffect, useState } from "react";
import classes from "./CustomerReview.module.css";
import { createSearchParams, NavLink, useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllDishRanking, fetchDishRanking } from "../../apis/raking.api";
import Pagination from "../Pagination/Pagination";
import useQueryParams from "../../hooks/useQueryParams";
import LoadingIndicator from "../UI/LoadingIndicator";
import omit from "lodash/omit";
export default function CustomerReview({ dishId }) {
  const [activeButton, setActiveButton] = useState(null);
  const buttonLabels = ["All", "5 stars", "4 stars", "3 stars", "2 stars", "1 star"];
  console.log("dishId", dishId);

  const queryParams = useQueryParams();
  const navigate = useNavigate();

  const rankingQuery = useQuery({
    queryKey: ["commentList", { dishId, queryParams }],
    queryFn: () => fetchDishRanking(dishId, queryParams),
    enabled: !!queryParams?.rankingStars,
  });

  const rankingFetchAllQuery = useQuery({
    queryKey: ["commentList", queryParams],
    queryFn: () => fetchAllDishRanking(dishId, queryParams),
  });

  useEffect(() => {
    if (queryParams?.rankingStars) {
      setActiveButton(6 - queryParams.rankingStars);
    } else {
      setActiveButton(0);
    }
  }, [queryParams?.rankingStars]);

  console.log("rankingQuery data", rankingQuery.data);
  let commentList = [];
  let totalPage = 0;
  if (rankingFetchAllQuery.data && !queryParams.rankingStars) {
    commentList = rankingFetchAllQuery.data.data.data.pageContent;
    totalPage = rankingFetchAllQuery.data.data.data.totalPages;
    console.log("totalpage", rankingFetchAllQuery.data.data.data.totalPages);
  }

  if (rankingQuery.data && queryParams.rankingStars) {
    commentList = rankingQuery.data.data.data.pageContent;
    totalPage = rankingQuery.data.data.data.totalPages;
    console.log("total page", rankingQuery.data.data.data.totalPages);
  }

  const handleButtonClick = (index) => {
    setActiveButton(index);
    // Lấy index hoặc id hoặc tên của kind(5 stars chẳng hạn) , sau đó gửi api đến server lấy về data review thuộc kind này, lưu vào state để render ra giao diện, hoặc thử lưu vào biến data nào đó rồi render ra giao diện được không ?, vì state hiện tại đã có activeButton re-render lại giúp mình rồi
    if (index === 0) {
      navigate(`/food/${dishId}`);
    } else {
      navigate({
        pathname: `/food/${dishId}`,
        search: createSearchParams(
          omit(
            {
              ...queryParams,
              rankingStars: Number(6 - index),
            },
            ["pageNo"],
          ),
        ).toString(),
      });
    }
  };

  const currentPath = `/food/${dishId}`;

  console.log(activeButton);
  return (
    <div className={`${classes.customerReview}`}>
      <h1 className={`${classes["cr-title"]}`}>CUSTOMER REVIEWS</h1>
      <div className={`${classes["customerReview-container"]}`}>
        <div className={`${["customerReview-content"]} row p-md-5 ps-md-2 align-items-center`}>
          <div className={`col-md-3 col-12 ${classes["content-item"]} text-md-center pe-0`}>
            <p className={`${classes["rv-number"]}`}>
              <span>5.0</span>
              <span> / 5</span>
            </p>
            <p className="star">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </p>
            <p className="rv-vote">Base on 1 reviews</p>
          </div>
          <div
            className={`col-md col-12 ${classes["content-item"]} ${classes["content-item-2"]} rv-rating-chart px-md-3`}
          >
            <div className={`${classes["rv-rating-row"]}`}>
              <span className={`${classes["rv-rating-star"]}`}>
                5<span>★</span>
              </span>
              <div className={`${classes["rv-progress-bar"]}`}>
                <div
                  className={`${classes["rv-progress"]}`}
                  //   style={{ width: percent ? `${percent}%` : "0" }}
                  style={{ width: "100%" }}
                ></div>
              </div>
              <span className={`${classes["percent"]}`}>100%</span>
            </div>
            <div className={`${classes["rv-rating-row"]}`}>
              <span className={`${classes["rv-rating-star"]}`}>
                5<span>★</span>
              </span>
              <div className={`${classes["rv-progress-bar"]}`}>
                <div
                  className={`${classes["rv-progress"]}`}
                  //   style={{ width: percent ? `${percent}%` : "0" }}
                  style={{ width: "100%" }}
                ></div>
              </div>
              <span className={`${classes["percent"]}`}>100%</span>
            </div>
            <div className={`${classes["rv-rating-row"]}`}>
              <span className={`${classes["rv-rating-star"]}`}>
                5<span>★</span>
              </span>
              <div className={`${classes["rv-progress-bar"]}`}>
                <div
                  className={`${classes["rv-progress"]}`}
                  //   style={{ width: percent ? `${percent}%` : "0" }}
                  style={{ width: "100%" }}
                ></div>
              </div>
              <span className={`${classes["percent"]}`}>100%</span>
            </div>
            <div className={`${classes["rv-rating-row"]}`}>
              <span className={`${classes["rv-rating-star"]}`}>
                5<span>★</span>
              </span>
              <div className={`${classes["rv-progress-bar"]}`}>
                <div
                  className={`${classes["rv-progress"]}`}
                  //   style={{ width: percent ? `${percent}%` : "0" }}
                  style={{ width: "100%" }}
                ></div>
              </div>
              <span className={`${classes["percent"]}`}>100%</span>
            </div>
            <div className={`${classes["rv-rating-row"]}`}>
              <span className={`${classes["rv-rating-star"]}`}>
                5<span>★</span>
              </span>
              <div className={`${classes["rv-progress-bar"]}`}>
                <div
                  className={`${classes["rv-progress"]}`}
                  //   style={{ width: percent ? `${percent}%` : "0" }}
                  style={{ width: "100%" }}
                ></div>
              </div>
              <span className={`${classes["percent"]}`}>100%</span>
            </div>
          </div>
          <div className={`col-md col-12 ${classes["content-item-last"]}`}>
            <p className="mb-md-0 mb-3">Filter by</p>
            <div className={classes.kind}>
              {buttonLabels.map((buttonLabel, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className={`${activeButton === index ? classes.active : ""}`}
                >
                  {buttonLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {rankingQuery.isLoading || rankingFetchAllQuery.isLoading ? (
        <LoadingIndicator />
      ) : (
        <Fragment>
          <div className={`${classes["customerRv-feedback"]}`}>
            <ul className="flex-column flex gap-3">
              {commentList.map((feedback, index) => (
                <li className="row border-bottom pb-3 last:!border-b-0" key={feedback.rankingId}>
                  <div className={`${classes.avatar} col-md-1 col-2`}>
                    <img
                      src={feedback.user.imageUrl || "default-avatar-url.jpg"}
                      alt={`${feedback.user.firstName} ${feedback.user.lastName}`}
                    />
                  </div>
                  <div className={`col-md-11 col-10 ${classes["feedback-content"]}`}>
                    <h3>{`${feedback.user.firstName} ${feedback.user.lastName}`}</h3>
                    <span className="star my-1 inline-block">
                      {Array.from({ length: feedback.rankingStars }).map((_, index) => (
                        <i key={index} className="fa fa-star"></i>
                      ))}
                    </span>
                    <p>{feedback.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Pagination totalPages={totalPage} queryParams={queryParams} pathname={currentPath} />
        </Fragment>
      )}

      {/* <UserOrderList orderList={orderList} loadingOrderList={orderListQuery.isFetching} /> */}
    </div>
  );
}
