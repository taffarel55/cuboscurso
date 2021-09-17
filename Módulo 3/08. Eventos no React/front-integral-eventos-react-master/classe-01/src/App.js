import React, { useState } from "react";

function Tarefa(props) {
  return (
    <li>
      <div
        className={props.done ? "done" : ""}
        onClick={() => props.handleComplete(props.id)}
      >
        {props.children}
      </div>
      <div
        className="btn-close"
        onClick={() => props.handleDelete(props.id)}
      ></div>
    </li>
  );
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [estado, setEstado] = useState("todas");

  function handleKeyDown(event) {
    if (event.key !== "Enter") return;
    if (event.target.value === "") return;
    setTarefas([
      ...tarefas,
      { key: +new Date(), valor: event.target.value, done: false },
    ]);
    event.target.value = "";
  }

  function handleDelete(id) {
    const novasTarefas = tarefas.filter((t) => {
      return t.key !== id;
    });
    setTarefas(novasTarefas);
  }

  function handleComplete(id) {
    const novasTarefas = [...tarefas];
    const tarefaCompletada = novasTarefas.find((t) => t.key === id);
    tarefaCompletada.done = !tarefaCompletada.done;
    setTarefas(novasTarefas);
  }

  function handleEstado(estado) {
    setEstado(estado);
  }

  function limparCompletadas() {
    const novasTarefas = tarefas.filter((t) => {
      return !t.done;
    });
    setTarefas(novasTarefas);
  }

  return (
    <div className="App">
      <h1>Tarefas</h1>
      <input placeholder="Criar uma nova tarefa" onKeyDown={handleKeyDown} />
      <ul>
        {// eslint-disable-next-line
          tarefas.map((tarefa) => {
          if (
            estado === "todas" ||
            (estado === "ativas" && !tarefa.done) ||
            (estado === "completadas" && tarefa.done)
          )
            return (
              <Tarefa
                key={tarefa.key}
                id={tarefa.key}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
                done={tarefa.done}
              >
                {tarefa.valor}
              </Tarefa>
            );
        })}
        <li className="opcoes">
          <div>
            {tarefas.reduce((acc, t) => (!t.done ? acc + 1 : acc), 0)} items
            restantes
          </div>
          <div className="filtro">
            <div
              className={estado === "todas" ? "ativo" : ""}
              onClick={() => handleEstado("todas")}
            >
              Todas
            </div>
            <div
              className={estado === "ativas" ? "ativo" : ""}
              onClick={() => handleEstado("ativas")}
            >
              Ativas
            </div>
            <div
              className={estado === "completadas" ? "ativo" : ""}
              onClick={() => handleEstado("completadas")}
            >
              Completadas
            </div>
          </div>
          <div onClick={limparCompletadas}>Limpar Completadas</div>
        </li>
      </ul>
    </div>
  );
}

export default App;
