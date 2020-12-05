import "./style.css";
import money2 from "../../imagens/money2.svg";
import avatar from "../../imagens/avatar.svg";
import { useEffect, useContext, useState } from "react";
import AuthServices from "../../services/auth";
import { AuthContext } from "../../components/AuthProvider";

function SaldoNaConta() {
  const [saldo, setSaldo] = useState(0);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getRelatorios(token);
  }, []);

  async function getRelatorios(token) {
    try {
      const resp = await AuthServices.relatorioDoUsuario(token);
      setSaldo(resp.saldoEmConta);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="count_bank">
      <div className="balance_informations">
        <div className="card_header">
          <img src={money2} className="money2" />
          <span>Saldo em conta</span>
        </div>
        <span className="balance">{`R$ ${saldo/1000}`}</span>
      </div>
      <img src={avatar} className="avatar_home" />
    </header>
  );
}

export default SaldoNaConta;
