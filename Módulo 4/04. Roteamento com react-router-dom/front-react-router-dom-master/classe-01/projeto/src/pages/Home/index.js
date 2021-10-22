import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <div>
        Home: Na home poderemos acessar as rotas{" "}
        <Link to="/perfil">Perfil</Link> e <Link to="/perfil">Login</Link> por
        links ou botões.
      </div>
    </div>
  );
}

export default Home;
