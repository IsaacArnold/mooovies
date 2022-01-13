import React from "react";
import Navigation from "./Navigation";
// import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <div className="content">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
