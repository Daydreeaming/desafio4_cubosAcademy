import "./style.css";
import logoCubos from "../../imagens/logoCubos.svg";
import olhoAberto from "../../imagens/olhoAberto.svg";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import AuthServices from "../../services/auth";

function Login() {
  const [username, setUsername] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");
  const navigation = useHistory();

  async function login(login, password) {
    try {
      const resp = await AuthServices.login(login, password);
      navigation.push("/dashboard");
      console.log(resp);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="box">
      <div className="box_login">
        <img src={logoCubos} />

        <div className="login">
          <form onSubmit={() => login(username, password)}>
            <div className="field">
              <span>E-mail</span>
              <input
                value={username}
                onChange={(text) => setUsername(text.target.value)}
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
                  type="password"
                />
                <button>
                  <img src={olhoAberto} />
                </button>
              </div>
            </div>
          </form>
          <Link className="password" to="#">
            Esqueci minha senha
          </Link>
        </div>

        <Link
          className="login_button"
          onClick={(e) => {
            e.preventDefault();
            login(username, password);
          }}
        >
          Entrar
        </Link>
      </div>

      <span>
        Não tem uma conta ? <Link to="Cadastro">Cadastre-se</Link>
      </span>
    </div>
  );
}

export default Login;
