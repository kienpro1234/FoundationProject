import React, { useContext } from "react";
import MenuLanding from "../../components/Menu/MenuLanding";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { FavContext } from "../../context/favContext";

export default function FavFood() {
  // Lấy FavList từ context đối với người dùng chưa đăng nhập
  const { favList, removeItemFromFav } = useContext(FavContext);
  const handleDeleteFavFood = (dishId) => () => {
    removeItemFromFav(dishId);
  };
  return (
    <div className="menu">
      <MenuLanding favPage={"FAV_PAGE"} />
      <div className="bg-slate-100 py-11">
        {favList.length > 0 &&
          favList.map((food) => {
            return (
              <div key={food.dishId} className="mx-auto max-w-4xl p-3">
                <div className="bg-white px-9 py-3 ps-4 shadow-1">
                  {/* CONTAINER */}
                  <div className="flex items-center justify-between">
                    {/* image */}
                    <div className="flex gap-3">
                      <div className="bg-gray-400 p-1">
                        <Link to={`/food/${food.dishId}`}>
                          <img src={food.image} alt="img" className="size-[70px]" />
                        </Link>
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="mb-1 truncate text-lg font-bold">{food.dishName}</h3>
                        <p className="text-sm">Portion: {food.portion}</p>
                        <p className="text-sm">Price: {food.price}</p>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="">
                      {/* left side */}

                      <div className="">
                        <div className="mr-[3px] cursor-pointer text-right" onClick={handleDeleteFavFood(food.dishId)}>
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {favList.length === 0 && (
          <p className="text-center font-yummy text-xl text-red-500">Không có món ăn yêu thích nào</p>
        )}
        {/* container */}
      </div>
      <Footer />
    </div>
  );
}
