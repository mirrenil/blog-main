import React from "react";
//import logo from "./logo.png";
//import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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

      {/*  <BurgerMenu /> */}
      {/* <Link to="/">Hem</Link>
      <Link to="/blogs/:id">Tidigare bloggar</Link> */}

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
