import { http } from "../utils/http";

export const fetchDishRanking = (dishId, queryParams) => {
  console.log("vao day disId", dishId);
  return http.get(`rankings/dishes/${dishId}`, {
    params: {
      ...queryParams,
      pageSize: 4,
    },
  });
};
