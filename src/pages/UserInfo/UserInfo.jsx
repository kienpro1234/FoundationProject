import HeaderUser from "../../components/Header/HeaderUser";
import Greeting from "../../components/UserInformation/Greeting";
import UserInformation from "../../components/UserInformation/UserInformation";
import UserOrderList from "../../components/UserInformation/UserOrderList";
import { useEffect } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import ErrorBlock from "../../components/UI/ErrorBlock";
import { getToken, getUserIdLS } from "../../utils/util";
import { http } from "../../utils/http";
import { toast } from "react-toastify";

export default function UserInfo() {
  //Call api kèm theo token để lấy user info
  const token = getToken();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userinfo"],
    queryFn: async ({ signal }) => {
      const userId = getUserIdLS();
      const accessToken = getToken();
      try {
        const result = await http.get(`users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          signal,
        });

        console.error("res ne", result);

        console.log("data", result);
        return result.data.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });
  // useEffect(() => {
  //   if (!token) {
  //     toast.warning("Vui lòng đăng nhập để sử dụng chức năng này");
  //     navigate("/login");
  //   }
  // }, [token, navigate]);

  //Cần làm protectedRoute cho route này thay vì làm thủ công ở compoennt như này, khó kiếm
  if (!token) {
    alert("Vui lòng đăng nhập để sử dụng chức năng này");
    return <Navigate to="/login" />;
  }

  if (!token) return null; // Không render component khi chưa login
  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    console.error("error", error);
    content = <ErrorBlock title={"Không thể fetch userinfo"} message={error.response.data.message} />;
  }

  if (data) {
    console.log("data", data);
    content = (
      <>
        <div className="headerGreeting-userinfo">
          <div className="headerGreeting-wrapper-userinfo">
            <HeaderUser user={data} />
            <Greeting user={data} />
          </div>
        </div>
        <div className="userInfo">
          {/* <Header/> */}

          <UserInformation user={data} />
          <UserOrderList />
        </div>
      </>
    );
  }
  return <>{content}</>;
}
