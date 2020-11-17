const Router = require('koa-router');
const router = new Router();

const usuario = require('./controllers/usuario');

router.post('/usuarios', usuario.criarUsuario);

module.exports = router;
