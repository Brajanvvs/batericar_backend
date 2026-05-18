const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoProducto = sequelize.define('TipoProducto', {
  id_tipo: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(10),
    defaultValue: 'ACTIVO'
  }
}, {
  tableName: 'tipo_producto',
  timestamps: false
});

module.exports = TipoProducto;
