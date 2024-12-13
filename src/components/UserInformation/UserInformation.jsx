import React, { Fragment, useContext, useEffect, useState } from "react";
import Button from "./ButtonUserInfo";
import classes from "./UserInformation.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { isEmail, isPhoneNumber } from "../../utils/util";
import userGreetingClasses from "./Greeting.module.css";
import { UserContext } from "../../context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../apis/user.api";
import { toast } from "react-toastify";
import LoadingIndicator from "../UI/LoadingIndicator";
import { createPortal } from "react-dom";
import { CartContext } from "../../context/cartContext";

const DEFAULT_DOB = "1999-12-24";

export default function UserInformation({ user }) {
  console.log("user", user);
  const { isEditing, setIsEditing } = useContext(UserContext);
  const { userId } = useContext(CartContext);
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Trạng thái lưu giá trị ngày
  const [gender, setGender] = useState(""); // Trạng thái lưu giá trị giới tính
  const queryClient = useQueryClient();

  console.log("data", {
    userName,
    selectedDate,
    gender,
  });

  useEffect(() => {
    if (user) {
      setUserName(user?.firstName);
      setGender(user?.gender || "Male");
      setSelectedDate(user?.dob || DEFAULT_DOB);
    }
  }, [user]);

  console.log("selectedDate", selectedDate);

  const newDate = new Date(selectedDate || DEFAULT_DOB);

  console.log("newDate", newDate.getFullYear());

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success("Update thành công");
      console.log("data", data);
      queryClient.invalidateQueries(["userinfo"]);
      setIsEditing(false);
    },
    onError: (err) => {
      toast.error("Update thất bại");
      console.error("loi roi", err);
    },
  });

  // Hàm xử lý khi người dùng chọn ngày
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Xử lý thay đổi giới tính
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  // Hàm submit
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    if (!userName || !selectedDate || !gender) {
      valid = false;
    }

    if (!valid) {
      toast.error("Vui lòng không bỏ trống thông tin nào");
      return;
    }

    updateUserMutation.mutate({
      data: {
        firstName: userName,
        lastName: user.lastName,
        imageUrl: "https://i.pinimg.com/736x/6d/cd/bc/6dcdbc44d66d6931b21506b2677dcf1b.jpg",
        emailOrPhone: user.emailOrPhone,
        address: user.address,
        gender: gender,
        dob: selectedDate,
      },
      userId,
    });

    // Gửi dữ liệu lên server
  };

  // mutation cho cho update profile

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChangeName = (e) => {
    setUserName(e.target.value);
  };

  const isMobile = useMediaQuery({ maxWidth: 830 });
  let content;
  if (isMobile) {
    content = (
      <>
        <div className="userInfo-content row justify-content-center gx-0 gap-5">
          {updateUserMutation.isPending &&
            createPortal(
              <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70">
                <LoadingIndicator />
              </div>,
              document.querySelector("#root"),
            )}
          <div className={`${classes["userinfo-content-update"]} col-md-12`}>
            <div className={`${classes["avatar-right"]}`}>
              <img src={user.imageUrl} alt="" />
            </div>
            {/* sua den day */}

            <h1 className={`${classes["profile-picture-title"]} ${classes["contact-title"]}`}>
              {"Contact information"}
            </h1>
            <div className={`d-flex flex-col gap-3`}>
              <div className={`${classes["contact-info-title"]}`}>
                {isEditing ? (
                  <Fragment>
                    <label htmlFor="date" className="block text-lg font-medium text-gray-700">
                      Chọn ngày:
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <h3 className="mb-2">Date of birth</h3>
                    <p>{`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`}</p>
                  </Fragment>
                )}
                {/* <h3>Name</h3>
                <p>{user.firstName}</p>
              </div>
              <div className={`${classes["contact-info-title"]}`}>
                <h3>DOB</h3>
                <p>123213</p>
              </div>
              <div className={`${classes["contact-info-title"]}`}>
                <h3>Gender</h3>
                <p>123123123</p> */}
              </div>
              <div className={`${classes["contact-info-title"]}`}>
                {isEditing ? (
                  <Fragment>
                    {/* Input Gender */}
                    {/* Input chọn giới tính */}
                    <div>
                      <span className="block text-lg font-medium text-gray-700">Giới tính:</span>
                      <div className="mt-2 flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={handleGenderChange}
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span>Nam</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={handleGenderChange}
                            className="form-radio h-4 w-4 text-pink-600"
                          />
                          <span>Nữ</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={gender === "Other"}
                            onChange={handleGenderChange}
                            className="form-radio h-4 w-4 text-gray-600"
                          />
                          <span>Khác</span>
                        </label>
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h3 className="mb-2">Gender</h3>
                    <p>{gender}</p>
                  </Fragment>
                )}
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
                <input disabled={!isEditing} type="text" value={`${userName}`} onChange={handleChangeName} />
              </div>
              <div>
                <p>
                  <i className="fa fa-envelope"></i> <span>Contact</span>
                </p>
                {/* Mở đóng edit dựa theo state của isEditing */}
                <input disabled={true} type="email" value={`${isEmail(user.emailOrPhone) ? user.emailOrPhone : ""}`} />
              </div>

              {/* <div>
                <p>
                  <i className="fa fa-phone"></i> <span>PhoneNumber</span>
                </p> */}
              {/* Mở đóng edit dựa theo state của isEditing */}
              {/* <input type="tel" value={`${isPhoneNumber(user.emailOrPhone) ? user.emailOrPhone : ""}`} />
              </div> */}
              {isEditing && (
                <div className="flex justify-end gap-3">
                  <div className="text-end">
                    <button
                      onClick={handleCancelEdit}
                      className={`${userGreetingClasses.editBtnUserInfo} bg-red-600 hover:bg-red-700`}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="text-end">
                    <button onClick={handleSubmit} className={userGreetingClasses.editBtnUserInfo}>
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </>
    );
  } else {
    content = (
      <div className="userInfo-content row justify-content-center gx-0 flex-nowrap gap-5">
        {updateUserMutation.isPending &&
          createPortal(
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70">
              <LoadingIndicator />
            </div>,
            document.querySelector("#root"),
          )}
        <div className={`${classes["userinfo-content-info"]} col-md-7`}>
          <h1 className={`${classes["profile-picture-title"]}`}>Personal Information</h1>
          <form className={`d-flex flex-col gap-3 ${classes["form-userInfo-left"]}`}>
            <div>
              <p>
                <i className="fa fa-user"></i> <span>Name</span>
              </p>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input disabled={!isEditing} type="text" value={`${userName}`} onChange={handleChangeName} />
            </div>
            <div>
              <p>
                <i className="fa fa-envelope"></i> <span>Contact</span>
              </p>
              {/* Mở đóng edit dựa theo state của isEditing */}
              <input disabled={true} type="email" value={`${isEmail(user.emailOrPhone) ? user.emailOrPhone : ""}`} />
            </div>

            {/* <div> */}
            {/* <p>
                <i className="fa fa-phone"></i> <span>Phone</span>
              </p> */}
            {/* Mở đóng edit dựa theo state của isEditing */}
            {/* <input
                disabled={!isEditing}
                type="tel"
                value={`${isPhoneNumber(user.emailOrPhone) ? user.emailOrPhone : ""}`}
              /> */}
            {/* </div> */}
            {isEditing && (
              <div className="flex justify-end gap-3">
                <div className="text-end">
                  <button
                    onClick={handleCancelEdit}
                    className={`${userGreetingClasses.editBtnUserInfo} bg-red-600 hover:bg-red-700`}
                  >
                    Cancel
                  </button>
                </div>
                <div className="text-end">
                  <button onClick={handleSubmit} className={userGreetingClasses.editBtnUserInfo}>
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className={`${classes["userinfo-content-update"]} col-md-5`}>
          <div className={`${classes["avatar-right"]}`}>
            <img src={user.imageUrl} alt="" />
          </div>

          <h1 className={`${classes["profile-picture-title"]} ${classes["contact-title"]}`}>{"Contact information"}</h1>
          <div className={`d-flex flex-col gap-2`}>
            <div className={`${classes["contact-info-title"]}`}>
              {isEditing ? (
                <Fragment>
                  <label htmlFor="date" className="block text-lg font-medium text-gray-700">
                    Chọn ngày:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <h3 className="mb-2">Date of birth</h3>
                  <p>{`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`}</p>
                </Fragment>
              )}
            </div>
            <div className={`${classes["contact-info-title"]}`}>
              {isEditing ? (
                <Fragment>
                  {/* Input Gender */}
                  {/* Input chọn giới tính */}
                  <div>
                    <span className="block text-lg font-medium text-gray-700">Giới tính:</span>
                    <div className="mt-2 flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={gender === "Male"}
                          onChange={handleGenderChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span>Nam</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={gender === "Female"}
                          onChange={handleGenderChange}
                          className="form-radio h-4 w-4 text-pink-600"
                        />
                        <span>Nữ</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Other"
                          checked={gender === "Other"}
                          onChange={handleGenderChange}
                          className="form-radio h-4 w-4 text-gray-600"
                        />
                        <span>Khác</span>
                      </label>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <h3 className="mb-2">Gender</h3>
                  <p>{gender}</p>
                </Fragment>
              )}
            </div>
            {/* <div className={`${classes["contact-info-title"]}`}>
              <h3 className="mb-2">Instagram</h3>
              <p>432094</p>
            </div> */}
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
