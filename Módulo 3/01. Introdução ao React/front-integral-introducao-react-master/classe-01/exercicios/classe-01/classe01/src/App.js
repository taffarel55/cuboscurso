import close from "./close.svg";
import cookie from "./cookie.svg";
import alert from "./alert.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="card">
        <img className="btn-close" src={close} alt="Close" />
        <img className="img-logo" src={cookie} alt="Logo" />
        <p>
          Nós utilizamos cookies para melhorar nossa UX, analytics e marketing.
        </p>
        <a className="button-red" href="index.html">
          Tudo bem!
        </a>
      </div>
      <div className="card">
        <img className="btn-close" src={close} alt="Close" />
        <img className="img-logo" src={alert} alt="Alert" />
        <p>Você será deslogado imediatamente!</p>
        <a className="button-blue" href="index.html">
          Extender login
        </a>
      </div>
    </div>
  );
}

export default App;
