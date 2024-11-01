import React, { useState } from "react";
import classes from "./Login.module.css";
import Input from "../components/UI/Input";
import ButtonLogin from "../components/UI/ButtonLogin";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
export default function Login() {
  const [eyeOpen, setEyeOpen] = useState(true);
  const [userData, setUserData] = useState({
    account: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Gọi api đăng nhập, lấy token, lưu vào localStorage
    // const {data, isLoading, isError, error} = useQuery({
    //   queryKey: ["login"],
    //   queryFn: async ({signal}) => {
    //     try {
    //       const response = fetch(url, {
    //         method: "POST",
    //         body: JSON.stringify(userData),
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         signal
    //       })
    //     } catch (err) {

    //     }
    //   }
    // })
  };

  return (
    <div className={`${classes.loginContainer} `}>
      <form
        className={`${classes.loginForm} rounded-md `}
        onSubmit={handleSubmit}
      >
        <h2 className={`heading-login`}>Đăng nhập</h2>
        <p className={`mt-2 mb-3`}>Đăng nhập bằng email hoặc số điện thoại</p>
        {/* input */}
        <div className="mb-[12px]">
          <Input
            className={"w-full"}
            placeholder={"Email hoặc số điện thoại"}
            name={"account"}
            onChange={handleChange}
            value={userData.account}
            required
          />
        </div>
        <div className={`${classes["input-password"]}`}>
          <Input
            type={eyeOpen ? "password" : "text"}
            className={"w-full"}
            placeholder={"Mật khẩu"}
            name={"password"}
            onChange={handleChange}
            value={userData.password}
            required
          />
          <button
            type="button"
            onClick={() => {
              setEyeOpen((prevEyeOpen) => !prevEyeOpen);
            }}
          >
            {eyeOpen ? (
              <i class="fa fa-eye text-gray-400"></i>
            ) : (
              <i class="fa fa-eye-slash text-gray-400"></i>
            )}
          </button>
        </div>
        {/* Nhớ tài khoản , quên mk */}
        <div className="flex justify-between items-baseline">
          <div className="mt-3 flex items-baseline gap-2">
            <input
              id="login-input"
              type="checkbox"
              className="accent-emerald-500"
            />
            <label className="text-sm" htmlFor="login-input">
              Nhớ tài khoản
            </label>
          </div>
          <a className="text-sm underline decoration-1 underline-offset-4 cursor-pointer text-gray-600 font-normal hover:text-gray-600">
            Quên mật khẩu?
          </a>
        </div>
        <div>
          <ButtonLogin className={"w-full mt-3"}>ĐĂNG NHẬP</ButtonLogin>
        </div>
        <div className="text-sm mt-3">
          <span>
            <span className="mr-2">Bạn chưa có tài khoản?</span>
            <Link
              to={"/register"}
              className="text-red-500 hover:text-red-700"
              href="#"
            >
              Đăng kí ngay
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
