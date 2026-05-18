const router = require('express').Router();
const { verificarToken, verificarRol } = require('../middlewares/auth');
const controller = require('../controllers/empleadoController');

router.use(verificarToken);
router.use(verificarRol('ADMIN'));

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
