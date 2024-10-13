import React, { useState } from "react";
import Button from "./ButtonUserInfo";
import classes from "./UserInformation.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

export default function UserInformation({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 830 });
  let content;
  if (isMobile) {
    content = (
      <>
        <div className="userInfo-content row gap-5 justify-content-center gx-0">
          <div className={`${classes["userinfo-content-update"]} col-md-12 `}>
            <div className={`${classes["avatar-right"]}`}>
              <img src={user.avatar} alt="" />
            </div>

            <h1
              className={`${classes["profile-picture-title"]} ${classes["contact-title"]}`}
            >
              {"Contact information"}
            </h1>
            <div className={`d-flex flex-col gap-3`}>
              <div className={`${classes["contact-info-title"]}`}>
                <h3>Phone number</h3>
                <p>432094</p>
              </div>
              <div className={`${classes["contact-info-title"]}`}>
                <h3>Facebook</h3>
                <p>432094</p>
              </div>
              <div className={`${classes["contact-info-title"]}`}>
                <h3>Instagram</h3>
                <p>432094</p>
              </div>
            </div>
          </div>
          <div className={`${classes["userinfo-content-info"]} col-md-12 `}>
            <h1 className={`${classes["profile-picture-title"]}`}>
              Personal Information
            </h1>
            <form
              className={`d-flex flex-col gap-3 ${classes["form-userInfo-left"]}`}
            >
              <div>
                <p>
                  <i className="fa fa-user"></i> <span>Name</span>
                </p>
                {/* Mở đóng edit dựa theo state của isEditing */}
                <input type="text" value={"John Doe"} />
              </div>
              <div>
                <p>
                  <i className="fa fa-envelope"></i> <span>Email</span>
                </p>
                {/* Mở đóng edit dựa theo state của isEditing */}
                <input type="email" value={"abc@gmail.com"} />
              </div>

              <div>
                <p>
                  <i className="fa fa-phone"></i> <span>Phone</span>
                </p>
                {/* Mở đóng edit dựa theo state của isEditing */}
                <input type="tel" value={"123123"} />
              </div>
              <div className="text-end">
                {/* <Button>Edit Information</Button> */}
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    content = <div className="userInfo-content row flex-nowrap gap-5 justify-content-center gx-0">
    <div className={`${classes["userinfo-content-info"]} col-md-7 `}>
      <h1 className={`${classes["profile-picture-title"]}`}>
        Personal Information
      </h1>
      <form
        className={`d-flex flex-col gap-3 ${classes["form-userInfo-left"]}`}
      >
        <div>
          <p>
            <i className="fa fa-user"></i> <span>Name</span>
          </p>
          {/* Mở đóng edit dựa theo state của isEditing */}
          <input type="text" value={"John Doe"} />
        </div>
        <div>
          <p>
            <i className="fa fa-envelope"></i> <span>Email</span>
          </p>
          {/* Mở đóng edit dựa theo state của isEditing */}
          <input type="email" value={"abc@gmail.com"} />
        </div>

        <div>
          <p>
            <i className="fa fa-phone"></i> <span>Phone</span>
          </p>
          {/* Mở đóng edit dựa theo state của isEditing */}
          <input type="tel" value={"123123"} />
        </div>
        <div className="text-end">
          {/* <Button>Edit Information</Button> */}
        </div>
      </form>
    </div>

    <div className={`${classes["userinfo-content-update"]} col-md-5 `}>
      <div className={`${classes["avatar-right"]}`}>
        <img src={user.avatar} alt="" />
      </div>

      <h1
        className={`${classes["profile-picture-title"]} ${classes["contact-title"]}`}
      >
        {"Contact information"}
      </h1>
      <div className={`d-flex flex-col gap-3`}>
        <div className={`${classes["contact-info-title"]}`}>
          <h3>Phone number</h3>
          <p>432094</p>
        </div>
        <div className={`${classes["contact-info-title"]}`}>
          <h3>Facebook</h3>
          <p>432094</p>
        </div>
        <div className={`${classes["contact-info-title"]}`}>
          <h3>Instagram</h3>
          <p>432094</p>
        </div>
      </div>
    </div>
  </div>
  }
  return (
    <>
      <div className="userInformation">
        {content}
      </div>
    </>
  );
}


