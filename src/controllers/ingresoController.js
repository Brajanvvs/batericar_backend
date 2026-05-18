const { IngresoProducto, DetalleIngreso, Producto, Almacen, Proveedor, Empleado, Novedad } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const ingresos = await IngresoProducto.findAll({
      order: [['fecha_hora', 'DESC']],
      include: [
        { model: Almacen, as: 'almacen', attributes: ['nombre'] },
        { model: Proveedor, as: 'proveedor', attributes: ['nombre'] }
      ]
    });
    res.json(ingresos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const ingreso = await IngresoProducto.findByPk(req.params.id, {
      include: [
        { model: Almacen, as: 'almacen' },
        { model: Proveedor, as: 'proveedor' },
        { model: Empleado, as: 'empleado' },
        {
          model: DetalleIngreso, as: 'detalles',
          include: [{ model: Producto, as: 'producto', attributes: ['nombre', 'codigo'] }]
        }
      ]
    });
    if (!ingreso) return res.status(404).json({ message: 'No encontrado' });
    res.json(ingreso);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { detalles, novedad_descripcion, ...cabecera } = req.body;
    const ingreso = await IngresoProducto.create(sanitize({ ...cabecera, fecha_hora: new Date() }));
    let primerDetalleId = null;

    if (detalles && detalles.length > 0) {
      for (const det of detalles) {
        const detalle = await DetalleIngreso.create(sanitize({
          id_ingreso: ingreso.id_ingreso,
          id_producto: det.id_producto,
          cantidad: det.cantidad,
          costo_unitario: det.costo_unitario
        }));

        if (!primerDetalleId) primerDetalleId = detalle.id_detalle_ingreso;

        await Producto.increment('stock_actual', {
          by: det.cantidad,
          where: { id_producto: det.id_producto }
        });
      }
    }

    if (primerDetalleId) {
      const desc = novedad_descripcion
        ? novedad_descripcion
        : `Ingreso #${ingreso.id_ingreso} sin novedad`;
      await Novedad.create({
        descripcion: desc,
        cantidad: detalles?.reduce((s, d) => s + (Number(d.cantidad) || 0), 0) || 0,
        id_detalle_ingreso: primerDetalleId
      });
    }

    res.status(201).json(ingreso);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.anular = async (req, res) => {
  try {
    const ingreso = await IngresoProducto.findByPk(req.params.id, {
      include: [{ model: DetalleIngreso, as: 'detalles' }]
    });
    if (!ingreso) return res.status(404).json({ message: 'No encontrado' });

    if (ingreso.detalles) {
      for (const det of ingreso.detalles) {
        await Producto.decrement('stock_actual', {
          by: det.cantidad,
          where: { id_producto: det.id_producto }
        });
      }
    }

    await ingreso.update({ estado: 'ANULADO' });
    res.json(ingreso);
  } catch (error) {
    res.status(500).json({ message: 'Error al anular', error: error.message });
  }
};
