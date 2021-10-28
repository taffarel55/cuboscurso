import { Link, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import pageImage from "../../imgs/ImagemEsquerda.svg";
import "./style.css";
import { useState } from "react";

function Login() {
  const auth = useAuth();
  const history = useHistory();
  const [formulario, setFormulario] = useState({ email: "", senha: "" });

  function handleChange(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  return (
    <div className="Login">
      <div className="page-image">
        <img
          src={pageImage}
          alt="Mulher segurando um celular com a tela do celular em uma pesquisa sobre viagens no Google"
        ></img>
      </div>
      <div className="page-content">
        <div className="page-container">
          <h4>Bem vindo</h4>
          <h1>Faça o login com sua conta</h1>
          <form onSubmit={(e) => e.preventDefault()}>
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
              onClick={() => auth.logar(formulario, () => history.push("/"))}
            >
              Login
            </button>
            <p>
              Não tem cadastro? <Link to="/cadastro">Clique aqui!</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
