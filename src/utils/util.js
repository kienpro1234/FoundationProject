import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

// export const formatPriceUSD = (price) => {
//   if (typeof price !== 'number' || isNaN(price)) {
//     return 'Invalid price'; // Hoặc bạn có thể đưa ra một thông báo phù hợp
//   }
//   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
// };

export const queryClient = new QueryClient();

export const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const formatName = (name) => {
  // Chuyển tất cả thành chữ thường và tách từ dấu gạch nối nếu có
  const words = name.toLowerCase().split("-");

  // Viết hoa chữ cái đầu của từng từ, chỉ áp dụng cho từ đầu tiên
  const formattedWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  // Kết hợp các từ lại với dấu cách
  return formattedWords.join(" ");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

//get accees token
export const getToken = () => {
  return localStorage.getItem("accessToken") || null;
};

export const getUserNameLS = () => {
  return localStorage.getItem("username") || null;
};

export const isEmail = (email) => {
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const isPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\d+$/;
  if (phoneNumberRegex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};
