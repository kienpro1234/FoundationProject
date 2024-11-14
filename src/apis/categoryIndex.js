import { http } from "../utils/http";

export const fetchCategory = async ({ signal }) => {
  try {
    console.log("sau hello");
    const res = await http.get(`category`, { signal });

    // if (res.status < 200 || res.status >= 300) {
    //   throw new Error("Không thể fetch manu category");
    // }

    console.log("res ne", res);

    const result = res.data;
    console.log("result", result);

    return result.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
