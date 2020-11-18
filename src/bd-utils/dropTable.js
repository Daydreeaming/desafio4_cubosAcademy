const tabelas = require('../repositories/usuarioDB');

const arg = process.argv.slice(2);

if (arg[0] === 'usuarios') {
	tabelas.apagarTabela('usuarios');
	console.log(`Tabela 'Usuários' dropada!`);
} else if (arg[0] === 'clientes') {
	tabelas.apagarTabela('clientes');
	console.log(`Tabela 'Clientes' dropada!`);
}
