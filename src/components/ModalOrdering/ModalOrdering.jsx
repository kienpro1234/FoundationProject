import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../../context/cartContext";

export default function ModalOrdering({ title, id, size, triggeredButton, itemCart }) {
  const { addItemToCart, cartList } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

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

  // dùng context API ở đây , gửi đồ ăn này lên cartList bên context
  const handleOrder = () => {
    console.log("handleOrder");
    addItemToCart({
      ...itemCart,
      quantity: quantity,
    });

    console.log("cartList sau khi them", cartList);

    setQuantity(1);
  };

  return (
    <Modal title={title} id={id} size={size} triggeredButton={triggeredButton}>
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
