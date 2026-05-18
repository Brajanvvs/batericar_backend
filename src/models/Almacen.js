const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Almacen = sequelize.define('Almacen', {
  id_almacen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  estado: { type: DataTypes.STRING(10), defaultValue: 'ACTIVO' },
  ubicacion: DataTypes.STRING(100)
}, {
  tableName: 'almacen',
  timestamps: false
});

module.exports = Almacen;
