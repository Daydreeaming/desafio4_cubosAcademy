const Router = require('koa-router');
const router = new Router();

const usuario = require('./controllers/usuario');
const auth = require('./controllers/auth');
const DBUsuarios = require('./repositories/usuarioDB');
const DBClientes = require('./repositories/clientesDB')
const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/session');
const clientes = require('./controllers/clientes')

// Rota para autenticação //
router.post('/auth', auth.autenticar);

// Rotas post //
router.post('/usuarios', Password.encrypt, usuario.criarUsuario);
router.post('/clientes', Session.verify, clientes.criarClientes)

// Rotas Get //
router.get('/bancodedadosusuarios', DBUsuarios.obterBancoDeDadosUsuario);
router.get('/bancodedadoscliente', DBClientes.obterBancoDeDadosClientes);

module.exports = router;
