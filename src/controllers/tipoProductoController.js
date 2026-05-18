const { TipoProducto } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const tipos = await TipoProducto.findAll({ order: [['nombre', 'ASC']] });
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const tipo = await TipoProducto.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'No encontrado' });
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const tipo = await TipoProducto.create(sanitize(req.body));
    res.status(201).json(tipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const tipo = await TipoProducto.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'No encontrado' });
    await tipo.update(sanitize(req.body));
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const tipo = await TipoProducto.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'No encontrado' });
    await tipo.destroy();
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};
