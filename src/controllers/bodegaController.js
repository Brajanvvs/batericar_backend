const { Bodega, Almacen } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const bodegas = await Bodega.findAll({
      order: [['nombre', 'ASC']],
      include: [{ model: Almacen, as: 'almacen' }]
    });
    res.json(bodegas);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const bodega = await Bodega.findByPk(req.params.id, {
      include: [{ model: Almacen, as: 'almacen' }]
    });
    if (!bodega) return res.status(404).json({ message: 'No encontrado' });
    res.json(bodega);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const bodega = await Bodega.create(sanitize(req.body));
    res.status(201).json(bodega);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const bodega = await Bodega.findByPk(req.params.id);
    if (!bodega) return res.status(404).json({ message: 'No encontrado' });
    await bodega.update(sanitize(req.body));
    res.json(bodega);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const bodega = await Bodega.findByPk(req.params.id);
    if (!bodega) return res.status(404).json({ message: 'No encontrado' });
    await bodega.destroy();
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};
