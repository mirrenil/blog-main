import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const Footer = () => {
  const { currentUser, signout } = useAuth();
  return (
    <div className="footer">
      {currentUser ? (
        <div className="footer-links">
          <Link
            className="profile"
            style={{ textDecoration: "none", color: "black" }}
            to="/"
          >
            Profil
          </Link>
          <Link
            className="new-blog"
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="/create"
          >
            Nytt blogginlägg
          </Link>
          <button className="signout-btn" onClick={signout}>
            Logga ut
          </button>
        </div>
      ) : (
        <Link to="/login">Logga in</Link>
      )}
    </div>
  );
};

export default Footer;
