import React, { useState } from "react";
import Button from "./ButtonUserInfo";
import classes from "./UserInformation.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { isEmail, isPhoneNumber } from "../../utils/util";

export default function UserInformation({ user }) {
  console.log("user", user);
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 830 });
  let content;
  if (isMobile) {
    content = (
      <>
        <div className="userInfo-content row justify-content-center gx-0 gap-5">
          <div className={`${classes["userinfo-content-update"]} col-md-12`}>
            <div className={`${classes["avatar-right"]}`}>
              <img
                src={
                  "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/431240968_431190712682006_1668401436782837892_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Q_Xk-HlaJaUQ7kNvgEe2G5e&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AFfXrKsIi48of07fUdasUbc&oh=00_AYBc4VrX1skg2JbkYoIa9Uu0WE19G_GERlEff6h1FwsrDA&oe=673BBC64"
                }
                alt=""
              />
            </div>

            <h1 className={`${classes["profile-picture-title"]} ${classes["contact-title"]}`}>
              {"Contact information"}
            </h1>
            <div className={`d-flex flex-col gap-3`}>
              <div className={`${classes["contact-info-title"]}`}>
                <h3>Name</h3>
                <p>{user.firstName}</p>
              </div>
              <div className={`${classes["contact-info-title"]}`}>
                <h3>Facebook</h3>
                <p>123213</p>
              </div>
              <div className={`${classes["contact-info-title"]}`}>
                <h3>Instagram</h3>
                <p>123123123</p>
              </div>
            </div>
          </div>
          <div className={`${classes["userinfo-content-info"]} col-md-12`}>
            <h1 className={`${classes["profile-picture-title"]}`}>Personal Information</h1>
            <form className={`d-flex flex-col gap-3 ${classes["form-userInfo-left"]}`}>
              <div>
                <p>
                  <i className="fa fa-user"></i> <span>Name</span>
                </p>
                {/* Mở đóng edit dựa theo state của isEditing */}
                <input type="text" value={`${user.firstName}`} />
              </div>
              <div>
                <p>
                  <i className="fa fa-envelope"></i> <span>Email</span>
                </p>
                {/* Mở đóng edit dựa theo state của isEditing */}
                <input type="email" value={`${isEmail(user.emailOrPhone) ? user.emailOrPhone : ""}`} />
              </div>

              <div>
                <p>
                  <i className="fa fa-phone"></i> <span>PhoneNumber</span>
                </p>
                {/* Mở đóng edit dựa theo state của isEditing */}
                <input type="tel" value={`${isPhoneNumber(user.emailOrPhone) ? user.emailOrPhone : ""}`} />
              </div>
              <div className="text-end">{/* <Button>Edit Information</Button> */}</div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    content = (
      <div className="userInfo-content row justify-content-center gx-0 flex-nowrap gap-5">
        <div className={`${classes["userinfo-content-info"]} col-md-7`}>
          <h1 className={`${classes["profile-picture-title"]}`}>Personal Information</h1>
          <form className={`d-flex flex-col gap-3 ${classes["form-userInfo-left"]}`}>
            <div>
              <p>
                <i className="fa fa-user"></i> <span>Name</span>
              </p>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input type="text" value={`${user.firstName}`} />
            </div>
            <div>
              <p>
                <i className="fa fa-envelope"></i> <span>Email</span>
              </p>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input type="email" value={`${isEmail(user.emailOrPhone) ? user.emailOrPhone : ""}`} />
            </div>

            <div>
              <p>
                <i className="fa fa-phone"></i> <span>Phone</span>
              </p>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input type="tel" value={`${isPhoneNumber(user.emailOrPhone) ? user.emailOrPhone : ""}`} />
            </div>
            <div className="text-end">{/* <Button>Edit Information</Button> */}</div>
          </form>
        </div>

        <div className={`${classes["userinfo-content-update"]} col-md-5`}>
          <div className={`${classes["avatar-right"]}`}>
            <img src={user.imageUrl} alt="" />
          </div>

          <h1 className={`${classes["profile-picture-title"]} ${classes["contact-title"]}`}>{"Contact information"}</h1>
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
    );
  }
  return (
    <>
      <div className="userInformation">{content}</div>
    </>
  );
}
