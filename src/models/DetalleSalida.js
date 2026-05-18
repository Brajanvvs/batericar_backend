const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleSalida = sequelize.define('DetalleSalida', {
  id_detalle_salida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_salida: { type: DataTypes.INTEGER, allowNull: false },
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
  tableName: 'detalle_salida',
  timestamps: false
});

module.exports = DetalleSalida;
