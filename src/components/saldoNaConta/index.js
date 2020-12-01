import './style.css';
import money2 from '../../imagens/money2.svg'
import avatar from '../../imagens/avatar.svg'


function SaldoNaConta() {
	
	return (
		<header className="count_bank">
			<div className="count_bank_header">
				<div className="informations_count_bank">
					<div className="info">
						<img src={money2} className="money2"/>
						<div className="balance_informations">
							<span>Saldo em conta</span>
							<span className="balance">R$ 0,00</span>
						</div>
					</div>
				</div>
			</div>
				<img src= {avatar} className="avatar_home"/>
		</header>
	)
}

export default SaldoNaConta;