import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

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
            {/* <span role="img" aria-label="icon-profile">
              👤
            </span> */}
            <FontAwesomeIcon icon={solid("circle-user")} />
          </Link>
          {/* <Link
            className="new-blog"
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="/create"
          >
            Nytt blogginlägg
          </Link>
          <button className="signout-btn" onClick={signUserOut}>
            Logga ut
          </button> */}
        </div>
      ) : (
        <Link
          style={{
            textDecoration: "none",
            color: "black",
          }}
          to="/login"
        >
          Logga in
        </Link>
      )}
    </div>
  );
};

export default Footer;
