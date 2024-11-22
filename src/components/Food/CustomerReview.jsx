import React, { useState } from "react";
import classes from "./CustomerReview.module.css";
import { NavLink } from "react-router-dom";
export default function CustomerReview() {
  const [activeButton, setActiveButton] = useState(null);
  const buttonLabels = ["All", "5 stars", "4 stars", "3 stars", "2 stars", "1 star"];

  //Ví dụ của kind 5 stars
  const dummyDataFeedback = {
    id: 0,
    name: "all",
    reviews: [
      {
        id: 123,
        reviewer: "Kiendeptrai",
        avatar:
          "https://duet-cdn.vox-cdn.com/thumbor/0x0:2370x1574/828x552/filters:focal(1185x787:1186x788):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/20103707/Screen_Shot_2020_07_21_at_9.38.25_AM.png",
        date: "10 / 7 / 2024",
        15: 31,
        stars: 4,
        comment: "Very delicious",
        replies: [
          {
            id: 456,
            replier: "MeoMeo",
            comment: "Thank for your comment",
          },
        ],
      },
    ],
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
    //Lấy index hoặc id hoặc tên của kind(5 stars chẳng hạn) , sau đó gửi api đến server lấy về data review thuộc kind này, lưu vào state để render ra giao diện, hoặc thử lưu vào biến data nào đó rồi render ra giao diện được không ?, vì state hiện tại đã có activeButton re-render lại giúp mình rồi
  };

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
      <div className={`${classes["customerRv-feedback"]} `}>
        <ul>
          {dummyDataFeedback.reviews.map((feedback, index) => (
            <li className="row" key={index}>
              <div className={`${classes.avatar} col-md-1 col-2`}>
                <img src={feedback.avatar} alt={feedback.avatar} />
              </div>
              <div className={`col-md-11 col-10 ${classes["feedback-content"]}`}>
                <h3>{feedback.reviewer}</h3>
                <p>{feedback.date}</p>
                <span className="star">
                  {Array.from({ length: feedback.stars }).map((_, index) => (
                    <i key={index} className="fa fa-star"></i>
                  ))}
                </span>
                <p>{feedback.comment}</p>
                <div className={`${classes["feedback-replies"]}`}>
                  {feedback.replies.map((reply) => (
                    <div key={reply.id} className={`${classes.reply}`}>
                      <h3 className={`${classes.replier}`}>{reply.replier}</h3>
                      <p>{reply.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
