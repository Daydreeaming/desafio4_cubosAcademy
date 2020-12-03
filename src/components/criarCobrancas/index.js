import "./style.css";
import avatar from "../../imagens/avatar.svg";
import { Link } from "react-router-dom";

function CriarCobrancas() {
  return (
    <>
      <img src={avatar} className="avatar_img" />
      <div className="add_charges">
        <span>//CRIAR COBRANÇAS</span>
        <form className="form_charges">
          <div className="fill_form">
            <div className="field_charges">
              <span>Cliente</span>
              <select>
                <option value="" disabled selected>
                  Selecione a cliente
                </option>
                <option value="select_client">Nome da cliente 1</option>
                <option value="select_client">Nome da cliente 2</option>
                <option value="select_client">Nome da cliente 3</option>
                <option value="select_client">Nome da cliente 4</option>
              </select>
            </div>

            <div className="field_charges">
              <span>Descrição</span>
              <input
                type="email"
                placeholder="Referente ao pagamento da compra online."
              ></input>
              <span>A descrição será impressa no boleto</span>
            </div>

            <div className="valor_vencimento">
              <div className="field_charges">
                <span>Valor</span>
                <input type="text" placeholder="R$ 32,90"></input>
              </div>

              <div className="field_charges">
                <span>Vencimento</span>
                <input type="date"></input>
              </div>
            </div>
            <div className="buttons_form">
              <Link to="/dashboard" className="button_form1">
                Cancelar
              </Link>
              <Link to="/dashboard" className="button_form2">
                Criar cobranças
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CriarCobrancas;
