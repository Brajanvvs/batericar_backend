const router = require('express').Router();
const { verificarToken, verificarRol } = require('../middlewares/auth');
const controller = require('../controllers/salidaController');

router.use(verificarToken);

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', verificarRol('ADMIN', 'VENTAS', 'ALMACEN'), controller.crear);
router.put('/:id/anular', verificarRol('ADMIN', 'VENTAS', 'ALMACEN'), controller.anular);

module.exports = router;
