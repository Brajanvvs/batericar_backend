const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bodega = sequelize.define('Bodega', {
  id_bodega: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  estado: { type: DataTypes.STRING(50), allowNull: false },
  id_almacen: DataTypes.INTEGER
}, {
  tableName: 'bodegas',
  timestamps: false
});

module.exports = Bodega;
