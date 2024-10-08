import Header from "../../components/Header/Header";
import HeaderUser from "../../components/Header/HeaderUser";
import UserInformation from "../../components/UserInformation/UserInformation";
import UserOrderList from "../../components/UserInformation/UserOrderList";

export default function UserInfo() {
  return (
    <>
      <HeaderUser />
      <div className="userInfo">
        {/* <Header/> */}

        <UserInformation />
        <UserOrderList />
      </div>
    </>
  );
}
