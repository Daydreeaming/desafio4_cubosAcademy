import './style.css';
import arrow_left from '../../imagens/chevron-left.svg'
import arrow_right from '../../imagens/chevron-right.svg'
import printer from '../../imagens/printer.svg'

function ListarCobrancas() {
	return(
		<>
			<div className="box_billing">
				<input type="text" placeholder="Procurar por Nome, E-mail ou CPF"></input>
				<table className="all_billings">
					<thead className="table_head">
						<tr className="table_informations">
							<th>Cliente</th>
							<th>Descrição</th>
							<th>Valor</th>
							<th>Status</th>
							<th>Vencimento</th>
							<th>Boleto</th>
						</tr>
					</thead>
						
					<tbody className="table_body">
						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>

						<tr className="tr_info">
							<td>Nome da Cliente</td>
							<td>Pagamento referente à</td>
							<td>R$ 00.000.00</td>
							<td>Pago</td>
							<td>Vencimento</td>
							<img src={printer}/>
						</tr>
					</tbody>
				</table>

				<div className="pagination">
					<img src={arrow_left}/>
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					<span>6</span>
					<span>7</span>
					<span>8</span>
					<span>9</span>
					<span>10</span>
					<img src={arrow_right}/>
				</div>
			</div>
		</>
	)
}

export default ListarCobrancas