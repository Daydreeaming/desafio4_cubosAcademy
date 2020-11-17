const tabelaUsuarioDB = require('../repositories/usuarioDB');

const arg = process.argv.slice(2);

if(arg[0] === 'usuarios') {
	console.log('Criando tabela...');
	tabelaUsuarioDB.criarTabelaUsuarioDB();
	console.log(`Tabela 'Usuários' criada!`)
} 