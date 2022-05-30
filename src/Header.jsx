import React from "react";
//import logo from "./logo.png";
//import BurgerMenu from "./BurgerMenu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="header">
      {/* <img className="logo" src={logo} alt="Logo" /> */}
      <div className="header-text-container">
        <button className="header-text" onClick={handleNavigate}>
          Madde & Kenta på vift
        </button>
      </div>
    </div>
  );
};
export default Header;
