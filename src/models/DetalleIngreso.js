const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleIngreso = sequelize.define('DetalleIngreso', {
  id_detalle_ingreso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_ingreso: { type: DataTypes.INTEGER, allowNull: false },
  id_producto: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  costo_unitario: { type: DataTypes.DECIMAL(14, 2), allowNull: false }
}, {
  tableName: 'detalle_ingreso',
  timestamps: false
});

module.exports = DetalleIngreso;
