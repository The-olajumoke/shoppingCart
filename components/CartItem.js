import React, { useState } from "react";
import styles from "../styles/cart.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { formatCurrency } from "../utils/FormatCurrency";
function CartItem({ item, handleDelete, cartArray, allCarts, setAllCarts }) {
  const { productImage, productName, sellingPrice, id, quantityLeft } = item;

  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState(sellingPrice);

  useEffect(() => {
    setTotal(sellingPrice * quantity);
  }, [item, quantity, total, allCarts, cartArray]);

  const handleAddQuantity = () => {
    if (quantity === quantityLeft) {
      return;
    } else {
      setQuantity(quantity + 1);
      const allCartEdited = allCarts.map((cart) => {
        if (cart.id === id) {
          return {
            ...cart,
            quantity: cart.quantity + 1,
            total: cart.sellingPrice * (cart.quantity + 1),
          };
        }
        return cart;
      });
      setAllCarts(allCartEdited);
    }
  };

  const handleReduceQuantity = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);

      const allCartEdited = allCarts.map((cart) => {
        if (cart.id === id) {
          return {
            ...cart,
            quantity: cart.quantity - 1,
            total: cart.sellingPrice * (cart.quantity - 1),
          };
        }
        return cart;
      });

      setAllCarts(allCartEdited);
    }
  };

  return (
    <div
      className={` flex justify-between items-center ${styles.cartItem} vp-600:flex-col hover:bg-gray-background  px-16 py-8`}
    >
      <div className="flex items-center gap-2 h-full  vp-600:w-full">
        <div className="  overflow-hidden h-40 w-40 relative rounded">
          <Image
            src={productImage || "/images/placeholder.png"}
            alt="scan"
            draggable="false"
            // height="50"
            // width="50"
            layout="fill"
          />
        </div>
        <div className="flex flex-col h-full justify-center py-5 ">
          <div className="h-55 overflow-hidden mt-4">
            <h6 className=" text-gray-deadGray capitalize">{productName}</h6>
          </div>
          <div className="flex items-center  gap-5">
            <h6 className=" font-medium">
              {formatCurrency(sellingPrice)}/unit
            </h6>
            <div className="flex justify-center items-center">
              {" "}
              <Image
                src="/icons/cancel.svg"
                alt="scan"
                draggable="false"
                height="14"
                width="14"
                layout="fixed"
                className="cursor-pointer"
                onClick={() => handleDelete(id)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" h-full flex  flex-col justify-between items-end  w-fit vp-600:flex-row vp-600:items-center vp-600:w-full vp-600:pl-70  vp-600:mt-8">
        <div className="flex items-center justify-between gap-4 w-fit ">
          <div className=" relative cursor-pointer">
            <div
              className="h-20 w-20 cursor-pointer rounded-md bg-primary-purple text-white-white text-center text-md flex  items-center justify-center"
              onClick={handleReduceQuantity}
            >
              -
            </div>
            {quantity === 1 && (
              <div className=" absolute h-39 rounded bg-gray-line   left-0 right-0 top-0 "></div>
            )}
          </div>
          <h5 className=""> {quantity}</h5>
          <div className=" relative cursor-pointer">
            <div
              className="h-20 w-20 cursor-pointer rounded-md bg-primary-purple text-white-white text-center text-md flex  items-center justify-center"
              onClick={handleAddQuantity}
            >
              +
            </div>
            {quantity === quantityLeft && (
              <div className=" absolute h-39 rounded bg-gray-line   left-0 right-0 top-0 "></div>
            )}
          </div>
        </div>

        <h6 className="  font-medium text-primary-limeGreen">
          = {formatCurrency(total)}{" "}
        </h6>
      </div>
    </div>
  );
}

export default CartItem;
