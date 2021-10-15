import { useState } from "react";
import useUser from "../../hooks/useUser";
import "./styles.css";

function EditProfile() {
  const {setName, setAge} = useUser();
  const [localName, setLocalName] = useState("");
  const [localAge, setLocalAge] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!localName) {
      return;
    }
    setName(localName);
    setAge(localAge);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome
        <input
          onChange={(e) => setLocalName(e.target.value)}
          value={localName}
        />
      </label>
      <label>
        Idade
        <input onChange={(e) => setLocalAge(e.target.value)} value={localAge} />
      </label>
      <button>Editar</button>
    </form>
  );
}

export default EditProfile;
