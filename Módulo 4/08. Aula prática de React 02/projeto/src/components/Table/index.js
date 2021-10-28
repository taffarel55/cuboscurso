import { useCallback, useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";
import edit from "./imgs/edit.svg";
import remove from "./imgs/remove.svg";
import "./index.css";
import Modal from "../../components/Modal";

function Table({ lista, setLista }) {
  const api = useAPI();
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(false) 

  const getData = useCallback(async () => {
    const response = await api.contatos("GET", true);
    const { status } = response;
    const data = await response.json();

    if (!status === 200) {
      console.log(`Erro: ${data}`);
    }
    setLista(data);
    // eslint-disable-next-line
  }, []);

  useEffect(() => getData(), [getData]);

  return (
    <div className="table">
      <TableHead />
      <div className="table-body">
        {lista.map((item, index) => (
          <TableLine key={index} item={item} setModal={setModal} setId={setId}/>
        ))}
      </div>
      {modal && (
        <Modal
          modal={modal}
          setModal={setModal}
          setLista={setLista}
          id={id}
        />
      )}
    </div>
  );
}

function TableHead() {
  return (
    <div className="table-head">
      <span className="column-title">Nome</span>
      <span className="column-title">Email</span>
      <span className="column-title">Telefone</span>
      <div className="column-title"></div>
    </div>
  );
}

function TableLine({ item, setModal, setId }) {
  const { nome, email, telefone } = item;
  
  function handleClick() {
    setModal(true);
    setId(item.id);
  }

  return (
    <div className="table-line">
      <span className="line-items">{nome}</span>
      <span className="line-items">{email}</span>
      <span className="line-items">{telefone}</span>
      <span className="line-items ">
        <div className="icons">
          <img onClick={handleClick} src={edit} alt="" />
          <img src={remove} alt="" />
        </div>
      </span>
    </div>
  );
}

export default Table;
