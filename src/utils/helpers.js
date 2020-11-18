const validarEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!re.test(String(email).toLowerCase())) {
		throw new Error('Email inválido');
	}
};


const validarCPF = (cpf) => {
	const re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

	if (!re.test(String(cpf).toLowerCase())) {
		throw new Error('Cpf inválido');
	}
}
module.exports = { validarEmail, validarCPF };
