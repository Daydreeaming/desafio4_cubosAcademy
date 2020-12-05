import "./style.css";
import arrow_left from "../../imagens/chevron-left.svg";
import arrow_right from "../../imagens/chevron-right.svg";
import printer from "../../imagens/printer.svg";
import { AuthContext } from "../../components/AuthProvider";
import React, { useContext, useState } from "react";
import AuthServices from "../../services/auth";
import moment from "moment";

function ListarCobrancas() {
  const [cobrancas, setCobrancas] = useState([]);
  const { token } = useContext(AuthContext);
  const [isTrue, setIsTrue] = useState(false);


  React.useEffect(() => {
    getCobrancas(token);
  }, []);

  async function getCobrancas(token) {
    try {
      const resp = await AuthServices.getCobrancas(token);
      console.log(resp);
      setCobrancas(resp.dados.cobrancas);
    } catch (error) {
      console.log(error);
    }
  }

  async function atualizarCobranca(idDaCobranca) {
	  try {
		  const resp = await AuthServices.atualizarCobranca(idDaCobranca, token)
		  console.log(resp)
	  } catch (error) {
		  console.log(error)
	  } finally {
		getCobrancas(token)
	  }
  } 

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

      {cobrancas.length === 0 && <span> Não existe cobranças </span>}
      {cobrancas.map((cobrancas) => (
        <ul className="table_item">
          <li>{cobrancas.nome}</li>
          <li>{cobrancas.descricao}</li>
          <li>R$ {cobrancas.valor}</li>
          <div className="isPaid">
            <label className="switch">
              <input type="checkbox" value={isTrue} onChange={()=>{
				  setIsTrue(!isTrue)
				  atualizarCobranca(cobrancas.id)
				  }}/>
              <span className="slider round"></span>
            </label>
            <li>{ isTrue ? "PAGO" : "PENDENTE" } </li>
          </div>
          <li>{moment(cobrancas.vencimento).format("DD/MM/YYYY")}</li>
          <li>
            <button>
              <img src={printer} />
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
  );
}

export default ListarCobrancas;
