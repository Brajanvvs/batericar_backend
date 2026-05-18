const { Empleado, Usuario } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      order: [['id_empleado', 'DESC']],
      include: [{ model: Usuario, as: 'usuario', attributes: { exclude: ['password_hash'] } }]
    });
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id, {
      include: [{ model: Usuario, as: 'usuario', attributes: { exclude: ['password_hash'] } }]
    });
    if (!empleado) return res.status(404).json({ message: 'No encontrado' });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const empleado = await Empleado.create(sanitize(req.body));
    res.status(201).json(empleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (!empleado) return res.status(404).json({ message: 'No encontrado' });
    await empleado.update(sanitize(req.body));
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (!empleado) return res.status(404).json({ message: 'No encontrado' });
    await empleado.destroy();
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};
