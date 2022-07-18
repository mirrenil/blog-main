import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav className="navBar">
        <button
          style={{ border: "none", background: "transparent" }}
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={solid("bars")} style={{ fontSize: "2rem" }} />
        </button>

        <ul className="">
          {/* <li className="links">
          <Link to="/">Hem</Link>
        </li>
        <li>
          <Link to="/create">Skapa blogg</Link>
        </li> */}
        </ul>
      </nav>
    </div>
  );
};
export default BurgerMenu;
