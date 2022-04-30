import React from "react";
import logo from "./logo.png";
//import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="Logo" />
      <p>
        Kent On
        <br />
        The Road
      </p>
      {/*  <BurgerMenu /> */}
      <Link to="/">Hem</Link>
      <Link to="/blogs/:id">Tidigare bloggar</Link>

      {/* OBS! endast synlig när inloggad */}
      {/*  <Link to="/create">Skapa blogg </Link> */}
    </div>
  );
};
export default Header;
