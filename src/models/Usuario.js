const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cedula: { type: DataTypes.STRING(20), unique: true },
  nombre: DataTypes.STRING(50),
  apellido: DataTypes.STRING(50),
  email: { type: DataTypes.STRING(100), unique: true },
  telefono: DataTypes.STRING(20),
  rol: { type: DataTypes.STRING(10), defaultValue: 'OTRO' },
  password_hash: DataTypes.STRING(255),
  ultimo_login: DataTypes.DATE,
  fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estado: { type: DataTypes.STRING(10), defaultValue: 'ACTIVO' }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;
