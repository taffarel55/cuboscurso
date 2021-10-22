import { Link, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

function Profile() {
  const [usuario, setUsuario] = useState({});
  const auth = useAuth();

  async function fetchUser(user) {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      const data = await response.json();
      setUsuario(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUser(auth.token);
  }, [auth.token]);

  const history = useHistory();
  return (
    <div className="Profile">
      <h1>Profile</h1>
      <div>
        <Link to="/">Home</Link> {">"} Profile
      </div>
      <div>
        Perfil: Na página de perfil poderemos acessar a rota{" "}
        <Link to="/">Home</Link> e <Link to="/login">Login</Link> por links ou
        botões. Essa rota deverá ser protegida, somente podendo ser acessada
        quando o usuário estiver logado (represente isso no estado da sua
        aplicação).
      </div>
      <p>Olá {usuario.name}!</p>
      <img width="100px" src={usuario.avatar_url} alt="" />
      <p>{usuario.bio}</p>
      <button onClick={() => auth.deslogar(() => history.push("/home"))}>
        Deslogar
      </button>
    </div>
  );
}

export default Profile;
