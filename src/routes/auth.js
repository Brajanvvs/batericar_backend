const router = require('express').Router();
const { verificarToken } = require('../middlewares/auth');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/perfil', verificarToken, authController.perfil);

module.exports = router;
