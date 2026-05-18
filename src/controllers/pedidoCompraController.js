const { PedidoCompra, DetallePedidoCompra, Producto, Proveedor, Empleado, Usuario } = require('../models');
const { sanitize } = require('../utils/sanitize');

exports.listar = async (req, res) => {
  try {
    const pedidos = await PedidoCompra.findAll({
      order: [['fecha_pedido', 'DESC']],
      include: [
        { model: Proveedor, as: 'proveedor', attributes: ['nombre'] },
        {
          model: Empleado, as: 'solicitante',
          include: [{ model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido'] }]
        }
      ]
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const pedido = await PedidoCompra.findByPk(req.params.id, {
      include: [
        { model: Proveedor, as: 'proveedor' },
        { model: Empleado, as: 'solicitante' },
        { model: Empleado, as: 'aprobador' },
        {
          model: DetallePedidoCompra, as: 'detalles',
          include: [{ model: Producto, as: 'producto', attributes: ['nombre', 'codigo'] }]
        }
      ]
    });
    if (!pedido) return res.status(404).json({ message: 'No encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener', error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { detalles, ...cabecera } = req.body;
    let subtotal = 0;

    const pedido = await PedidoCompra.create(sanitize(cabecera));

    if (detalles && detalles.length > 0) {
      for (const det of detalles) {
        const detalle = await DetallePedidoCompra.create(sanitize({
          id_pedido_compra: pedido.id_pedido_compra,
          id_producto: det.id_producto,
          cantidad: det.cantidad,
          precio_unitario: det.precio_unitario
        }));
        subtotal += det.cantidad * det.precio_unitario;
      }
    }

    const iva = subtotal * 0.19;
    const total = subtotal + iva;
    await pedido.update({ subtotal, iva, total });

    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

exports.aprobar = async (req, res) => {
  try {
    const pedido = await PedidoCompra.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'No encontrado' });

    const empleado = await Empleado.findOne({ where: { id_usuario: req.usuarioId } });
    if (!empleado) return res.status(400).json({ message: 'No tiene perfil de empleado' });

    await pedido.update({ estado: 'APROBADO', id_empleado_aprueba: empleado.id_empleado });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Error al aprobar', error: error.message });
  }
};

exports.cerrar = async (req, res) => {
  try {
    const pedido = await PedidoCompra.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'No encontrado' });
    await pedido.update({ estado: 'CERRADO' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Error al cerrar', error: error.message });
  }
};
