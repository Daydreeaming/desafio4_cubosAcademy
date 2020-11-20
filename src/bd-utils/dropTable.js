const tabelas = require('../repositories/usuarioDB');

const arg = process.argv.slice(2);

if (arg[0] === 'usuarios') {
	tabelas.apagarTabela('usuarios');
	console.log(`Tabela 'Usuários' dropada!`);
} else if (arg[0] === 'clientes') {
	tabelas.apagarTabela('clientes');
	console.log(`Tabela 'Clientes' dropada!`);
} else if (arg[0] === 'cobrancas') {
	tabelas.apagarTabela('cobrancas');
	console.log(`Tabela 'Cobranças' dropada!`)
} else if (arg[0] === 'all') {
	console.log('Dropando todas as tabelas...');
	tabelas.apagarTabela('usuarios');
	tabelas.apagarTabela('clientes');
	tabelas.apagarTabela('cobrancas');
	console.log('Todas tabelas dropadas!');
}
