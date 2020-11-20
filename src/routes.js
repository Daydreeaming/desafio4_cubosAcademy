const Router = require('koa-router');
const router = new Router();

const auth = require('./controllers/auth');
const usuario = require('./controllers/usuario');
const clientes = require('./controllers/clientes');
const cobrancas = require('./controllers/cobrancas')
const DBUsuarios = require('./repositories/usuarioDB');
const DBClientes = require('./repositories/clientesDB');
const DBCobrancas = require('./repositories/cobrancasDB')

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
router.get('/usuarios', DBUsuarios.obterBancoDeDadosUsuario);
router.get('/clientes', DBClientes.obterBancoDeDadosClientes);
router.get('/cobrancas', DBCobrancas.obterBancoDeDadosCobrancas);

// https://koajs.com //

module.exports = router;
