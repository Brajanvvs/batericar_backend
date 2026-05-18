const { Novedad, DetalleIngreso, Producto, IngresoProducto } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const novedades = await Novedad.findAll({
      order: [['fecha_registro', 'DESC']],
      include: [{
        model: DetalleIngreso, as: 'detalleIngreso',
        include: [
          { model: Producto, as: 'producto', attributes: ['nombre', 'codigo'] },
          { model: IngresoProducto, as: 'ingreso', attributes: ['id_ingreso', 'fecha_hora'] }
        ]
      }]
    });
    res.json(novedades);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const novedad = await Novedad.create(sanitize(req.body));
    res.status(201).json(novedad);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const novedad = await Novedad.findByPk(req.params.id);
    if (!novedad) return res.status(404).json({ message: 'No encontrado' });
    await novedad.destroy();
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};
