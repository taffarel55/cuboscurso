import { useHistory } from "react-router-dom";
import Table from "../../components/Table";
import useAuth from "../../hooks/useAuth";
import logout from "../../imgs/Vector.svg";
import "./style.css";
import Modal from "../../components/Modal";
import { useState } from "react";

function Home() {
  const auth = useAuth();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [lista, setLista] = useState([]);
  return (
    <div className="Home">
      <header>
        KONTACTS{" "}
        <img
          onClick={() => auth.deslogar(() => history.push("/login"))}
          src={logout}
          alt="Imagem com uma seta para deslogar"
        />
      </header>
      <div className="content">
        <button className="btn sucess" onClick={() => setModal(true)}>
          Adicionar
        </button>
        <Table lista={lista} setLista={setLista} />
        {modal && (
          <Modal modal={modal} setModal={setModal} setLista={setLista} />
        )}
      </div>
    </div>
  );
}

export default Home;
