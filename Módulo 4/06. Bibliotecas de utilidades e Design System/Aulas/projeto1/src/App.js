import "./App.css";
import { useLocalStorage } from "react-use";
import { useState } from "react";

function App() {
  const [valueInLocalStorage, setValueInLocalStorage, removeInLocalStorage] =
    useLocalStorage("storage", "batatinhafrita123");
  const [inputValue, setInputValue] = useState("");

  function handleAddInLocalStorage() {
    setValueInLocalStorage(inputValue);
  }

  function handleRemoveInLocalStorage() {
    removeInLocalStorage();
  }

  return (
    <div className="App">
      {valueInLocalStorage}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={handleAddInLocalStorage}>Adicionar</button>
      <button onClick={handleRemoveInLocalStorage}>Remover</button>
    </div>
  );
}

export default App;
