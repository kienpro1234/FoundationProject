import React, { useState } from "react";
import classes from "./Login.module.css";
import Input from "../components/UI/Input";
import ButtonLogin from "../components/UI/ButtonLogin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../utils/http";
import { toast } from "react-toastify";
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
            username: userData.account,
            password: userData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("data", res);
        return res.data;
      } catch (err) {
        console.error("err", err);
        throw err;
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      const accessToken = data.accessToken;
      const userId = data.user.id;
      const role = data.user.roles.length > 1 ? "admin" : "user";

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
      }
      setUserData(initialUserData);
      toast.success("Đăng nhập thành công", {
        position: "top-center",
      });
      navigate("/menu/all");
    },

    onError: (err) => {
      // toast.error(`Login failed - Account or password is not correct`, {
      //   position: "top-center",
      // });
      toast.error("Login failed", {
        position: "top-center",
      });

      console.log("Đăng nhập lỗi", err);
      console.error("err", err);
    },
  });

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
      <form className={`${classes.loginForm} rounded-md `} onSubmit={handleSubmit}>
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
            {eyeOpen ? <i class="fa fa-eye text-gray-400"></i> : <i class="fa fa-eye-slash text-gray-400"></i>}
          </button>
        </div>
        {/* Nhớ tài khoản , quên mk */}
        <div className="flex justify-between items-baseline">
          <div className="mt-3 flex items-baseline gap-2">
            <input id="login-input" type="checkbox" className="accent-emerald-500" />
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
            <ButtonLogin style={{ cursor: "no-drop" }} className={"w-full mt-3"}>
              Đăng nhập...
            </ButtonLogin>
          ) : (
            <ButtonLogin className={"w-full mt-3"}>Đăng nhập</ButtonLogin>
          )}
        </div>
        <div className="text-sm mt-3">
          <span>
            <span className="mr-2">Bạn chưa có tài khoản?</span>
            <Link to={"/register"} className="text-red-500 hover:text-red-700" href="#">
              Đăng kí ngay
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}