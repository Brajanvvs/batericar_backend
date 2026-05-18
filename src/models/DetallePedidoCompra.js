const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetallePedidoCompra = sequelize.define('DetallePedidoCompra', {
  id_detalle_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pedido_compra: { type: DataTypes.INTEGER, allowNull: false },
  id_producto: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  subtotal: {
    type: DataTypes.VIRTUAL,
    get() {
      return parseFloat(this.cantidad) * parseFloat(this.precio_unitario);
    }
  }
}, {
  tableName: 'detalle_pedido_compra',
  timestamps: false
});

module.exports = DetallePedidoCompra;
