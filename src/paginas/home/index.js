import { Link } from "react-router-dom";
import NavMenuHome from "./../../components/menuNavegacao";
import SaldoNaConta from "./../../components/saldoNaConta";
import InformacaoHome from "./../../components/informacaoHome";
import "./styles.css";

function Home() {
  return (
    <div className="box_home">
      <div className="box_home_left">
        <NavMenuHome></NavMenuHome>
      </div>

      <div className="box_home_right">
        <SaldoNaConta />
        <InformacaoHome></InformacaoHome>
      </div>
    </div>
  );
}

export default Home;
