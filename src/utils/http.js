import axios from "axios";
import { DOMAIN } from "./const";
import { getAccessToken } from "./util";

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: `${DOMAIN}`,
      timeout: 100000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}` || "",
      },
    });
  }
}

export const http = new Http().instance;
