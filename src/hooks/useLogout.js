import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../context/loginContext";

export default function useLogout() {
  const { setIsLogin } = useContext(loginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLogin(false);
    navigate("/menu/all");
  };

  return { handleLogout, navigate };
}
