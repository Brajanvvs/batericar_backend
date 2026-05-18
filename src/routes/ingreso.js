const router = require('express').Router();
const { verificarToken, verificarRol } = require('../middlewares/auth');
const controller = require('../controllers/ingresoController');

router.use(verificarToken);

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', verificarRol('ADMIN', 'ALMACEN'), controller.crear);
router.put('/:id/anular', verificarRol('ADMIN', 'ALMACEN'), controller.anular);

module.exports = router;
