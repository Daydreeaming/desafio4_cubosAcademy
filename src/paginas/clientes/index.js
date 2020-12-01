import "./style.css";
import { Link } from "react-router-dom";
import NavMenuHome from "./../../components/menuNavegacao";
import SaldoNaConta from "./../../components/saldoNaConta";
import carta from "../../imagens/carta.svg";
import phone from "../../imagens/phone.svg";
import editar from "../../imagens/editar.svg";
import arrow_left from "../../imagens/chevron-left.svg";
import arrow_right from "../../imagens/chevron-right.svg";

function Clientes() {
  return (
    <div>
      <div className="box_home">
        <div className="box_home_left">
          <NavMenuHome></NavMenuHome>
        </div>

        <div className="box_home_right">
          <SaldoNaConta></SaldoNaConta>
          <div className="client_body">
            <div className="client_search_add">
              <Link to="#">
                <button className="button_client">Adicionar Cliente</button>
              </Link>
              <input
                type="text"
                placeholder="Procurar por Nome, E-mail ou CPF"
              ></input>
            </div>

            <table className="all_clients">
              <thead className="table_head">
                <tr className="table_informations_clients">
                  <th>Cliente</th>
                  <th>Cobranças Feitas</th>
                  <th>Cobranças Recebidas</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="table_body">
                <tr className="tr_contains">
                  <td className="client_info">
                    <span className="name_client">
                      Nome e Sobrenome da Cliente
                    </span>
                    <div className="info_email">
                      <img src={carta} />
                      <span>email@email.com</span>
                    </div>

                    <div className="info_phone">
                      <img src={phone} />
                      <span>(DDD) 00000-0000</span>
                    </div>
                  </td>

                  <td>
                    <span className="amizade">R$ 00.000,00</span>
                  </td>

                  <td>
                    <span className="amizade">R$ 00.000,00</span>
                  </td>

                  <td>
                    <span className="amizade">Em dia</span>
                  </td>

                  <td>
                    <button>
                      <img src={editar} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

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
        </div>
      </div>
    </div>
  );
}

export default Clientes;
