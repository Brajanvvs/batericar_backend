const { Cliente } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({ order: [['nombre', 'ASC']] });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'No encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const cliente = await Cliente.create(sanitize(req.body));
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'No encontrado' });
    await cliente.update(sanitize(req.body));
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'No encontrado' });
    await cliente.destroy();
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};
