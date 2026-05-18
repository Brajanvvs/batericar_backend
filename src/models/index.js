const TipoProducto = require('./TipoProducto');
const Proveedor = require('./Proveedor');
const Almacen = require('./Almacen');
const Bodega = require('./Bodega');
const Producto = require('./Producto');
const Usuario = require('./Usuario');
const Empleado = require('./Empleado');
const Cliente = require('./Cliente');
const PedidoCompra = require('./PedidoCompra');
const DetallePedidoCompra = require('./DetallePedidoCompra');
const IngresoProducto = require('./IngresoProducto');
const DetalleIngreso = require('./DetalleIngreso');
const SalidaMercancia = require('./SalidaMercancia');
const DetalleSalida = require('./DetalleSalida');
const Novedad = require('./Novedad');

// --- Producto relaciones ---
Producto.belongsTo(TipoProducto, { foreignKey: 'id_tipo', as: 'tipo' });
Producto.belongsTo(Proveedor, { foreignKey: 'id_proveedor', as: 'proveedor' });
TipoProducto.hasMany(Producto, { foreignKey: 'id_tipo' });
Proveedor.hasMany(Producto, { foreignKey: 'id_proveedor' });

// --- Bodega ---
Bodega.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });
Almacen.hasMany(Bodega, { foreignKey: 'id_almacen', as: 'bodegas' });

// --- Empleado ---
Empleado.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
Usuario.hasOne(Empleado, { foreignKey: 'id_usuario' });

// --- PedidoCompra ---
PedidoCompra.belongsTo(Proveedor, { foreignKey: 'id_proveedor', as: 'proveedor' });
PedidoCompra.belongsTo(Empleado, { foreignKey: 'id_empleado_solicita', as: 'solicitante' });
PedidoCompra.belongsTo(Empleado, { foreignKey: 'id_empleado_aprueba', as: 'aprobador' });
Proveedor.hasMany(PedidoCompra, { foreignKey: 'id_proveedor' });

DetallePedidoCompra.belongsTo(PedidoCompra, { foreignKey: 'id_pedido_compra', as: 'pedido' });
DetallePedidoCompra.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
PedidoCompra.hasMany(DetallePedidoCompra, { foreignKey: 'id_pedido_compra', as: 'detalles' });
Producto.hasMany(DetallePedidoCompra, { foreignKey: 'id_producto' });

// --- IngresoProducto ---
IngresoProducto.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });
IngresoProducto.belongsTo(Empleado, { foreignKey: 'id_empleado_recibe', as: 'empleado' });
IngresoProducto.belongsTo(Proveedor, { foreignKey: 'id_proveedor', as: 'proveedor' });
Almacen.hasMany(IngresoProducto, { foreignKey: 'id_almacen' });

DetalleIngreso.belongsTo(IngresoProducto, { foreignKey: 'id_ingreso', as: 'ingreso' });
DetalleIngreso.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
IngresoProducto.hasMany(DetalleIngreso, { foreignKey: 'id_ingreso', as: 'detalles' });
Producto.hasMany(DetalleIngreso, { foreignKey: 'id_producto' });

// --- SalidaMercancia ---
SalidaMercancia.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });
SalidaMercancia.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });
SalidaMercancia.belongsTo(Empleado, { foreignKey: 'id_empleado_vende', as: 'empleado' });
Cliente.hasMany(SalidaMercancia, { foreignKey: 'id_cliente' });
Almacen.hasMany(SalidaMercancia, { foreignKey: 'id_almacen' });

DetalleSalida.belongsTo(SalidaMercancia, { foreignKey: 'id_salida', as: 'salida' });
DetalleSalida.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
SalidaMercancia.hasMany(DetalleSalida, { foreignKey: 'id_salida', as: 'detalles' });
Producto.hasMany(DetalleSalida, { foreignKey: 'id_producto' });

// --- Novedad ---
Novedad.belongsTo(DetalleIngreso, { foreignKey: 'id_detalle_ingreso', as: 'detalleIngreso' });
DetalleIngreso.hasMany(Novedad, { foreignKey: 'id_detalle_ingreso' });

module.exports = {
  TipoProducto,
  Proveedor,
  Almacen,
  Bodega,
  Producto,
  Usuario,
  Empleado,
  Cliente,
  PedidoCompra,
  DetallePedidoCompra,
  IngresoProducto,
  DetalleIngreso,
  SalidaMercancia,
  DetalleSalida,
  Novedad
};
