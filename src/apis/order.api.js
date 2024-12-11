import { http } from "../utils/http";

export const fetchOrderList = (userId, queryParams) =>
  http.get(`orders/user/${userId}`, {
    params: {
      ...queryParams,
      pageSize: 3,
    },
  });

export const rateOrder = (data) => http.post("rankings", data);
