import cookie from "./assets/cookie.svg";
import alert from "./assets/alert.svg";

function info(tipo) {
  switch (tipo) {
    case "cookie":
      return {
        img: cookie,
        texto:
          "Nós utilizamos cookies para melhorar nossa UX, analytics e marketing.",
        cor: "vermelho",
        botao: "Tudo bem!",
      };

    case "alert":
      return {
        img: alert,
        texto: "Você será deslogado imediatamente!",
        cor: "azul",
        botao: "Extender login",
      };

    default:
      return {
        img: alert,
        texto: "Para adicionar mais um tipo de botão, utilize este modelo!",
        cor: "preto",
        botao: "Botão default",
      };
  }
}

function Card(props) {
  const { img, texto, cor, botao } = info(props.tipo);
  return (
    <div className="card">
      <img src={img} alt={props.tipo}></img>
      <p>{texto}</p>
      <button className={cor}>{botao}</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Card tipo="cookie" />
      <Card tipo="alert" />
    </div>
  );
}

export default App;
