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
  }
}

export const http = new Http().instance;
