import "./style.css";
import { Link } from "react-router-dom";
import logoCubos from "../../imagens/logoCubosBranco.svg";
import home from "../../imagens/home.svg";
import money from "../../imagens/money.svg";
import clients from "../../imagens/pessoas.svg";

function NavMenuHome() {
  return (
    <div className="box_home_left">
      <img src={logoCubos} className="logoCubosWhite" />

      <ul className="nav_menu">
        <li className="nav_list">
          <img src={home} />
          <Link to="/dashboard">HOME</Link>
        </li>

        <li className="nav_list">
          <img src={money} />
          <Link to="/dashboard/cobrancas">COBRANÇAS</Link>
        </li>

        <li className="nav_list">
          <img src={clients} />
          <Link to="/dashboard/clientes" className>
            CLIENTES
          </Link>
        </li>
      </ul>

      <Link className="nav_button">Criar cobrança</Link>
    </div>
  );
}

export default NavMenuHome;
