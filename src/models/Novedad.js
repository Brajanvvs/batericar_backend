const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Novedad = sequelize.define('Novedad', {
  id_novedad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: DataTypes.TEXT,
  fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  cantidad: DataTypes.INTEGER,
  id_detalle_ingreso: DataTypes.INTEGER
}, {
  tableName: 'novedades',
  timestamps: false
});

module.exports = Novedad;
