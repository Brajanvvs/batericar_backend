const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  tipo_documento: { type: DataTypes.STRING(20), defaultValue: 'NIT' },
  numero_documento: DataTypes.STRING(20),
  telefono: DataTypes.STRING(20),
  email: DataTypes.STRING(100),
  direccion: DataTypes.STRING(150),
  tipo_cliente: { type: DataTypes.STRING(10), defaultValue: 'JURIDICA' },
  estado: { type: DataTypes.STRING(10), defaultValue: 'ACTIVO' }
}, {
  tableName: 'cliente',
  timestamps: false
});

module.exports = Cliente;
