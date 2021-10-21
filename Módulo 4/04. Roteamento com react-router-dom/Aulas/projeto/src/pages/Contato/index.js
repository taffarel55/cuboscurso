import { Link } from "react-router-dom";

function Contato() {
  return (
    <div className="Contato">
      <h1>Contato</h1>
      <div>
        <Link to="/">Home</Link> {">"} Contato
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum!
      </p>
    </div>
  );
}

export default Contato;
