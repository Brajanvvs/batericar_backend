const router = require('express').Router();
const { verificarToken, verificarRol } = require('../middlewares/auth');
const controller = require('../controllers/pedidoCompraController');

router.use(verificarToken);

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', verificarRol('ADMIN', 'COMPRAS'), controller.crear);
router.put('/:id/aprobar', verificarRol('ADMIN', 'COMPRAS'), controller.aprobar);
router.put('/:id/cerrar', verificarRol('ADMIN', 'COMPRAS'), controller.cerrar);

module.exports = router;
