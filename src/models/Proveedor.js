const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proveedor = sequelize.define('Proveedor', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  nit: { type: DataTypes.STRING(20), unique: true },
  telefono: DataTypes.STRING(20),
  email: DataTypes.STRING(100),
  entidad_bancaria: DataTypes.STRING(100),
  numero_cuenta: DataTypes.STRING(50),
  tipo_cuenta: { type: DataTypes.STRING(10), defaultValue: 'AHORROS' },
  direccion: DataTypes.STRING(150),
  representante: DataTypes.STRING(100),
  estado: { type: DataTypes.STRING(10), defaultValue: 'ACTIVO' }
}, {
  tableName: 'proveedor',
  timestamps: false
});

module.exports = Proveedor;
