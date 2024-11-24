import React, { useContext } from "react";
import HeaderMobile from "../../components/Header/HeaderMobile";
import CartItem from "../../components/ShoppingCart/CartItem";

import FooterCopyright from "../../components/Footer/FooterCopyright";
import { calcTotalPrice, getCartListFromLS } from "../../utils/util";
import { CartContext } from "../../context/cartContext";
import { useMutation } from "@tanstack/react-query";

export default function ShoppingCart() {
  const { cartList } = useContext(CartContext);

  // const {mutate, isPending} = useMutation({
  //   mutationFn:
  // })

  const handleConfirmOrder = () => {};

  return (
    <div>
      <HeaderMobile configImg={"!size-16 !rounded-full"} title={"cart"} />

      <div className="mx-auto mt-9 grid max-w-7xl grid-cols-1 gap-9 px-4 md:grid-cols-2">
        {/* left side */}
        <div className="col-span-1 flex flex-col gap-3">
          {(!cartList || cartList.length === 0) && (
            <div className="text-lg text-red-500">Chưa có gì trong giỏ hàng</div>
          )}
          {cartList && cartList.length > 0 && cartList.map((item) => <CartItem key={item.id} food={item} />)}
        </div>

        {/* right side */}
        <div className="col-span-1 md:pt-4">
          <div className="flex justify-between">
            <p>Total</p>
            <p>${calcTotalPrice(cartList)}</p>
          </div>
          {/* <div className="flex justify-between my-8">
            <p>Delivery Fee</p>
            <p>$29</p>
          </div>
          <div className="flex justify-between">
            <p>Grand Total</p>
            <p>$29</p>
          </div> */}
          <div className="mt-8 text-center">
            <button
              onClick={handleConfirmOrder}
              className="rounded-3xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-800"
            >
              Confirm Order
              {/* Nếu là desktop thì là proceed to checkout */}
            </button>
          </div>
        </div>
      </div>

      <FooterCopyright title={"cart"} />
    </div>
  );
}
