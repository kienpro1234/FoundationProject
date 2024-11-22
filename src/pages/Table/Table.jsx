import React from "react";

export default function Table() {
  // lấy url của page này để call api fetch đến thông tin của table này, để hiển thị tương ứng
  return (
    <div className="h-screen bg-pink-red">
      {/* Container */}
      <div className="px-8 py-3">
        {/* title */}
        <h1 className="border-b-[1.5px] border-red-500 pb-1 text-6xl text-red-500">Table #1</h1>
        {/* Content top */}
        <div className="py-20">
          {/* flex*/}
          <div className="flex flex-col gap-3">
            {/* item */}
            <div className="rounded-3xl border-[1.5px] border-black bg-gray-50 px-3 py-2 font-bold">
              <h3 className="text-xl text-red-500">Order #123123</h3>
              <p className="">Food list:</p>
              <p className="">Status: </p>
            </div>
            <div className="rounded-3xl border-[1.5px] border-black bg-gray-50 px-3 py-2 font-bold">
              <h3 className="text-xl text-red-500">Order #123123</h3>
              <p className="">Food list:</p>
              <p className="">Status: </p>
            </div>
            <div className="rounded-3xl border-[1.5px] border-black bg-gray-50 px-3 py-2 font-bold">
              <h3 className="text-xl text-red-500">Order #123123</h3>
              <p className="">Food list:</p>
              <p className="">Status: </p>
            </div>
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
