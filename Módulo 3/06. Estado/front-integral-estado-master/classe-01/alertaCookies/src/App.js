import cookie from "./assets/cookie.svg";
import React, { useState } from "react";

function Card(props) {
  const [display, closeDisplay] = useState(
    <div className="Card">
      <img class="btn-close" onClick={fechar} alt="btn-close"></img>
      <img src={props.logo} alt="Cookie logo"></img>
      <p>{props.children}</p>
      <button onClick={fechar}>{props.button.text}</button>
    </div>
  );

  function fechar() {
    closeDisplay('');
  }
  
  return display;
}

function App() {
  return (
    <div className="App">
      <Card logo={cookie} button={{ text: "Tudo bem!", color: "#ED6755" }}>
        Nós utilizamos cookies para melhorar nossa UX, analytics e marketing.
      </Card>
    </div>
  );
}

export default App;
