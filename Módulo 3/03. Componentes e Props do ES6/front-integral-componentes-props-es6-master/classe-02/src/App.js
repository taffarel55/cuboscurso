import ana from "./assets/anna-bia.png";
import charles from "./assets/charles-santos.png";
import kelvin from "./assets/kelvin-costa.png";
import mario from "./assets/mario-hisashi.png";

const contatos = [
  {
    img: kelvin,
    nome: "Kelvin Costa",
    user: "costa",
    seguidores: 140,
    seguindo: 207,
  },
  {
    img: charles,
    nome: "Charles Santos",
    user: "charles.santos",
    seguidores: 302,
    seguindo: 419,
  },
  {
    img: ana,
    nome: "Anna Bia",
    user: "anab",
    seguidores: 842,
    seguindo: 150,
  },
  {
    img: mario,
    nome: "Mario Hisashi",
    user: "hisashi",
    seguidores: 28,
    seguindo: 17,
  },
];

function Card({ img, user, nome, seguidores, seguindo }) {
  return (
    <div className="card">
      <img src={img} alt={user}></img>
      <h1>{nome}</h1>
      <h2>{"@" + user}</h2>
      <h3>{seguidores + " seguidores"}</h3>
      <h3>{seguindo + " seguindo"}</h3>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {contatos.map((contato) => {
        return <Card {...contato} key={contato.user} />;
      })}
    </div>
  );
}

export default App;
