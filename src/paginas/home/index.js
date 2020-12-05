import { Link } from "react-router-dom";
import NavMenuHome from "./../../components/menuNavegacao";
import SaldoNaConta from "./../../components/saldoNaConta";
import InformacaoHome from "./../../components/informacaoHome";
import "./styles.css";
import { useEffect, useContext, useState } from "react";
import AuthServices from "../../services/auth";
import { AuthContext } from "../../components/AuthProvider";

function Home() {
  const [relatorio, setRelatorio] = useState();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getRelatorios(token);
  }, []);

  async function getRelatorios(token) {
    try {	
      const resp = await AuthServices.relatorioDoUsuario(token);
      setRelatorio(resp);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="box_home">
      <div className="box_home_left">
        <NavMenuHome></NavMenuHome>
      </div>

      <div className="box_home_right">
        <SaldoNaConta />
        <InformacaoHome data={relatorio} />
      </div>
    </div>
  );
}

export default Home;
