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
      (err) => Promise.reject(err),
    );
  }
}

export const http = new Http().instance;
