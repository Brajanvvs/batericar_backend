const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Empleado } = require('../models');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email, estado: 'ACTIVO' } });
    if (!usuario) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, usuario.password_hash);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    await usuario.update({ ultimo_login: new Date() });

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { cedula, nombre, apellido, email, telefono, rol, password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }
    const password_hash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      cedula, nombre, apellido, email, telefono, rol, password_hash
    });

    res.status(201).json({ message: 'Usuario creado', id_usuario: usuario.id_usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar', error: error.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: { exclude: ['password_hash'] },
      include: [{ model: Empleado, as: 'empleado' }]
    });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};
