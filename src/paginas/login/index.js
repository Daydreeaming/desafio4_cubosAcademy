import './style.css';
import logoCubos from '../../imagens/logoCubos.svg'
import olhoAberto from '../../imagens/olhoAberto.svg'
import {Link} from 'react-router-dom'

function Login() {
	return (
			<div className="box">
				<div className="box_login">
					<img src={logoCubos}/>

					<div className="login">
						<form>
							<div className="field">
								<span>E-mail</span>
								<input type="email" placeHolder="exemplo@gmail.com"></input>
							</div>

							<div className="field">
								<span>Senha</span>
								<div>
									<input type="password"/>
									<button> <img src={olhoAberto}/></button>
								</div>
							</div>
						</form>
						<Link className="password" to="#">Esqueci minha senha</Link>
					</div>

					<Link to="#" className="login_button">Entrar</Link>
				</div>

				<span>Não tem uma conta ? <Link to="#">Cadastre-se</Link></span>
			</div>
	);
}

export default Login;