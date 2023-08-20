import React, { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import EmailContext from "../context/EmailContext";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </EmailContext.Provider>
  );
};

export default Layout;
