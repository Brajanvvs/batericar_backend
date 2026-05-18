const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empleado = sequelize.define('Empleado', {
  id_empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cargo: DataTypes.STRING(100),
  tipo_contrato: DataTypes.STRING(50),
  eps: DataTypes.STRING(50),
  arl: DataTypes.STRING(50),
  pension: DataTypes.STRING(50),
  sueldo: DataTypes.DECIMAL(12, 2),
  fecha_creacion: DataTypes.DATEONLY,
  id_usuario: DataTypes.INTEGER,
  estado: { type: DataTypes.STRING(10), defaultValue: 'ACTIVO' }
}, {
  tableName: 'empleado',
  timestamps: false
});

module.exports = Empleado;
