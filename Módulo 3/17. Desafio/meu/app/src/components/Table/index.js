import "./index.css";

import upArrow from "./imgs/up.svg";
import downArrow from "./imgs/down.svg";
import edit from "./imgs/edit.svg";
import remove from "./imgs/remove.svg";

import { useState, useEffect } from "react";

import Modal from "../Modal";

function Tooltip({ id, load }) {
  const [estado, setEstado] = useState("");

  function handleClick({ target: t }) {
    setEstado(parseInt(t.alt));
  }

  async function handleDelete(id) {
    try {
      await fetch("http://localhost:3334/transactions/" + id, {
        method: "DELETE",
      });
      await load();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`tooltip${estado === id ? " active" : ""}`}>
      <img src={remove} alt={id} onClick={handleClick} />
      <div className="container-confirm-delete">
        Apagar item?
        <div className="btn-actions">
          <div
            className="btn-actions-confirm-delete blue"
            onClick={() => handleDelete(id)}
          >
            Sim
          </div>
          <div
            className="btn-actions-confirm-delete red"
            onClick={() => setEstado("")}
          >
            Não
          </div>
        </div>
      </div>
    </div>
  );
}

function TableLine({ reg, load, setModal, setRegEditar }) {
  const { date, week_day, description, category, value, type, id } = reg;

  function handleEdit(date, week_day, description, category, type) {
    setModal(true);
    setRegEditar({ date, week_day, description, category, type });
  }

  return (
    <div className="table-line">
      <span className="line-items">
        {new Date(date).toLocaleDateString("pt-br")}
      </span>
      <span className="line-items">{week_day}</span>
      <span className="line-items">{description}</span>
      <span className="line-items">{category}</span>
      <span
        className={`line-items ${
          type === "credit" ? "in" : type === "debit" ? "out" : ""
        }`}
      >
        {`${type === "credit" ? "" : "-"} R$ ${(value / 100)
          .toFixed(2)
          .replace(".", ",")}`}
      </span>
      <span className="line-items ">
        <div className="icons">
          <img
            src={edit}
            alt=""
            onClick={() =>
              handleEdit(date, week_day, description, category, type)
            }
          />
          <Tooltip load={load} key={id} id={id} />
        </div>
      </span>
    </div>
  );
}

function Table({ lista, load }) {
  const [modal, setModal] = useState(false);
  const [regEditar, setRegEditar] = useState();
  const [ordenacao, setOrdenacao] = useState({ tipo: "date", asc: true });
  const [listaOrdenada, setListaOrdenada] = useState([]);

  function handleOrdenar(tipo) {
    if (ordenacao.tipo === tipo) {
      setOrdenacao({ ...ordenacao, asc: !ordenacao.asc });
      console.log("Mudei a ordenação");
      return;
    }
    setOrdenacao({ tipo, asc: true });
    console.log("Setei uma nova ordenação");
  }

  useEffect(()=>{
    const asc = ordenacao.asc ? 1 : -1;
    console.log("Vou ordenar");
    if (ordenacao.tipo === "date") {
      setListaOrdenada(
        lista.sort((a, b) => asc * (new Date(a.date) - new Date(b.date)))
      );
    }

    if (ordenacao.tipo === "week_day") {
      setListaOrdenada(lista.sort((a, b) => asc * (a.week_day - b.week_day)));
    }

    if (ordenacao.tipo === "value") {
      setListaOrdenada(lista.sort((a, b) => asc * (a.value - b.value)));
    }
  },[lista, ordenacao.asc, ordenacao.tipo])

  return (
    <div className="table">
      <TableHead ordenacao={ordenacao} handleOrdenar={handleOrdenar} />
      <div className="table-body">
        {listaOrdenada.map((item, index) => (
          <TableLine
            setModal={setModal}
            load={load}
            key={index}
            reg={item}
            setRegEditar={setRegEditar}
          />
        ))}
      </div>
      <Modal
        modal={modal}
        setModal={setModal}
        load={load}
        regEditar={regEditar}
      />
    </div>
  );
}

function TableHead({ ordenacao, handleOrdenar }) {
  return (
    <div className="table-head">
      <span
        onClick={() => handleOrdenar("date")}
        className="column-title"
        id="date"
      >
        Data
        {ordenacao.tipo === "date" && (
          <img src={ordenacao.asc ? upArrow : downArrow} alt="" />
        )}
      </span>
      <span
        onClick={() => handleOrdenar("week_day")}
        className="column-title"
        id="week-day"
      >
        Dia da semana
        {ordenacao.tipo === "week_day" && (
          <img src={ordenacao.asc ? upArrow : downArrow} alt="" />
        )}
      </span>
      <span className="column-title">Descrição</span>
      <span className="column-title">Categoria</span>
      <span
        onClick={() => handleOrdenar("value")}
        className="column-title"
        id="value"
      >
        Valor
        {ordenacao.tipo === "value" && (
          <img src={ordenacao.asc ? upArrow : downArrow} alt="" />
        )}
      </span>
      <div className="column-title"></div>
    </div>
  );
}

export default Table;
