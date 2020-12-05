import "./style.css";
import users from "../../imagens/users.svg";
import money from "../../imagens/money.svg";

function InformacaoHome(props) {
  const { data } = props;

  return (
    <div className="main_menu_home">
      <ul className="main_menu">
        <li className="menu_option">Este mês</li>
        <li className="menu_option">Este ano</li>
        <li className="menu_option">Desde o início</li>
      </ul>

      <div className="home_body_principal">
        <div className="containers">
          <div className="containers_header">
            <img src={users} />
            <span>Clientes</span>
          </div>

          <div className="containers_body">
            <div className="style_containers_green">
              <span className="span_container1">Em dia</span>
              <span className="span_container2">
                {data?.qtdClientesAdimplentes}
              </span>
            </div>

            <div className="style_containers_red">
              <span className="span_container1">Inadimplentes</span>

              <span className="span_container2">
                {data?.qtdClientesInadimplentes}
              </span>
            </div>
          </div>
        </div>

        <div className="containers">
          <div className="containers_header">
            <img src={money} />
            <span>Cobranças</span>
          </div>

          <div className="containers_body">
            <div className="style_containers_blue">
              <span className="span_container1">Em dia</span>

              <span className="span_container2">
                {data?.qtdCobrancasPrevistas}
              </span>
            </div>

            <div className="style_containers_red">
              <span className="span_container1">Vencidas</span>

              <span className="span_container2">
                {data?.qtdCobrancasVencidas}
              </span>
            </div>

            <div className="style_containers_green">
              <span className="span_container1">Pagas</span>

              <span className="span_container2">{data?.qtdCobrancasPagas}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformacaoHome;
