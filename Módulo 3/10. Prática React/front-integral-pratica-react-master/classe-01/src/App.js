import imagens from "./images/images";
import svg from "./images/svg";
import { React, useState } from "react";

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

function Card(props) {
  return (
    <div className="Card">
      <picture className={props.liked ? "liked" : ""}>
        <img onClick={props.click} src={props.img} alt={props.id}></img>
      </picture>
      <div className="Card__desc">
        <div className="desc__title">{props.children}</div>
        <div className="desc__time">Há {props.time} mês</div>
      </div>
    </div>
  );
}

function Gallery(props) {
  return (
    <div className="Gallery">
      <h1>Início</h1>
      <div className="Gallery__imgs">{props.children}</div>
    </div>
  );
}

function Modal(props) {
  return (
    <div
      onClick={props.handleClick}
      className={`Modal ${props.visibility ? "" : "hidden"}`}
    >
      <img
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={props.action}
        src={props.src}
        alt={props.alt}
      ></img>
    </div>
  );
}

function App() {
  const [modal, setModal] = useState({ display: false, src: null, alt: null, liked:false});
  const [posts, setPosts] = useState(
    imagens.map((img, index) => {
      return {
        id: index,
        src: img,
        liked: false,
      };
    })
  );

  function clickImage(event) {
    setModal(() => ({
      display: true,
      src: event.target.src,
      alt: event.target.alt,
    }));
  }

  function closeModal(event) {
    setModal(() => ({ display: false, src: null, alt: null }));
  }

  function like(event) {
    const novosPosts = posts.map((p) => p);
    const p = novosPosts.find((post) => post.id === parseInt(event.target.alt));
    if (p) p.liked = p.liked ? false : true;
    setPosts(novosPosts);
  }

  return (
    <div className="App">
      <Menu />
      <Gallery>
        {posts.map((img, index) => {
          return (
            <Card
              key={index}
              img={img.src}
              time={1}
              click={clickImage}
              liked={img.liked}
              id={index}
            >
              Lorem ipsum
            </Card>
          );
        })}
      </Gallery>
      <Modal
        src={modal.src}
        visibility={modal.display}
        handleClick={closeModal}
        action={like}
        alt={modal.alt}
      ></Modal>
    </div>
  );
}

export default App;