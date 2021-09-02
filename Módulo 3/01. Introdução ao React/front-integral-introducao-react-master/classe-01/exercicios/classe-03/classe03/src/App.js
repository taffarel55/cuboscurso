import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="card">
        <h3>Doces orgânicos</h3>
        <p className="description">
          Doces com adoçantes orgânicos limpos e sabores de frutas reais. gomas
          de ingrediente único: ashwagandha, vinagre de maçã, sabugueiro e
          açafrão.
        </p>
        <p className="time">Atualizado 2 horas atrás</p>
        <p className="cat">Categorias</p>
        <ul>
          <li>
            <a href="index.html">Comida</a>
          </li>
          <li>
            <a href="index.html">Doces</a>
          </li>
          <li>
            <a href="index.html">Orgânico</a>
          </li>
          <li>
            <a href="index.html">Bio</a>
          </li>
          <li>
            <a href="index.html">Vegan</a>
          </li>
          <li>
            <a href="index.html">Sem glúten</a>
          </li>
        </ul>
        <a className="button" href="index.html">
          Visitar site
        </a>
      </div>
    </div>
  );
}

export default App;
