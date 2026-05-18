const { Almacen, Bodega } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const almacenes = await Almacen.findAll({
      order: [['nombre', 'ASC']],
      include: [{ model: Bodega, as: 'bodegas' }]
    });
    res.json(almacenes);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const almacen = await Almacen.findByPk(req.params.id, {
      include: [{ model: Bodega, as: 'bodegas' }]
    });
    if (!almacen) return res.status(404).json({ message: 'No encontrado' });
    res.json(almacen);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const almacen = await Almacen.create(sanitize(req.body));
    res.status(201).json(almacen);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const almacen = await Almacen.findByPk(req.params.id);
    if (!almacen) return res.status(404).json({ message: 'No encontrado' });
    await almacen.update(sanitize(req.body));
    res.json(almacen);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const almacen = await Almacen.findByPk(req.params.id);
    if (!almacen) return res.status(404).json({ message: 'No encontrado' });
    await almacen.destroy();
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};
