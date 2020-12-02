import "./style.css";
import money2 from "../../imagens/money2.svg";
import avatar from "../../imagens/avatar.svg";

function SaldoNaConta() {
  return (
    <header className="count_bank">
      <div className="balance_informations">
        <div className="card_header">
          <img src={money2} className="money2" />
          <span>Saldo em conta</span>
        </div>
        <span className="balance">R$ 0,00</span>
      </div>
      <img src={avatar} className="avatar_home" />
    </header>
  );
}

export default SaldoNaConta;
