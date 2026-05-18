const router = require('express').Router();
const { verificarToken } = require('../middlewares/auth');
const controller = require('../controllers/bodegaController');

router.use(verificarToken);

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
