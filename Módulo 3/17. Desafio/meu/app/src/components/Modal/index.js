import "./index.css";
import plus from "./imgs/plus.svg";
import { useState, useRef, useEffect } from "react";

function Modal({ modal, setModal, load, regEditar }) {
  const [popup, setPopup] = useState(false);

  const [state, setState] = useState("debit");
  const [id, setID] = useState("");
  const descricao = useRef(null);
  const data = useRef(null);
  const categoria = useRef(null);
  const valor = useRef(null);

  useEffect(() => {
    if (regEditar) {
      descricao.current.value = regEditar.description;
      data.current.value = regEditar.date.toString().split("T")[0];
      categoria.current.value = "Pix";
      valor.current.value = (regEditar.value / 100)
        .toFixed(2)
        .replace(".", ",");
      setState(() => regEditar.type);
      setID(() => regEditar.id);
    }
  }, [regEditar]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formulario = e.target.elements;

    const date = new Date(
      +new Date(formulario.date.value) + 1000 * 60 * 60 * 3
    );

    const week_day = date
      .toLocaleDateString("pt-br", { weekday: "long" })
      .split("-")[0];

    const body = {
      date,
      week_day,
      description: formulario.description.value,
      value: formulario.value.value * 100,
      category: formulario.category.value,
      type: state,
    };

    try {
      await fetch("http://localhost:3334/transactions/" + id, {
        method: regEditar ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!regEditar) {
        setState("debit");
        descricao.current.value = "";
        data.current.value = "dd-mm-aaaa";
        categoria.current.value = "";
        valor.current.value = "";
        setModal(false);
      }

      setPopup(`${regEditar?"Editado":"Adicionado"} com sucesso`);
      setTimeout(() => {
        setPopup(false);
      }, 3000);

      await load();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`backdrop ${modal ? "" : "hide"}`}>
      <div className="modal-container">
        <form className="form" onSubmit={handleSubmit}>
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
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="credit"
                    onChange={(e) => setState(e.target.value)}
                    checked={state === "credit"}
                  />
                  <div>Entrada</div>
                </label>
              </div>
              <div id="debit-button">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="debit"
                    onChange={(e) => setState(e.target.value)}
                    checked={state === "debit"}
                  />
                  <div>Saída</div>
                </label>
              </div>
            </div>

            <div className="modal-inputs">
              <div className="modal-input-div">
                <label htmlFor="value">Valor</label>
                <input
                  type="number"
                  name="value"
                  id="value"
                  ref={valor}
                  step=".01"
                  required
                />
              </div>
              <div className="modal-input-div">
                <label htmlFor="category">Categoria</label>
                <select
                  name="category"
                  id="category"
                  defaultValue=""
                  ref={categoria}
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
                <label htmlFor="dateModal">Data</label>
                <input
                  type="date"
                  name="date"
                  id="dateModal"
                  ref={data}
                  required
                ></input>
              </div>
              <div className="modal-input-div">
                <label htmlFor="description">Descrição</label>
                <input
                  name="description"
                  id="description"
                  ref={descricao}
                ></input>
              </div>
              <button type="submit" className="btn-insert">
                Confirmar
              </button>
            </div>
          </div>
        </form>
      </div>
      {popup && <div className="popup">{popup}</div>}
    </div>
  );
}

export default Modal;
