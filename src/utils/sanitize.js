const numericFields = [
  'id_tipo', 'id_proveedor', 'id_almacen', 'id_bodega', 'id_producto',
  'id_usuario', 'id_empleado', 'id_cliente', 'id_pedido_compra',
  'id_ingreso', 'id_salida', 'id_detalle_ingreso', 'id_detalle_pedido',
  'id_detalle_salida', 'id_empleado_solicita', 'id_empleado_aprueba',
  'id_empleado_recibe', 'id_empleado_vende', 'cantidad', 'stock_actual',
  'precio_venta',
  'stock_minimo', 'stock_maximo', 'sueldo', 'precio_unitario',
  'costo_unitario', 'subtotal', 'iva', 'total'
];

function sanitize(body) {
  const data = { ...body };
  for (const key of Object.keys(data)) {
    if (numericFields.includes(key) && data[key] === '') {
      data[key] = null;
    }
  }
  return data;
}

module.exports = { sanitize };
