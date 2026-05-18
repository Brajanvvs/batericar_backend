const { Usuario, Empleado } = require('../models');
const bcrypt = require('bcryptjs');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password_hash'] },
      order: [['nombre', 'ASC']]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['password_hash'] },
      include: [{ model: Empleado, as: 'empleado' }]
    });
    if (!usuario) return res.status(404).json({ message: 'No encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { cedula, nombre, apellido, email, telefono, rol, password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create(
      sanitize({ cedula, nombre, apellido, email, telefono, rol, password_hash })
    );
    res.status(201).json({ id: usuario.id_usuario, message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'No encontrado' });

    const data = sanitize({ ...req.body });
    if (data.password) {
      if (data.password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
      }
      data.password_hash = await bcrypt.hash(data.password, 10);
      delete data.password;
    } else {
      delete data.password;
    }

    await usuario.update(data);
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'No encontrado' });
    await usuario.destroy();
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};
