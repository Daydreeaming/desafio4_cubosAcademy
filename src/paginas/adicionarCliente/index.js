import NavMenuHome from '../../components/menuNavegacao'
import AdicionarCliente from '../../components/adicionarClientes'

function CadastroCliente() {
	return (
		<div>
			<div className="box_home">
				<div className="box_home_left">
					<NavMenuHome></NavMenuHome>
				</div>

				<div className="box_home_right">
					<AdicionarCliente></AdicionarCliente>
				</div>
			</div>
		</div>
	)
}

export default CadastroCliente