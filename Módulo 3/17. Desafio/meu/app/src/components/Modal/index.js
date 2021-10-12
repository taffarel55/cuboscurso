import "./index.css";
import plus from "./imgs/plus.svg";
import { useState } from "react";

function Modal({ modal, setModal, load, regEditar }) {
  const [formulario, setFormulario] = useState({
    date: "",
    description: "",
    type: "debit",
    value: "",
  }); 

  async function handleSubmit(e) {
    e.preventDefault();
    var days = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ];
    const date = new Date(+new Date(formulario.date) + 1000 * 60 * 60 * 3);
    console.log(date);
    const week_day = days[date.getDay()];
    const body = {
      date,
      week_day,
      description: formulario.description,
      value: formulario.value * 100,
      category: formulario.category,
      type: formulario.type,
    };
    try {
      await fetch("http://localhost:3334/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setFormulario({
        ...formulario,
        date: "",
        description: "",
        type: "",
        value: "debit",
      });
      await load();
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange({ target: t }) {
    setFormulario({ ...formulario, [t.name]: t.value });
  }

  return (
    <div className={`backdrop ${modal ? "" : "hide"}`}>
      <div className="modal-container">
        <form className="teste" onSubmit={handleSubmit}>
          <div className="modal-items">
            <div className="modal-title">
              <div className="modal-title-text">
                {`${regEditar ? "Editar" : "Adicionar"}`} Registro
              </div>
              <div className="close-icon" onClick={() => setModal(false)}>
                <img src={plus} alt="" />
              </div>
            </div>

            <div className="modal-buttons">
              <div id="credit-button">
                <input
                  id="in"
                  type="radio"
                  name="type"
                  value="credit"
                  onChange={handleChange}
                ></input>
                <label htmlFor="in">Entrada</label>
              </div>
              <div id="debit-button">
                <input
                  id="out"
                  type="radio"
                  name="type"
                  value="debit"
                  onChange={handleChange}
                  required
                ></input>
                <label htmlFor="out">Saída</label>
              </div>
            </div>

            <div className="modal-inputs">
              <div className="modal-input-div">
                <label htmlFor="value">Valor</label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="value"
                  id="value"
                  value={formulario.value}
                  required
                />
              </div>
              <div className="modal-input-div">
                <label htmlFor="category">Categoria</label>
                <select
                  onChange={handleChange}
                  name="category"
                  id="category"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecionar
                  </option>
                  <option value="Contas">Contas</option>
                  <option value="Depósito">Depósito</option>
                  <option value="Lazer">Lazer</option>
                  <option value="TED">TED</option>
                  <option value="Compras">Compras</option>
                  <option value="Pix">Pix</option>
                  <option value="Alimentação">Alimentação</option>
                </select>
              </div>
              <div className="modal-input-div">
                <label htmlFor="date">Data</label>
                <input
                  type="date"
                  onChange={handleChange}
                  name="date"
                  id="date"
                  value={formulario.date}
                  required
                ></input>
              </div>
              <div className="modal-input-div">
                <label htmlFor="description">Descrição</label>
                <input
                  onChange={handleChange}
                  name="description"
                  id="description"
                  value={formulario.description}
                ></input>
              </div>
              <button type="submit" className="btn-insert">
                Confirmar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
