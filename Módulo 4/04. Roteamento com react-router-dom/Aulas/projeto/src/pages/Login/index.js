import { Link, useHistory } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Login() {
  const auth = useAuth();
  const history = useHistory();
  return (
    <div className="Login">
      <h1>Login</h1>
      <div>
        <Link to="/">Home</Link> {">"} Login
      </div>
      <form>
        <label>
          Usuário:
          <input type="text"></input>
        </label>
        <label>
          Senha:
          <input type="password"></input>
        </label>
        <button onClick={() => auth.logar(() => history.push("/profile"))}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
