import "./style.css";
import logoCubos from "../../imagens/logoCubos.svg";
import olhoAberto from "../../imagens/olhoAberto.svg";
import olhoFechado from "../../imagens/eyes_open.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthServices from "../../services/auth";
import { useHistory } from "react-router-dom";

function Cadastrar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useHistory();

  async function cadastro(nome, email, password) {
    try {
      const resp = await AuthServices.cadastro(nome, email, password);
      navigation.push("/");
      alert(resp);
    } catch (error) {
			console.log(error)
      alert(error);
    }
  }

  return (
    <div className="box">
      <div className="box_signUp">
        <img src={logoCubos} />

        <div className="signUp">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              cadastro(name, email, password);
            }}
          >
            <div className="field">
              <span>Nome</span>
              <input
                value={name}
                onChange={(text) => setName(text.target.value)}
                type="text"
              />
            </div>

            <div className="field">
              <span>E-mail</span>
              <input
                value={email}
                onChange={(text) => setEmail(text.target.value)}
                type="email"
                placeholder="exemplo@gmail.com"
              />
            </div>

            <div className="field">
              <span>Senha</span>
              <div>
                <input
                  value={password}
                  onChange={(text) => setPassword(text.target.value)}
                  type={showPassword ? "text" : "password"}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((oldValue) => !oldValue);
                  }}
                >
                  <img src={showPassword ? olhoFechado : olhoAberto} />
                </button>
              </div>
            </div>
          </form>
        </div>

        <Link
          to="/login"
          className="login_button"
          onClick={(e) => {
            e.preventDefault();
            cadastro(name, email, password);
          }}
          children="Criar Conta"
        />
      </div>

      <span>
		Já possui uma conta? <Link to="/login">Acesse agora</Link>
      </span>
    </div>
  );
}

export default Cadastrar;
