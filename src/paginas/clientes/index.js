import "./style.css";
import { Link } from "react-router-dom";
import NavMenuHome from "./../../components/menuNavegacao";
import SaldoNaConta from "./../../components/saldoNaConta";
import carta from "../../imagens/carta.svg";
import phone from "../../imagens/phone.svg";
import editar from "../../imagens/editar.svg";
import arrow_left from "../../imagens/chevron-left.svg";
import arrow_right from "../../imagens/chevron-right.svg";
import AuthServices from "../../services/auth";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/AuthProvider";

function ListaDeClientes() {
  const [clientes, setClientes] = useState([]);
  const { token } = useContext(AuthContext);

  React.useEffect(() => {
    getClientes(token);
  }, []);

  async function getClientes(token) {
    try {
      const resp = await AuthServices.getClientes(token);
      setClientes(resp.dados.clientes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="box_home">
        <div className="box_home_left">
          <NavMenuHome></NavMenuHome>
        </div>

        <div className="box_home_right">
          <SaldoNaConta />
          <div className="client_body">
            <div className="client_search_add">
              <Link to="/dashboard/cadastrarCliente">
                <button className="button_client">Adicionar Cliente</button>
              </Link>
              <input
                type="text"
                placeholder="Procurar por Nome, E-mail ou CPF"
              ></input>
            </div>

            <ul className="table_header_clients">
              <li>Cliente</li>
              <li>Cobranças Feitas</li>
              <li>Cobranças Recebidas</li>
              <li>Status</li>
            </ul>

            {clientes.length === 0 && <span>Não existe clientes</span>}
            {clientes.map((cliente) => (
              <ul className="table_item_clients">
                <li>
                  <span>{cliente.nome}</span>
                  <span>
                    <img src={carta} />
                    {cliente.email}
                  </span>
                  <span>
                    <img src={phone} />
                    (DDD) 00000-0000
                  </span>
                </li>
                <li>R${cliente.cobrancasfeitas}</li>
                <li>R${cliente.cobrancasrecebidas}</li>
                <div className="isPaid">
                  <li>
                    {clientes.estaInadimplente === true ? (
                      <span style={{ color: "red" }}>Inadimplente</span>
                    ) : (
                      <span style={{ color: "green" }}>Em dia</span>
                    )}
                  </li>
                </div>
                <li>
                  <img src={editar}></img>
                </li>
                <li>
                  <button>
                    <img />
                  </button>
                </li>
              </ul>
            ))}

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

export default ListaDeClientes;
