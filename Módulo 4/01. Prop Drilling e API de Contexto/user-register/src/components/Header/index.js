import "./styles.css";
import useUser from "../../hooks/useUser";

function Header() {
  const { name } = useUser();
  return <header>Bem vindo {name}!</header>;
}

export default Header;
