const Router = require('koa-router');
const router = new Router();

const auth = require('./controllers/auth');
const usuario = require('./controllers/usuario');
const clientes = require('./controllers/clientes');
const cobrancas = require('./controllers/cobrancas')

// Middlewares //

const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/session');

// Rota para autenticação //
router.post('/auth', auth.autenticar);

// Rotas post //
router.post('/usuarios', Password.encrypt, usuario.criarUsuario);
router.post('/clientes', Session.verify, clientes.criarClientes);
router.post('/cobrancas', Session.verify, cobrancas.criarCobrancas);

// Rotas Get //
router.get('/clientes', Session.verify, usuario.listarClientesDoUsuario);
router.get('/buscarClienteUsuario', Session.verify, usuario.buscarUmClienteDoUsuario);
router.get('/cobrancas', Session.verify, cobrancas.listarCobrancaDoCliente);
router.get('/relatorios', Session.verify, usuario.relatorioDoUsuario);

// Rotas Put //
router.put('/clientes', Session.verify, clientes.editarClientes);
router.put('/cobrancas', Session.verify, cobrancas.pagarCobranca);

module.exports = router;