import React from "react";
import HeaderMobile from "../../components/Header/HeaderMobile";
import CartItem from "../../components/ShoppingCart/CartItem";

import FooterCopyright from "../../components/Footer/FooterCopyright";

export default function ShoppingCart() {
  return (
    <div>
      <HeaderMobile configImg={"!size-16 !rounded-full"} title={"cart"} />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-9 mt-9">
        {/* left side */}
        <div className="col-span-1 flex flex-col gap-3">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        {/* right side */}
        <div className="col-span-1 md:pt-4">
          <div className="flex justify-between">
            <p>Sub Total</p>
            <p>$29</p>
          </div>
          <div className="flex justify-between my-8">
            <p>Delivery Fee</p>
            <p>$29</p>
          </div>
          <div className="flex justify-between">
            <p>Grand Total</p>
            <p>$29</p>
          </div>
          <div className="text-center mt-8">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-3xl hover:bg-emerald-800">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>

      <FooterCopyright title={"cart"} />
    </div>
  );
}
