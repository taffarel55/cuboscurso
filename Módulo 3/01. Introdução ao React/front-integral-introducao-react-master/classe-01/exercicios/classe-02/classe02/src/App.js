import quote from "./quote.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div class="card">
        <img className="quote" src={quote} alt="quote" />
        <p className="text">
          Nascida e criada em Nova York. Atualmente morando em Haia, Holanda,
          após passagens por Paris e Amsterdã. Amante de viagens, aventura,
          natureza, cidade, vestidos e gatos.
        </p>
        <p className="sign">Tessa Jacobson</p>
      </div>
      <div className="newsletter">
        <h4>Newsletter</h4>
        <h5>Se inscreva no newsletter!</h5>
        <p>Não perca nenhuma notícia urgente ou recurso novo.</p>
        <a href="index.html">Se inscrever</a>
      </div>
    </div>
  );
}

export default App;
