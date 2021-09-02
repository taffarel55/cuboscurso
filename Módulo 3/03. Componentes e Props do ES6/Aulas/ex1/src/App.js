import "./App.css";

function Imagem(props) {
  const { id, texto } = props;
  return (
    <div className="cardImage">
      <img
        src={"https://picsum.photos/id/" + id + "/200/200.jpg"}
        alt={"Imagem " + id}
      ></img>
      <p>{texto}</p>
    </div>
  );
}

function App() {
  const cards = [
    { id: 239, texto: "Card 1" },
    { id: 240, texto: "Card 2" },
    { id: 241, texto: "Card 3" },
  ];
  return (
    <div className="App">
      {cards.map((card) => (
        <Imagem id={card.id} key={card.id} texto={card.texto} />
      ))}
    </div>
  );
}

export default App;
