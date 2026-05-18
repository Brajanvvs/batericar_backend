const router = require('express').Router();
const { verificarToken } = require('../middlewares/auth');
const controller = require('../controllers/novedadController');

router.use(verificarToken);

router.get('/', controller.listar);
router.post('/', controller.crear);
router.delete('/:id', controller.eliminar);

module.exports = router;
