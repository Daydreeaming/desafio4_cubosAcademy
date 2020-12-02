import "./style.css";
import avatar from "../../imagens/avatar.svg";
import { Link } from "react-router-dom";

function Cliente() {
  return (
    <>
      <img src={avatar} className="avatar_img" />
      <div className="add_client">
        <span>// ADICIONAR CLIENTE //</span>
        <form className="form_client">
          <div className="fill_form">
            <div className="field_client">
              <span>Nome</span>
              <input type="text"></input>
            </div>

            <div className="field_client">
              <span>E-mail</span>
              <input type="email"></input>
            </div>

            <div className="cpf_tel">
              <div className="field_client">
                <span>CPF</span>
                <input type="text"></input>
              </div>

              <div className="field_client">
                <span>Telefone</span>
                <input type="tel"></input>
              </div>
            </div>

            <div className="buttons_form">
              <Link to="#" className="button_form1">
                Cancelar
              </Link>
              <Link to="#" className="button_form2">
                Adicionar Cliente
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cliente;
