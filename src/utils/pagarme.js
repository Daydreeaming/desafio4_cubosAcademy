const axios = require('axios').default;

require('dotenv').config();

const geracaoBoleto = async (nome, cpf, valor) => {

	try {
		const transaction = await axios.post('https://api.pagar.me/1/transactions', {
			amount: valor,
			payment_method: 'boleto',
			postback_url: null,
			customer: {
				type: 'individual',
				country: 'br',
				name: nome,
				documents: [
					{
						type: 'cpf',
						number: cpf,
					},
				],
			},
			api_key: process.env.PAGARME_KEY,
		})
		return transaction.data
	} catch (err) {
		console.log(err.response.data)
		return {
			status: 'error',
			data: {
				mensagem:'Erro no pagamento'
			}	
		}
	}
};

module.exports = { geracaoBoleto }