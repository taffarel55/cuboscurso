import logo from "./logo.svg";
import "./App.css";
import { useRef } from "react";

function App() {
  const countRef = useRef(0);

  function handleClick() {
    countRef.current = countRef.current + 1;
    console.log(`Cliquei ${countRef.current} vezes`);
  }

  console.log("renderizei");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick}>Clique aqui</button>
      </header>
    </div>
  );
}

export default App;
