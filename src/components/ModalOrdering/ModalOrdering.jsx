import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../../context/cartContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderFood } from "../../apis/tableApi";
import { getAccessToken, getUserIdLS } from "../../utils/util";
import { toast } from "react-toastify";
import LoadingIndicator from "../UI/LoadingIndicator";
import { createPortal } from "react-dom";

export default function ModalOrdering({ title, modalId, size, triggeredButton, foodId, itemCart }) {
  const { tableId, addItemToCart, cartList } = useContext(CartContext);
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const userId = getUserIdLS() || undefined;
  const isUsingTableAndLogin = tableId && getAccessToken();
  const isUsingTableAndNotLogin = tableId && !getAccessToken();
  const isNotUsingTableAndLogin = !tableId && getAccessToken();
  const isNotUsingTableAndNotLogin = !tableId && !getAccessToken();

  console.log("cartList sau them", cartList);
  const handleDecre = (Car) => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncre = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleCancel = () => {
    setQuantity(1);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      orderFood({
        quantity: quantity,
        userId: userId,
        dishId: foodId,
        positionId: tableId,
      }),
    onSuccess: (data) => {
      console.log("res", data);
      setQuantity(1);
      console.log("query key invalidate", tableId);
      queryClient.invalidateQueries({
        queryKey: ["table", tableId],
      });
    },
    onError: (err) => {
      toast.error(err);
      console.error("err", err);
    },
  });

  // dùng context API ở đây , gửi đồ ăn này lên cartList bên context
  const handleOrder = () => {
    console.log("handleOrder");
    if (isUsingTableAndNotLogin || isUsingTableAndLogin) {
      mutate();
    } else if (isNotUsingTableAndNotLogin) {
      console.log("isNotUsingTableAndNotLogin");
      addItemToCart({
        ...itemCart,
        quantity: quantity,
      });
      setQuantity(1);
    }
  };

  if (isPending) {
    return createPortal(
      <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70">
        <LoadingIndicator />
      </div>,
      document.querySelector("#root"),
    );
  }

  return (
    <Modal title={title} id={modalId} size={size} triggeredButton={triggeredButton}>
      <div className="flex items-baseline justify-center gap-4">
        <span
          onClick={handleDecre}
          className="inline-block size-6 cursor-pointer rounded-full border !border-emerald-300 text-center leading-4 transition hover:scale-105"
        >
          -
        </span>
        <span className="w-1/2 border-b border-black text-center text-xl">{quantity}</span>
        <span
          onClick={handleIncre}
          className="inline-block size-6 cursor-pointer rounded-full border !border-emerald-300 text-center leading-4 transition hover:scale-105"
        >
          +
        </span>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="rounded-xl bg-red-500 px-3 py-[7px] text-xl font-bold text-white hover:bg-red-400"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          data-bs-dismiss="modal"
          onClick={handleOrder}
          className="rounded-xl bg-emerald-600 px-3 py-[7px] text-xl font-bold text-white hover:bg-emerald-800"
        >
          Order
        </button>
      </div>
    </Modal>
  );
}
