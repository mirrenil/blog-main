import React from "react";
import logo from "./logo.png";
//import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";
//import { Container } from "react-bootstrap";
//import Signup from "./components/Signup";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="header">
      <img className="logo" src={logo} alt="Logo" />
      <button onClick={handleNavigate}>
        <wbr /> Madde & Kenta <br /> på vift
      </button>
      {/*  <BurgerMenu /> */}
      {/* <Link to="/">Hem</Link>
      <Link to="/blogs/:id">Tidigare bloggar</Link> */}
      <Link to="/login">Logga in</Link>
      {/* <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Signup />
        </div>
      </Container> */}
      {/* OBS! endast synlig när inloggad */}
      {/*  <Link to="/create">Skapa blogg </Link> */}
    </div>
  );
};
export default Header;
