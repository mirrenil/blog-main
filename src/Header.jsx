import React from "react";
//import BurgerMenu from "./BurgerMenu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="header">
      <div className="header-text-container">
        <button className="header-text" onClick={handleNavigate}>
          Madde & Kenta på vift
        </button>
      </div>
      {/* <BurgerMenu /> */}
    </div>
  );
};
export default Header;
