import "./App.css";

import Resume from "./components/Resume/";
import Table from "./components/Table";
import Filter from "./components/Filter/";
import Modal from "./components/Modal/";

import logo from "./logo.svg";
import filter from "./filter.svg";

import { useState, useEffect } from "react";

function App() {
  const [lista, setLista] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [modal, setModal] = useState(false);
  const [transacoes, setTransacoes] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [filtro, setFiltro] = useState({
    semana: [],
    categoria: [],
    min: "",
    max: "",
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    setCategorias([...new Set(lista.map((l) => l.category))].filter((e) => e));
    setDiasSemana([...new Set(lista.map((l) => l.week_day))].filter((e) => e));
  }, [lista]);

  useEffect(() => {
    const inp = listaFiltrada.reduce((acc, item) => {
      if (item.type === "credit") return acc + item.value / 100;
      else return acc;
    }, 0);
    const out = listaFiltrada.reduce((acc, item) => {
      if (item.type === "debit") return acc + item.value / 100;
      else return acc;
    }, 0);
    setTransacoes({ inp, out });
  }, [listaFiltrada]);

  const loadTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3334/transactions", {
        method: "GET",
      });

      const data = await response.json();

      setLista(data);
      setListaFiltrada(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header>
        <img className="logo" src={logo} alt="logo"></img>
      </header>
      <div className="AppBody">
        <div
          className="filter box"
          onClick={() => {
            setFilterState(!filterState);
          }}
        >
          <img src={filter} alt="filter"></img>
          <span>Filtrar</span>
        </div>

        <div className="main">
          <div className="details">
            <div className={filterState ? "" : "hide"}>
              <Filter
                key={"filter"}
                filtro={filtro}
                setFiltro={setFiltro}
                lista={lista}
                setListaFiltrada={setListaFiltrada}
                categorias={categorias}
                diasSemana={diasSemana}
              />
            </div>
            <Table
              lista={listaFiltrada}
              load={loadTransactions}
              filtro={filtro}
            />
          </div>
          <div className="container-resume">
            <Resume inp={transacoes.inp} out={transacoes.out} />
            <div className="btn-add" onClick={() => setModal(true)}>
              Adicionar Registro
            </div>
          </div>
        </div>
      </div>
      <Modal
        modal={modal}
        setModal={setModal}
        load={loadTransactions}
        regEditar={false}
      />
    </div>
  );
}

export default App;
