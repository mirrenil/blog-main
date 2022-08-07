import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const Footer = () => {
  const { currentUser } = useAuth();

  return (
    <div className="footer">
      {currentUser ? (
        <div className="footer-links">
          <Link
            className="profile"
            style={{ textDecoration: "none", color: "black" }}
            to="/profile"
          >
            Klicka här för att komma till din profil
          </Link>
        </div>
      ) : (
        <Link
          style={{
            textDecoration: "none",
            color: "black",
          }}
          to="/login"
        >
          Äger du denna hemsidan? Logga in här!
        </Link>
      )}
    </div>
  );
};

export default Footer;
