const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PedidoCompra = sequelize.define('PedidoCompra', {
  id_pedido_compra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_pedido: { type: DataTypes.DATEONLY, allowNull: false },
  id_proveedor: { type: DataTypes.INTEGER, allowNull: false },
  id_empleado_solicita: DataTypes.INTEGER,
  id_empleado_aprueba: DataTypes.INTEGER,
  condiciones_pago: DataTypes.STRING(100),
  observaciones: DataTypes.TEXT,
  subtotal: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 },
  iva: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 },
  total: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 },
  estado: { type: DataTypes.STRING(10), defaultValue: 'REGISTRADO' }
}, {
  tableName: 'pedido_compra',
  timestamps: false
});

module.exports = PedidoCompra;
