import './style.css';
import logoCubos from '../../imagens/logoCubos.svg'
import olhoAberto from '../../imagens/olhoAberto.svg'
import {Link} from 'react-router-dom'

function Cadastrar() {
	return (
		<div className="box">
			<div className="box_signUp">
				
				<img src={logoCubos}/>

				<div className="signUp">
						<form>
							<div className="field">
									<span>Nome</span>
									<input type="text"></input>
							</div>		

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
					</div>

					<Link to="#" className="login_button">Criar Conta</Link>
			</div>

			<span>Já possui uma conta? <Link to="#">Acesse agora</Link></span>
		</div>
	);
}

export default Cadastrar;