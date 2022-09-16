import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleClick = () => setOpen(!open);

  return (
    <div>
      <nav className="navBar">
        <div className="nav-container">
          <NavLink
            to="/" // <-- link to home page
            className="nav-icon"
            onClick={handleClick}
          >
            <FontAwesomeIcon
              icon={solid("bars")}
              style={{ fontSize: "2rem" }}
            />
          </NavLink>

          <ul className={open ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-links"
                activeclassname="active"
                onClick={handleClick}
              >
                Hem
              </NavLink>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className="nav-links"
                    activeclassname="active"
                    onClick={handleClick}
                  >
                    Min profil
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/create"
                    className="nav-links"
                    activeclassname="active"
                    onClick={handleClick}
                  >
                    Nytt blogginlägg
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-links"
                    activeclassname="active"
                    onClick={logout}
                    onLoad={handleClick}
                  >
                    Logga ut
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-links"
                  activeclassname="active"
                  onClick={handleClick}
                >
                  Logga in
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default BurgerMenu;
