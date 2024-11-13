import React, { useState } from "react";
import classes from "./Login.module.css";
import Input from "../components/UI/Input";
import ButtonLogin from "../components/UI/ButtonLogin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../utils/http";
export default function Login() {
  const [eyeOpen, setEyeOpen] = useState(true);
  const initialUserData = {
    account: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialUserData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const useLoginMutation = useMutation({
    mutationFn: async (userData) => {
      try {
        const res = await http.post(
          "auth/login",
          {
            phoneOrEmail: userData.account,
            password: userData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return res.data;
      } catch (err) {
        console.error("err", err);
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      const accessToken = data.accessToken;
      const username = data.username;
      console.log("username", username);
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("username", username);
      }
      setUserData(initialUserData);
      alert("Đăng nhập thành công");
      navigate("/menu/all");
    },

    onError: (err) => {
      alert("Register failed");

      console.log("Đăng nhập lỗi", err);
      console.error("err", err);
    },
  });

  // const useLoginMutation = useMutation({
  //   mutationFn: async (userData) => {
  //     const res = await fetch(`${DOMAIN}auth/login`, {
  //       method: "POST",
  //       headers: {
  //         "ngrok-skip-browser-warning": "69420",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: userData.account,
  //         password: userData.password,
  //       }),
  //     });

  //     console.log("This is login response", res);

  //     if (!res.ok) {
  //       throw new Error("Đăng nhập thất bại!");
  //     }

  //     const data = await res.json();

  //     console.log("data", data);
  //     const accessToken = data.accessToken;
  //     const username = data.username;
  //     if (accessToken) {
  //       localStorage.setItem("accessToken", accessToken);
  //       localStorage.setItem("username", username);
  //       setIsLogin(true);
  //     } else {
  //       throw new Error("Access token not found");
  //     }
  //   },

  //   //goi api get user, data, token -> server -> res user -> userid
  //   onSuccess: () => {
  //     setUserData(initialUserData);
  //     alert("Đăng nhập thành công");
  //     navigate("/menu/all");
  //   },

  //   onError: (err) => {
  //     alert("Register failed");

  //     console.log("Đăng nhập lỗi", err);
  //     console.error("err", err);
  //   },
  // });

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    for (const key in userData) {
      if (userData[key] === "") {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
      return;
    }

    useLoginMutation.mutate(userData);
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
          {useLoginMutation.isPending ? (
            <ButtonLogin
              style={{ cursor: "no-drop" }}
              className={"w-full mt-3"}
            >
              Đăng nhập...
            </ButtonLogin>
          ) : (
            <ButtonLogin className={"w-full mt-3"}>Đăng nhập</ButtonLogin>
          )}
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
