import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTable } from "../../apis/tableApi";
import LoadingIndicator from "../../components/UI/LoadingIndicator";

export default function Table() {
  // lấy url của page này để call api fetch đến thông tin của table này, để hiển thị tương ứng
  // Lấy url ra
  const { tableId } = useParams();
  const [isPositionValid, setIsPositionValid] = useState(false);
  // Lấy vị trí của người dùng, nếu phù hợp thì tiếp tục gửi api lên cho BE(api get table, gửi kèm position trong body) để lấy thông tin table hiển thị ra, link api cũng đồng thời là link trên url, gửi kèm position để BE kiểm tra nữa, nhưng trường hợp này chắc k cần
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Bán kính Trái Đất (km)
    console.log({
      lat1,
      lng1,
      lat2,
      lng2,
    });

    // Chuyển đổi độ sang radian
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    // Tọa độ điểm 1 và điểm 2 dưới dạng radian
    const radLat1 = (lat1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;

    // Áp dụng công thức Haversine
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(radLat1) * Math.cos(radLat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Tính khoảng cách
    const distance = R * c;

    // Thêm ngưỡng sai số (epsilon) để xử lý các giá trị rất nhỏ
    // const epsilon = 0.05; // Ngưỡng sai số 50 mét
    // return distance < epsilon ? 0 : distance; // Nếu distance rất nhỏ, trả về 0
    return distance;
  }

  let userLatitude = "";
  let userLongitude = "";

  // Tọa độ của nhà hàng
  const restaurantLatitude = 21.0630371; //tọa độ của nhà hàng hiện tại đã được gán bằng tọa độ xấp xỉ với tạo độ của user
  const restaurantLongitude = 105.7187961; // tọa độ của nhà hàng hiện tại đã được gán bằng tọa độ xấp xỉ với tạo độ của user

  // const restaurantLatitude = 100;
  // const restaurantLongitude = 200;

  // const allowedRadius = 0.01; // Bán kính cho phép (ví dụ: 0.5 km)
  const allowedRadius = 0.01;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;

        console.log({
          lat: userLatitude,
          lng: userLongitude,
        });

        // Hàm tính khoảng cách giữa hai điểm (dựa trên tọa độ GPS)
        const distance = calculateDistance(userLatitude, userLongitude, restaurantLatitude, restaurantLongitude);

        console.log({
          distance,
          allowedRadius,
        });

        if (distance > allowedRadius) {
          alert(`Bạn không nằm trong phạm vi nhà hàng để order! 
                distance: ${distance}
            allowedRadius: ${allowedRadius}
            `);

          return (
            <p className="text-lg font-semibold text-red-500">
              Vị ví của bạn nằm ngoài phạm vi nhà hàng hoặc bạn chưa cung cấp vị trí
            </p>
          );

          // Chặn không cho phép order
        } else {
          alert(`Thành công
            distance: ${distance}
            allowedRadius: ${allowedRadius}
            `);
          setIsPositionValid(true);
        }
      },
      (error) => {
        alert("Không thể lấy vị trí của bạn. Vui lòng bật định vị GPS.");
        return false;
      },
    );
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["table", tableId],
    queryFn: () => getTable(tableId),
    enabled: isPositionValid,
  });

  let dataTable = "";
  if (data) {
    dataTable = data.data.data;
  }

  let content = <></>;
  if (!isPositionValid) {
    content = <p className="text-lg font-semibold text-red-500">Vị trí không phù hợp</p>;
  }
  if (dataTable) {
    content = (
      <div className="h-screen bg-pink-red">
        {/* Container */}
        <div className="px-8 py-3">
          {/* title */}
          <h1 className="border-b-[1.5px] border-red-500 pb-3 text-6xl capitalize text-red-500">
            {dataTable?.name.replace(/_/, " ")}
          </h1>
          {/* Content top */}
          <div className="min-h-[300px] py-20">
            {/* flex*/}
            <div className="flex flex-col gap-3">
              {dataTable.orders.map((order) => (
                <div className="rounded-3xl border-[1.5px] border-black bg-gray-50 px-3 py-2 font-bold">
                  <h3 className="text-xl text-red-500">Order #123123</h3>
                  <p className="">Food list:</p>
                  <p className="">Status: </p>
                </div>
              ))}
              {/* item */}

              {/* <div className="rounded-3xl border-[1.5px] border-black bg-gray-50 px-3 py-2 font-bold">
          <h3 className="text-xl text-red-500">Order #123123</h3>
          <p className="">Food list:</p>
          <p className="">Status: </p>
        </div>
        <div className="rounded-3xl border-[1.5px] border-black bg-gray-50 px-3 py-2 font-bold">
          <h3 className="text-xl text-red-500">Order #123123</h3>
          <p className="">Food list:</p>
          <p className="">Status: </p>
        </div> */}
            </div>
          </div>
          {/* Content bottom */}
          <div>
            <div className="flex justify-between">
              <button className="w-32 rounded-xl bg-emerald-500 py-[11px] text-4xl font-bold text-white hover:bg-emerald-400">
                Pay
              </button>
              <button className="w-32 rounded-xl bg-red-500 py-[11px] text-4xl font-bold text-white hover:bg-red-400">
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) {
    content = <LoadingIndicator />;
  }
  // Nếu vị trí không phù hợp thì return vị trí không phù hợp, không return ra gì / TƯơng tự với trường hợp người dùng từ chối cung cấp vị trí
  return <>{content}</>;
}
