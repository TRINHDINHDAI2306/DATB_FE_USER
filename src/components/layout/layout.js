import React from "react";
import Footer from "./footer";
import HeaderLayout from "./header";

function Layout({ children }) {
  return (
    <>
      <div className="layout__wrapper">
        <HeaderLayout />
        <main className="main-travel">{children}</main>
        <Footer />
      </div>
    </>
  );
}
export default Layout;
