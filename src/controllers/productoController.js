const { Producto, TipoProducto, Proveedor } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      order: [['nombre', 'ASC']],
      include: [
        { model: TipoProducto, as: 'tipo', attributes: ['nombre'] },
        { model: Proveedor, as: 'proveedor', attributes: ['nombre'] }
      ]
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [
        { model: TipoProducto, as: 'tipo' },
        { model: Proveedor, as: 'proveedor' }
      ]
    });
    if (!producto) return res.status(404).json({ message: 'No encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const producto = await Producto.create(sanitize(req.body));
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ message: 'No encontrado' });
    await producto.update(sanitize(req.body));
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ message: 'No encontrado' });
    await producto.destroy();
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};

exports.stockBajo = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: { estado: 'ACTIVO' },
      include: [
        { model: TipoProducto, as: 'tipo', attributes: ['nombre'] }
      ]
    });
    const bajoStock = productos.filter(p => p.stock_actual <= p.stock_minimo);
    res.json(bajoStock);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar stock', error: error.message });
  }
};
