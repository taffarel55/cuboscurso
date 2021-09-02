function Botao(props) {
  return <button>{props.texto+" "+props.children}</button>;
}

function App() {
  return (
    <div className="App">
      <Botao texto="Olá">
        Filhinho
      </Botao>
    </div>
  );
}

export default App;
