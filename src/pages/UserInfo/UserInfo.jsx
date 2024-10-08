import Header from "../../components/Header/Header";
import HeaderUser from "../../components/Header/HeaderUser";
import Greeting from "../../components/UserInformation/Greeting";
import UserInformation from "../../components/UserInformation/UserInformation";
import UserOrderList from "../../components/UserInformation/UserOrderList";
import hoangSpicture from "../../assets/z5897007480764_1648527d12cdbf83a2a1b993ca10098d.jpg"

export default function UserInfo() {
  //Call api kèm theo token để lấy user info
  const user = {
    id: 1,
    name: "Hồn Loàng",
    avatar: hoangSpicture,
  };
  return (
    <>
      <div className="headerGreeting-userinfo">
        <div className="headerGreeting-wrapper-userinfo">
          <HeaderUser user={user} />
          <Greeting user={user} />
        </div>
      </div>
      <div className="userInfo">
        {/* <Header/> */}

        <UserInformation user={user} />
        <UserOrderList />
      </div>
    </>
  );
}
