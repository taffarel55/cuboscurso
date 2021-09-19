import imagens from "./images/images";
import { React, useState } from "react";
import Menu from "./components/menu";
import Card from "./components/card";
import Gallery from "./components/gallery";
import Modal from "./components/modal";

function App() {
  const [modal, setModal] = useState({
    display: false,
    src: null,
    alt: null,
    liked: false,
  });
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
