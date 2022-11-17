import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className=" h-screen w-full flex flex-col font-poppins">
      <Header />
      <div className="h-full w-full overflow-y-scroll ">{children}</div>
    </div>
  );
};

export default Layout;
