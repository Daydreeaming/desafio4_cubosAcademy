import "./style.css";
import arrow_left from "../../imagens/chevron-left.svg";
import arrow_right from "../../imagens/chevron-right.svg";
import printer from "../../imagens/printer.svg";

function ListarCobrancas() {
  return (
    <div className="box_billing">
      <div className="input_container">
        <input type="text" placeholder="Procurar por Nome, E-mail ou CPF" />
        <button className="input_button">Buscar</button>
      </div>

      <ul className="table_header">
        <li>Cliente</li>
        <li>Descrição</li>
        <li>Valor</li>
        <li>Status</li>
        <li>Vencimento</li>
        <li>Boleto</li>
      </ul>

      <ul className="table_item">
        <li>Nome da Cliente</li>
        <li>Pagamento referente ao...</li>
        <li>R$ 00.000.00</li>
        <div className="isPaid">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <li>Pendente</li>
        </div>
        <li>10/10/10</li>
        <li>
          <button>
            <img src={printer} />
          </button>
        </li>
      </ul>

      <div className="pagination">
        <img src={arrow_left} />
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <img src={arrow_right} />
      </div>
    </div>
  );
}

export default ListarCobrancas;
