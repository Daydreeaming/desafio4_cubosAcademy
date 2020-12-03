import "./style.css";
import avatar from "../../imagens/avatar.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthServices from "../../services/auth";

function Cliente() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telephone, setTelephone] = useState("");
  const navigation = useHistory();

  async function cadastrarCliente(nome, email, cpf, telephone) {
    try {
      const resp = await AuthServices.cadastrarCliente(nome, email, cpf, telephone);
      navigation.push("/");
      alert(resp);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <img src={avatar} className="avatar_img" />
      <div className="add_client">
        <span>// ADICIONAR CLIENTE //</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            cadastrarCliente(name, email, cpf, telephone);
          }}
          className="form_client"
        >
          <div className="fill_form">
            <div className="field_client">
              <span>Nome</span>
              <input
                value={name}
                onChange={(text) => setName(text.target.value)}
                type="text"
              />
            </div>

            <div className="field_client">
              <span>E-mail</span>
              <input
                value={email}
                onChange={(text) => setEmail(text.target.value)}
                type="email"
              />
            </div>

            <div className="cpf_tel">
              <div className="field_client">
                <span>CPF</span>
                <input
                  value={cpf}
                  onChange={(text) => setCpf(text.target.value)}
                  type="text"
                />
              </div>

              <div className="field_client">
                <span>Telefone</span>
                <input
                  value={telephone}
                  onChange={(text) => setTelephone(text.target.value)}
                  type="tel"
                />
              </div>
            </div>

            <div className="buttons_form">
              <Link to="/login" className="button_form1">
                Cancelar
              </Link>
              <Link
                to="/dashboard"
                className="button_form2"
                onClick={(e) => {
                  e.preventDefault();
                  cadastrarCliente(name, email, cpf, telephone);
                }}
                children="Adicionar Cliente"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cliente;
