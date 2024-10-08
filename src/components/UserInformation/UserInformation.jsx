import React, { useState } from "react";
import Button from "./ButtonUserInfo";
import classes from "./UserInformation.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function UserInformation() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="userInformation">
      <h1 className={`${classes["user-title"]} text-center mb-5 fw-bold`}>
        USER INFORMATION
      </h1>
      <div className="userInfo-content row flex-nowrap gap-5 justify-content-center">
        <div className={`${classes["userinfo-content-info"]} col-6`}>
          <h1 className={`mb-2 ${classes["profile-picture-title"]}`}>
            {"Personal Information".toUpperCase()}
          </h1>
          <div
            className={`${classes["profile-picture"]} row align-items-center`}
          >
            <div className={`col-3 ${classes["profile-picure-left"]} mb-3`}>
              <p className="mb-2">Profile picture</p>
              <img
                src="https://play-lh.googleusercontent.com/LeX880ebGwSM8Ai_zukSE83vLsyUEUePcPVsMJr2p8H3TUYwNg-2J_dVMdaVhfv1cHg=w480-h960-rw"
                alt=""
              />
            </div>
            <div className={`col-9 ${classes["profile-picure-right"]}`}>
              <Button>
                <i className="fa fa-download"></i> Upload New Picture
              </Button>
            </div>
          </div>
          <form>
            <div>
              <p>
                <i className="fa fa-user"></i> Name
              </p>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input type="text" value={"John Doe"} />
            </div>
            <div>
              <p>
                <i className="fa fa-envelope"></i> Email
              </p>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input type="email" value={"abc@gmail.com"} />
            </div>

            <div>
              <p>
                <i className="fa fa-phone"></i> Phone
              </p>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input type="tel" value={"123123"} />
            </div>
            <div className="text-end">
              <Button>Edit Information</Button>
            </div>
          </form>
        </div>
        <div className={`${classes["userinfo-content-update"]} col-6`}>
          <h1 className={`mb-2 ${classes["profile-picture-title"]}`}>
            {"Change Password".toUpperCase()}
          </h1>
          <form>
            <div>
              <label htmlFor="newPassword" className="d-block">
                <i className="fa fa-lock me-2"></i>
                New Password
              </label>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <div className={classes.passwordInput}>
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                />
                <button
                  onClick={() => {
                    setShowPassword((prevShowPassword) => !prevShowPassword);
                  }}
                  className={classes["toggleEye-button"]}
                  type="button"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="d-block">
                <i className="fa fa-lock me-2"></i>
                Confirm Password
              </label>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
            </div>

            <div className="text-end">
              <Button className="changeP-button">Update Password</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
