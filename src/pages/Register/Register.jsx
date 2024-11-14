import React, { useState } from "react";
import classes from "./Register.module.css";
import Input from "../../components/UI/Input";
import ButtonLogin from "../../components/UI/ButtonLogin";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DOMAIN } from "../../utils/const";
import { http } from "../../utils/http";
import { isEmail, isPhoneNumber } from "../../utils/util";
import { toast } from "react-toastify";

export default function Register() {
  const [eyeOpen, setEyeOpen] = useState(true);
  const [userData, setUserData] = useState({
    surname: "",
    fullname: "",
    account: "",
    password: "",
    confirmedPassword: "",
  });
  const navigate = useNavigate();

  const [dataError, setDataError] = useState({
    surname: "",
    fullname: "",
    account: "",
    password: "",
    confirmedPassword: "",
  });

  let phoneNumber = isPhoneNumber(userData.account) ? userData.account : "";
  let email = isEmail(userData.account) ? userData.account : "";

  const useRegisterMutation = useMutation({
    mutationFn: (userData) => {
      console.log("mutate 1");

      try {
        return http.post(`auth/register`, {
          firstName: userData.surname,
          lastName: userData.fullname,
          phoneNumber: phoneNumber,
          gender: "male",
          email: email,
          password: userData.password,
          rePassword: userData.confirmedPassword,
          Dob: "fdadsa",
          address: "12231",
        });
      } catch (error) {
        console.log("error roi", error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log("gohere");
      setUserData({
        surname: "",
        fullname: "",
        account: "",
        password: "",
        confirmedPassword: "",
      });
      toast.success("Register successfully", {
        position: "top-center",
      });
      navigate("/login");
    },
    onError: (error) => {
      toast.error(`register failed ${error.response?.data?.message}`, {
        position: "top-center",
      });
      console.error("Error:", error);
      // Xử lý lỗi và giữ lại dữ liệu form nếu đăng ký thất bại
    },
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
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^[0-9]+$/;
    const phoneNumberRegex = /^\d{10,}$/;
    if (value === "") {
      setDataError({
        ...dataError,
        [name]: "Account must not be left blank",
      });
    }

    if (isPhoneNumber(value)) {
      if (!phoneNumberRegex.test(value)) {
        setDataError({
          ...dataError,
          [name]: "PhoneNumber must have at least 10 number",
        });
      } else {
        setDataError({
          ...dataError,
          [name]: "",
        });
      }
    } else {
      if (!emailRegex.test(value)) {
        setDataError({
          ...dataError,
          [name]: "Email is not valid",
        });
      } else {
        setDataError({
          ...dataError,
          [name]: "",
        });
      }
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
        break;
      }
    }
    console.log("valid", isValid);
    for (const key in userData) {
      if (userData[key] === "") {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      alert("Vui lòng nhập đúng thông tin yêu cầu");
      return;
    }
    console.log("no return");

    useRegisterMutation.mutate(userData);
  };
  return (
    <div className={`${classes.loginContainer} `}>
      <form className={`${classes.loginForm} rounded-md `} onSubmit={handleSubmit}>
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
            {eyeOpen ? <i className="fa fa-eye text-gray-400"></i> : <i className="fa fa-eye-slash text-gray-400"></i>}
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
            <input id="login-input" type="checkbox" className="accent-emerald-500 basis-[10%]" name="agreeTerm" />
            <label className="text-sm" htmlFor="login-input">
              Tôi đồng ý với{" "}
              <span className="text-red-500">điều kiện & điều khoản sử dụng thông tin của tasty chicken</span>
            </label>
          </div>
        </div>
        <div>
          {useRegisterMutation.isPending ? (
            <ButtonLogin disabled className={"w-full 2xl:mt-3 2xl:mb-3 mt-2 mb-2 cursor-no-drop"}>
              Sending...
            </ButtonLogin>
          ) : (
            <ButtonLogin className={"w-full 2xl:mt-3 2xl:mb-3 mt-2 mb-2"}>ĐĂNG KÍ</ButtonLogin>
          )}
        </div>
        <div className="text-sm">
          <span>
            <span className="mr-2">Bạn đã có tài khoản?</span>
            <Link to={"/login"} className="text-red-500 hover:text-red-700" href="#">
              Đăng nhập ngay
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
