const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SalidaMercancia = sequelize.define('SalidaMercancia', {
  id_salida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_hora: { type: DataTypes.DATE, allowNull: false },
  id_cliente: DataTypes.INTEGER,
  id_almacen: DataTypes.INTEGER,
  id_empleado_vende: DataTypes.INTEGER,
  tipo_salida: { type: DataTypes.STRING(15), defaultValue: 'VENTA' },
  documento_salida: DataTypes.STRING(50),
  observacion: DataTypes.STRING(255),
  subtotal: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 },
  iva: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 },
  total: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 },
  estado: { type: DataTypes.STRING(10), defaultValue: 'REGISTRADO' }
}, {
  tableName: 'salida_mercancia',
  timestamps: false
});

module.exports = SalidaMercancia;
