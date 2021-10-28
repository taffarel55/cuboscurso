import { useEffect, useRef, useState } from "react";
import useAPI from "../../hooks/useAPI";
import useAuth from "../../hooks/useAuth";
import plus from "./imgs/plus.svg";
import "./index.css";

function Modal({ modal, setModal, setLista, id, remove }) {
  const auth = useAuth();
  const api = useAPI();
  const [popup, setPopup] = useState(false);

  const nome = useRef("");
  const email = useRef("");
  const telefone = useRef("");

  useEffect(() => {
    async function getContact() {
      const resposta = await api.contatos("GET", true, id);
      const data = await resposta.json();
      if (nome.current) nome.current.value = data.nome;
      if (email.current) email.current.value = data.email;
      if (telefone.current) telefone.current.value = data.telefone;
    }
    if (id && !remove) {
      getContact();
    }
  }, [api, id, remove]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formulario;
    let body;
    if (!remove) {
      formulario = e.target.elements;
      body = {
        nome: formulario.nome.value,
        email: formulario.email.value,
        telefone: formulario.telefone.value,
      };
    }

    try {
      const resposta = await api.contatos(
        id ? (remove ? "DELETE" : "PUT") : "POST",
        true,
        id,
        body
      );

      if (resposta.status !== 200) {
        console.log(
          `Deu erro n${
            id ? (remove ? "a remoção" : "a edição") : "o cadastro"
          } do usuário`
        );
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
      if (!id && modal) {
        nome.current.value = "";
        email.current.value = "";
        telefone.current.value = "";
      }

      setTimeout(() => {
        setPopup(false);
        setModal(false);
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
                {`${
                  remove
                    ? "Confirmar exclusão?"
                    : (id ? "Editar" : "Novo") + " Contato"
                }`}
              </div>
              <div className="close-icon" onClick={() => setModal(false)}>
                <img src={plus} alt="" />
              </div>
            </div>

            <div className="modal-inputs">
              {remove && (
                <div className="modal-confirmation">Deseja excluir o contato, {auth.usuario.nome}?</div>
              )}
              {!remove && (
                <>
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
                </>
              )}
              <div className="buttons">
                <button type="submit" className="btn sucess">
                  {`${id ? (remove ? "Excluir" : "Editar") : "Adicionar"}`}
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
