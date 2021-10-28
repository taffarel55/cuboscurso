import { Link, useHistory } from "react-router-dom";
import "./style.css";
import pageImage from "../../imgs/ImagemDireita.svg";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";

function Cadastro() {
  const auth = useAuth();
  const history = useHistory();
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  function handleChange(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  return (
    <div className="Cadastro">
      <div className="page-image">
        <img src={pageImage} alt="Imagem de uma bolsa marrom"></img>
      </div>
      <div className="page-content">
        <div className="page-container">
          <h2>Cadastre-se</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              value={formulario.nome}
              onChange={handleChange}
            ></input>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={formulario.email}
              onChange={handleChange}
            ></input>
            <input
              type="password"
              placeholder="Senha"
              name="senha"
              value={formulario.senha}
              onChange={handleChange}
            ></input>
            <button
              className="btn sucess"
              onClick={() =>
                auth.cadastrar(formulario, () => history.push("/login"))
              }
            >
              Cadastrar
            </button>
            <button
              className="btn danger"
              onClick={() => history.push("/login")}
            >
              Cancelar
            </button>
            <p>
              Já tem cadastro? <Link to="/login">Clique aqui!</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
