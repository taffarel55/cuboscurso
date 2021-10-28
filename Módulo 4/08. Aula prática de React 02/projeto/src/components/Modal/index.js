import "./index.css";
import plus from "./imgs/plus.svg";
import { useState, useRef, useEffect } from "react";
import useAPI from "../../hooks/useAPI";

function Modal({ modal, setModal, setLista, id }) {
  const api = useAPI();
  const [popup, setPopup] = useState(false);

  const nome = useRef(null);
  const email = useRef(null);
  const telefone = useRef(null);

  useEffect(() => {
    async function getContact() {
      const resposta = await api.contatos("GET", true, id);
      const data = await resposta.json();
      nome.current.value = data.nome;
      email.current.value = data.email;
      telefone.current.value = data.telefone;
    }
    if (id) {
      getContact();
    }
  }, [api, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formulario = e.target.elements;

    const body = {
      nome: formulario.nome.value,
      email: formulario.email.value,
      telefone: formulario.telefone.value,
    };

    console.log(body);

    try {
      const resposta = await api.contatos("POST", true, body);

      console.log(resposta);

      if (resposta.status !== 200) {
        console.log("Deu erro no cadastro do usuário");
        return;
      }

      const response = await api.contatos("GET", true);
      const { status } = response;
      const data = await response.json();

      if (!status === 200) {
        console.log(`Erro: ${data}`);
      }
      setLista(data);

      setPopup(`${id ? "Editado" : "Adicionado"} com sucesso`);
      setTimeout(() => {
        setPopup(false);
        if (!id) {
          nome.current.value = "";
          email.current.value = "";
          telefone.current.value = "";
          setModal(false);
        }
      }, 1000);
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
                {`${id ? "Editar" : "Novo"}`} Contato
              </div>
              <div className="close-icon" onClick={() => setModal(false)}>
                <img src={plus} alt="" />
              </div>
            </div>

            <div className="modal-inputs">
              <div className="modal-input-div">
                <input
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  ref={nome}
                ></input>
              </div>
              <div className="modal-input-div">
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  ref={email}
                ></input>
              </div>
              <div className="modal-input-div">
                <input
                  name="telefone"
                  placeholder="Telefone"
                  ref={telefone}
                ></input>
              </div>
              <div className="buttons">
                <button type="submit" className="btn sucess">
                  {`${id ? "Editar" : "Adicionar"}`}
                </button>
                <button
                  onClick={() => setModal(false)}
                  type="submit"
                  className="btn danger"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {popup && <div className="popup">{popup}</div>}
    </div>
  );
}

export default Modal;
