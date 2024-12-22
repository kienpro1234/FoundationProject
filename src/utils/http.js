import axios from "axios";
import { DOMAIN } from "./const";
import { getAccessToken } from "./util";

class Http {
  constructor() {
    this.accessToken = getAccessToken();
    this.instance = axios.create({
      baseURL: `${DOMAIN}`,
      timeout: 100000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err),
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;

        if (url === "auth/login") {
          const data = response.data;
          this.accessToken = data.accessToken;
        }

        return response;
      },
      (err) => {
        // Trường hợp token hết hạn thì xóa token trong localstorage, xóa ở client, đăng xuất
        if (err.response.status === 1014 || err.response.status === 1005) {
          this.accessToken = null;
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          localStorage.removeItem("userId");
          localStorage.removeItem("role");
          localStorage.removeItem("emailOrPhoneReconfirm");
          window.location.href = "/login";
        }
        return Promise.reject(err);
      },
    );
  }
}

export const http = new Http().instance;
