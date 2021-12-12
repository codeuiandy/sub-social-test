import React from "react";
import logo from "../../assets/images/subsocial-sign.png";
const Navbar = () => {
  return (
    <div className="app-header-wrap">
      <div className="app-header-col-one">
        <img src={logo} alt="subsocial logo" />
      </div>

      <div className="app-header-col-two">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Mission</li>
          <li>
            <button>Sign up</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
