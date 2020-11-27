const validarEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!re.test(String(email).toLowerCase())) {
		throw new Error('Email inválido');
	}
};

const validarCPF = (cpf) => {
	cpf = cpf.replace(/[^\d]+/g, '');
	if (cpf === '') throw new Error('Cpf inválido');
	// Elimina CPFs invalidos conhecidos
	if (
		cpf.length != 11 ||
		cpf == '00000000000' ||
		cpf == '11111111111' ||
		cpf == '22222222222' ||
		cpf == '33333333333' ||
		cpf == '44444444444' ||
		cpf == '55555555555' ||
		cpf == '66666666666' ||
		cpf == '77777777777' ||
		cpf == '88888888888' ||
		cpf == '99999999999'
	)
		throw new Error('Cpf inválido');
	// Valida 1o digito

	add = 0;
	for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11) rev = 0;
	if (rev != parseInt(cpf.charAt(9))) throw new Error('Cpf inválido');
	// Valida 2o digito

	add = 0;
	for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11) rev = 0;
	if (rev != parseInt(cpf.charAt(10))) throw new Error('Cpf inválido');

	return cpf
};

const validarData = (data) => {
	const re = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

	if (!re.test(String(data).toLowerCase())) {
		throw new Error('Data inválida');
	}
};
module.exports = { validarEmail, validarCPF, validarData };
