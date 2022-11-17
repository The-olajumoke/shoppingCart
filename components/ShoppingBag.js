import React, { useState, useEffect } from "react";
import Image from "next/image";
import CartItem from "./CartItem";
import { formatCurrency } from "../utils/FormatCurrency";

const ShoppingBag = ({
  cartArray,
  DeleteHandler,
  setOpenPayment,
  emptyBagHandler,
  subTotal,
  setSubTotal,
  setAllCarts,
  allCarts,
}) => {
  useEffect(() => {
    const newTotal = allCarts.reduce((a, b) => {
      const totalProducts = b.sellingPrice * b.quantity;
      return a + totalProducts;
    }, 0);
    setSubTotal(newTotal);
  }, [cartArray, allCarts]);

  return (
    <div className="flex flex-col gap-12 ">
      <div
        className={`bg-white-white py-15 flex flex-col rounded-lg  shadow-md vp-600:shadow-none gap-8`}
      >
        <div className="flex flex-col gap-4">
          {allCarts.length ? (
            cartArray.map((item, idx) => (
              <CartItem
                key={idx}
                index={idx}
                item={item}
                handleDelete={DeleteHandler}
                cartArray={cartArray}
                setAllCarts={setAllCarts}
                allCarts={allCarts}
              />
            ))
          ) : (
            <div className="mt-20 flex flex-col justify-center items-center h-5/6">
              <h6>No available item in Cart</h6>
            </div>
          )}
        </div>
      </div>
      {allCarts.length ? (
        <div className="bg-white-white  p-15 flex flex-col rounded-lg shadow-md vp-600:shadow-none gap-10 ">
          <h3 className=" font-semibold text-black-coal text-sm">
            Billing Summary
          </h3>

          <div className="flex justify-between items-center">
            <h6 className=" text-black-coal font-bolds ">Total</h6>

            {cartArray.length ? (
              <h5 className="text-primary-limeGreen font-bold">
                {formatCurrency(subTotal)}
              </h5>
            ) : (
              <h5 className="font-bold">-</h5>
            )}
          </div>

          <div className="flex  justify-between vp-600:gap-2 items-center">
            <button
              className=" border-primary-danger  text-primary-danger rounded-md border px-16 py-8 vp-600:w-full"
              onClick={emptyBagHandler}
            >
              Empty Cart
            </button>
            <button
              className={`px-16 py-8 text-primary-purple  border-primary-purple border  rounded-md   w-fit`}
              disabled={cartArray.length ? false : true}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ShoppingBag;
