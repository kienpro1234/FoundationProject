import React, { useState } from "react";
import classes from "./Register.module.css";
import Input from "../../components/UI/Input";
import ButtonLogin from "../../components/UI/ButtonLogin";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function Register() {
  const [eyeOpen, setEyeOpen] = useState(true);
  const [userData, setUserData] = useState({
    surname: "",
    fullname: "",
    account: "",
    password: "",
    confirmedPassword: "",
  });

  const [dataError, setDataError] = useState({
    surname: "",
    fullname: "",
    account: "",
    password: "",
    confirmedPassword: "",
  });

  const validateName = (name, value) => {
    const nameRegex =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểễếỄỆỉỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]+$/;
    if (value === "") {
      if (name === "surname") {
        setDataError({
          ...dataError,
          [name]: "Surname must not be left blank",
        });
      } else {
        setDataError({
          ...dataError,
          [name]: "Surname must not be left blank",
        });
      }
    }
    if (!nameRegex.test(value)) {
      if (name === "surname") {
        setDataError({
          ...dataError,
          surname: "Name is not valid",
        });
      } else {
        setDataError({
          ...dataError,
          fullname: "Name is not valid",
        });
      }
    } else {
      setDataError({
        ...dataError,
        [name]: "",
      });
    }
  };

  const validateAccount = (name, value) => {
    const accRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^[0-9]+$/;
    if (value === "") {
      setDataError({
        ...dataError,
        [name]: "Account must not be left blank",
      });
    }
    if (!accRegex.test(value)) {
      setDataError({
        ...dataError,
        [name]: "Account is not valid",
      });
    } else {
      setDataError({
        ...dataError,
        [name]: "",
      });
    }
  };

  const validatePassword = (name, value) => {
    if (value === "") {
      setDataError({
        ...dataError,
        [name]: "Password must not be left blank",
      });
    } else {
      setDataError({
        ...dataError,
        [name]: "",
      });
    }
  };

  const validateConfirmedPassword = (name, value) => {
    if (value !== userData.password) {
      setDataError((prevDataError) => {
        return {
          ...prevDataError,
          [name]: "Confirmed password must be the same as password",
        };
      });
    } else {
      setDataError({
        ...dataError,
        [name]: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    if (name === "surname" || name === "fullname") validateName(name, value);
    if (name === "account") validateAccount(name, value);
    if (name === "password") validatePassword(name, value);
    if (name === "confirmedPassword") validateConfirmedPassword(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    for (const key in dataError) {
      if (dataError[key]) {
        isValid = false;
        return;
      }
    }
    if (!isValid) return;

    //Gửi đi userData ở đây, Gửi xong nhớ delete form , cùng thông tin trong state ở form, khi gửi thành công xuống BE thì mới xóa form
    // const {data, isLoading, isError, error} = useQuery({
    //   queryKey: ["register"],
    //   queryFn: async({signal}) => {
    //     fetch(url, {
    //       signal,
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(userData),
    //     })
    //   }
    // })

    //xóa form, nếu error thì không xóa form
    // setUserData({
    //   surname: "",
    //   fullname: "",
    //   account: "",
    //   password: "",
    //   confirmedPassword: "",
    // });
  };
  return (
    <div className={`${classes.loginContainer} `}>
      <form
        className={`${classes.loginForm} rounded-md `}
        onSubmit={handleSubmit}
      >
        <h2 className={`heading-login`}>Đăng Kí</h2>
        <p className={`mt-2 mb-3`}>Đăng kí bằng email hoặc số điện thoại</p>

        {/* input */}
        <div className="mb-[12px]">
          <Input
            className={"w-full"}
            placeholder={"Họ của bạn"}
            name="surname"
            onChange={handleChange}
            value={userData.surname}
          />
          <div className={`${classes.error}`}>{dataError.surname}</div>
        </div>
        <div className="mb-[12px]">
          <Input
            className={"w-full"}
            placeholder={"Tên của bạn"}
            name="fullname"
            onChange={handleChange}
            value={userData.fullname}
          />
          <div className={`${classes.error} `}>{dataError.fullname}</div>
        </div>
        <div className="mb-[12px]">
          <Input
            className={"w-full"}
            placeholder={"Email hoặc số điện thoại"}
            name="account"
            onChange={handleChange}
            value={userData.account}
          />
          <div className={`${classes.error} `}>{dataError.account}</div>
        </div>
        <div className={`${classes["input-password"]}`}>
          <Input
            type={eyeOpen ? "password" : "text"}
            className={"w-full"}
            placeholder={"Mật khẩu"}
            name="password"
            onChange={handleChange}
            value={userData.password}
          />

          <button
            type="button"
            onClick={() => {
              setEyeOpen((prevEyeOpen) => !prevEyeOpen);
            }}
          >
            {eyeOpen ? (
              <i className="fa fa-eye text-gray-400"></i>
            ) : (
              <i className="fa fa-eye-slash text-gray-400"></i>
            )}
          </button>
        </div>
        <div className={`${classes.error} mb-[12px]`}>{dataError.password}</div>
        <div className="">
          <Input
            type={"password"}
            className={"w-full"}
            placeholder={"Nhập lại mật khẩu"}
            name="confirmedPassword"
            onChange={handleChange}
            value={userData.confirmedPassword}
          />
        </div>
        <div className={`${classes.error} `}>{dataError.confirmedPassword}</div>
        {/* Nhớ tài khoản , quên mk */}
        <div className="flex justify-between items-baseline">
          <div className="mt-3 flex items-baseline gap-2">
            <input
              id="login-input"
              type="checkbox"
              className="accent-emerald-500 basis-[10%]"
              name="agreeTerm"
            />
            <label className="text-sm" htmlFor="login-input">
              Tôi đồng ý với{" "}
              <span className="text-red-500">
                điều kiện & điều khoản sử dụng thông tin của tasty chicken
              </span>
            </label>
          </div>
        </div>
        <div>
          <ButtonLogin className={"w-full 2xl:mt-3 2xl:mb-3 mt-2 mb-2"}>
            ĐĂNG NHẬP
          </ButtonLogin>
        </div>
        <div className="text-sm">
          <span>
            <span className="mr-2">Bạn đã có tài khoản?</span>
            <Link
              to={"/login"}
              className="text-red-500 hover:text-red-700"
              href="#"
            >
              Đăng nhập ngay
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
