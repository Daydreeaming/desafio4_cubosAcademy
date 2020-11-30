import './style.css';
import users from '../../imagens/users.svg'
import money from '../../imagens/money.svg'

function InformacaoHome() {
	return (
		<div className="main_menu_home">
			<div className="main_menu_header">
				<span>Este mês</span>
				<span>Este ano</span>
				<span>Desde o início</span>	
			</div>

			<div className="home_body_principal"> 
				<div className="containers">
					<div className="containers_header">
						<img src={users}/>
						<span>Clientes</span>
					</div>
					
					<div className="containers_body">
						<div className="style_containers_green">
							<span className="span_container1">
								Em dia
							</span>

							<span className="span_container2">
								0
							</span>
						</div>

						<div className="style_containers_red">
							<span className="span_container1">
								Inadimplentes
							</span>

							<span className="span_container2">
								0
							</span>
						</div>
					</div>
					
				</div>

				<div className="containers">
					<div className="containers_header">
						<img src={money}/>
						<span>Cobranças</span>
					</div>

					<div className="containers_body">
						<div className="style_containers_blue">
							<span className="span_container1"> 
								Em dia
							</span>

							<span className="span_container2">
								0
							</span>
						</div>

						<div className="style_containers_red">
							<span className="span_container1">
								Vencidas
							</span>

							<span className="span_container2">
								0
							</span>
						</div>

						<div className="style_containers_green">
							<span className="span_container1">
								Pagas
							</span>

							<span className="span_container2">
								0
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InformacaoHome