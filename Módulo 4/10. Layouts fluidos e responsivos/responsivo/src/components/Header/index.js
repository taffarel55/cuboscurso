import Logo from "../../assets/logo.png";
import Menu from "../Menu";
import "./style.css";

function Header() {
  return (
    <header>
      <img className="logo" src={Logo} alt="Logo" />
      <Menu />
    </header>
  );
}

export default Header;
