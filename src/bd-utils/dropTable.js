const { compareSync } = require('bcryptjs');
const tabelaUsuarioDB = require('../repositories/usuarioDB');

const arg = process.argv.slice(2);

if(arg[0] === 'usuarios') {
	tabelaUsuarioDB.apagarTabela('usuarios')
	console.log(`Tabela 'Usuários' dropada!`)
}