import { React, useState } from "react";
import svg from "../images/svg";

function MenuItem(props) {
  return (
    <div className="MenuItem">
      <img onClick={props.handleClick} src={props.src} alt={props.src}></img>
      <div
        onClick={props.handleClick}
        className={`MenuItem__text ${!props.open ? "hidden" : ""} ${
          props.active
        }`}
      >
        {props.text}
      </div>
    </div>
  );
}

function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  const [page, setPage] = useState("inicio");
  function handleMenu() {
    setOpenMenu(!openMenu);
  }
  function handlePage(page) {
    setPage(page);
  }
  return (
    <div className="Menu">
      <div className="Menu__top">
        <MenuItem
          handleClick={handleMenu}
          src={openMenu ? svg.open_menu : svg.closed_menu}
          alt="Logo menu"
          open={openMenu}
        ></MenuItem>
        <MenuItem
          handleClick={() => handlePage("inicio")}
          src={page === "inicio" ? svg.active_home : svg.inactive_home}
          alt="Início"
          text="Início"
          open={openMenu}
          active={page === "inicio" ? "active" : ""}
        ></MenuItem>
        <MenuItem
          handleClick={() => handlePage("favoritos")}
          src={page === "favoritos" ? svg.active_like : svg.inactive_like}
          alt="Favoritos"
          text="Favoritos"
          open={openMenu}
          active={page === "favoritos" ? "active" : ""}
        ></MenuItem>
      </div>
      <div className="Menu__bottom">
        <MenuItem
          handleClick={() => handlePage("configuracoes")}
          src={
            page === "configuracoes"
              ? svg.active_settings
              : svg.inactive_settings
          }
          alt="Configurações"
          text="Configurações"
          open={openMenu}
          active={page === "configuracoes" ? "active" : ""}
        ></MenuItem>
      </div>
    </div>
  );
}

export default Menu;
