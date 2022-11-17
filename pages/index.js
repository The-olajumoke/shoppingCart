import { useState } from "react";
import Layout from "../components/Layout";
import ShoppingBag from "../components/ShoppingBag";
import { items } from "../cartItems/items";
export default function Home() {
  const [allCarts, setAllCarts] = useState(items);
  const [subTotal, setSubTotal] = useState("");
  const DeleteHandler = (id) => {
    const allCartEdited = allCarts.filter((cart) => cart.id !== id);
    setAllCarts(allCartEdited);
  };
  const emptyBagHandler = () => {
    setAllCarts([]);
  };
  const handleReset = () => {
    setAllCarts(items);
  };
  return (
    <Layout>
      <div className="pt-20 px-20 flex flex-col  font-poppins">
        <div className="flex vp-600:hidden items-center justify-between ">
          <h2 className=" text-black-coal text-lg font-medium">Shopping Bag</h2>
          <button
            className=" cursor-pointer   font-bold border bg-primary-purple px-16 py-8 rounded-md text-white-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <h6 className=" text-gray-body mt-8 mb-16">
          Manage products in the shopping bag
        </h6>

        <ShoppingBag
          cartArray={allCarts}
          DeleteHandler={DeleteHandler}
          emptyBagHandler={emptyBagHandler}
          subTotal={subTotal}
          setSubTotal={setSubTotal}
          setAllCarts={setAllCarts}
          allCarts={allCarts}
        />
      </div>
    </Layout>
  );
}
