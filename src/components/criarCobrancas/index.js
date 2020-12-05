import "./style.css";
import avatar from "../../imagens/avatar.svg";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import AuthServices from "../../services/auth";
import { AuthContext } from "../AuthProvider";

function CriarCobrancas() {
  const [idDoCliente, setIdDocliente] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [vencimento, setVencimento] = useState("");
  const navegation = useHistory();
  const { token } = useContext(AuthContext);

  async function cadastrarCobrancas(idDoCliente, descricao, valor, vencimento) {
    try {
      const resp = await AuthServices.cadastrarCobrancas(
        idDoCliente,
        descricao,
        valor,
        vencimento,
        token
      );
      navegation.push("/");
      alert(resp);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <img src={avatar} className="avatar_img" />
      <div className="add_charges">
        <span>//CRIAR COBRANÇAS</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            cadastrarCobrancas(idDoCliente, descricao, valor, vencimento);
          }}
          className="form_charges"
        >
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
                value={descricao}
                onChange={(text) => setDescricao(text.target.value)}
                type="text"
                placeholder="Referente ao pagamento da compra online."
              ></input>
              <span>A descrição será impressa no boleto</span>
            </div>

            <div className="valor_vencimento">
              <div className="field_charges">
                <span>Valor</span>
                <input
                  value={valor}
                  onChange={(text) => setValor(text.target.value)}
                  type="text"
                  placeholder="R$ 32,90"
                ></input>
              </div>

              <div className="field_charges">
                <span>Vencimento</span>
                <input
                  value={vencimento}
                  onChange={(text) => setVencimento(text.target.value)}
                  type="date"
                ></input>
              </div>
            </div>

            <div className="buttons_form">
              <Link to="/dashboard" className="button_form1">
                Cancelar
              </Link>

              <Link
                className="button_form2"
                onClick={(e) => {
                  e.preventDefault();
                  cadastrarCobrancas(idDoCliente, descricao, valor, vencimento);
                }}
              >
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
