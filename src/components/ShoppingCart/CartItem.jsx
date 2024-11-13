import React from "react";

export default function CartItem() {
  return (
    <div className="p-2 shadow-1">
      {/* CONTAINER */}
      <div className="grid grid-cols-8 bmd:grid-cols-7 md:grid-cols-8  gap-1">
        {/* image */}
        <div className="  col-span-2 bmd:col-span-1 md:col-span-2 flex justify-center">
          <div className="p-1 bg-gray-400">
            <img
              src="https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,w_1200,h_630,dpr_1/https://assets.app.engoo.com/images/x7jPxj9YtJfv97hnC3mMmQog5VwuYojZ7tlrhczGXIV.jpeg"
              alt=""
              className="size-[70px]"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className=" col-span-6 bmd:col-span-6 md:col-span-6 flex justify-between">
          {/* left side */}
          <div className="">
            <h3>Food one</h3>
            <p>Size: 16g</p>
            <p>$8</p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-right mr-[3px] cursor-pointer">
              <i class="fa fa-times"></i>
            </div>
            <div>
              <span className="inline-block border !border-emerald-300 size-4 leading-[10px] rounded-full text-center cursor-pointer hover:scale-105 transition">
                -
              </span>
              <span className="px-1">1</span>
              <span className="inline-block border !border-emerald-300 size-4 leading-[10px] rounded-full text-center cursor-pointer  hover:scale-105 transition">
                +
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
