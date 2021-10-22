import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";

function Login() {
  const auth = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState("");

  return (
    <div className="Login">
      <h1>Login</h1>
      <div>
        <Link to="/">Home</Link> {">"} Login
      </div>
      <div>
        Login: Na página de login poderemos acessar as rotas{" "}
        <Link to="/perfil">Perfil</Link> e <Link to="/">Home</Link> por links ou
        botões.
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Usuário no GitHub:
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>
        <button
          onClick={() => auth.logar(username, () => history.push("/profile"))}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
