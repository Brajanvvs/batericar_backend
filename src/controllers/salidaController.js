const { SalidaMercancia, DetalleSalida, Producto, Cliente, Almacen, Empleado } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const salidas = await SalidaMercancia.findAll({
      order: [['fecha_hora', 'DESC']],
      include: [
        { model: Cliente, as: 'cliente', attributes: ['nombre'] },
        { model: Almacen, as: 'almacen', attributes: ['nombre'] }
      ]
    });
    res.json(salidas);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const salida = await SalidaMercancia.findByPk(req.params.id, {
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Almacen, as: 'almacen' },
        { model: Empleado, as: 'empleado' },
        {
          model: DetalleSalida, as: 'detalles',
          include: [{ model: Producto, as: 'producto', attributes: ['nombre', 'codigo'] }]
        }
      ]
    });
    if (!salida) return res.status(404).json({ message: 'No encontrado' });
    res.json(salida);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { detalles, ...cabecera } = req.body;
    let subtotal = 0;

    if (detalles && detalles.length > 0) {
      for (const det of detalles) {
        const producto = await Producto.findByPk(det.id_producto);
        if (!producto) return res.status(400).json({ message: `Producto ${det.id_producto} no existe` });
        if (producto.stock_actual < det.cantidad) {
          return res.status(400).json({
            message: `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock_actual}, requerido: ${det.cantidad}`
          });
        }
        subtotal += det.cantidad * det.precio_unitario;
      }
    }

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const salida = await SalidaMercancia.create(sanitize({ ...cabecera, fecha_hora: new Date(), subtotal, iva, total }));

    if (detalles && detalles.length > 0) {
      for (const det of detalles) {
        await DetalleSalida.create(sanitize({
          id_salida: salida.id_salida,
          id_producto: det.id_producto,
          cantidad: det.cantidad,
          precio_unitario: det.precio_unitario
        }));

        await Producto.decrement('stock_actual', {
          by: det.cantidad,
          where: { id_producto: det.id_producto }
        });
      }
    }

    res.status(201).json(salida);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.anular = async (req, res) => {
  try {
    const salida = await SalidaMercancia.findByPk(req.params.id, {
      include: [{ model: DetalleSalida, as: 'detalles' }]
    });
    if (!salida) return res.status(404).json({ message: 'No encontrado' });

    if (salida.detalles) {
      for (const det of salida.detalles) {
        await Producto.increment('stock_actual', {
          by: det.cantidad,
          where: { id_producto: det.id_producto }
        });
      }
    }

    await salida.update({ estado: 'ANULADO' });
    res.json(salida);
  } catch (error) {
    res.status(500).json({ message: 'Error al anular', error: error.message });
  }
};
