import "./style.css";
import { useState } from "react";
import MenuIcon from "../../assets/burguer.png";
import CloseIcon from "../../assets/close.png";

function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${open && "fullscren-menu"}`}>
      {open ? (
        <img
          style={{ display: `${open} ? 'block' : 'none'` }}
          className="icon-close"
          onClick={() => setOpen(false)}
          src={CloseIcon}
          alt="close icon"
        />
      ) : (
        <img
          className="icon-open"
          onClick={() => setOpen(true)}
          src={MenuIcon}
          alt="menu icon"
        />
      )}

      <ul className="menu">
        <li>Ação</li>
        <li>Comédia</li>
        <li>Drama</li>
        <li>Documentários</li>
        <li>Infantis</li>
      </ul>
    </div>
  );
}

export default Menu;
