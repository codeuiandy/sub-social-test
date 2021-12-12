import React from "react";
import Navbar from "./navbar";
import "./index.css";
const Index = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="app-children">{children}</div>
    </div>
  );
};

export default Index;
