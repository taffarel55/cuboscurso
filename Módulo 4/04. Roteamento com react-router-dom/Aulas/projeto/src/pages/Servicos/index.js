import { Link } from "react-router-dom";

function Servicos() {
  return (
    <div className="Servicos">
      <h1>Servicos</h1>
      <div>
        <Link to="/">Home</Link> {">"} Servicos
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

export default Servicos;
