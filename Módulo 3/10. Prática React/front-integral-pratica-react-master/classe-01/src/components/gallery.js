function Gallery(props) {
  return (
    <div className="Gallery">
      <h1>Início</h1>
      <div className="Gallery__imgs">{props.children}</div>
    </div>
  );
}

export default Gallery;