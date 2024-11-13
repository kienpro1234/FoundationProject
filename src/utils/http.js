import axios from "axios";
import { DOMAIN } from "./const";

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: `${DOMAIN}`,
      timeout: 100000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const http = new Http().instance;
