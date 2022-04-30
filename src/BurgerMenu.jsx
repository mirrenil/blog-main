import { Link } from "react-router-dom";
import { useState } from "react";

/* import icons not working */
const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navBar">
      <button>
        <button onClick={() => setOpen(!open)}>ADD A MENU ICON HERE!!</button>
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
  );
};
export default BurgerMenu;
