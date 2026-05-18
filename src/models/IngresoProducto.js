const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const IngresoProducto = sequelize.define('IngresoProducto', {
  id_ingreso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_hora: { type: DataTypes.DATE, allowNull: false },
  id_almacen: { type: DataTypes.INTEGER, allowNull: false },
  id_empleado_recibe: DataTypes.INTEGER,
  id_proveedor: DataTypes.INTEGER,
  transportador: DataTypes.STRING(100),
  factura_remision: DataTypes.STRING(50),
  placa_vehiculo: DataTypes.STRING(20),
  observacion: DataTypes.STRING(255),
  estado: { type: DataTypes.STRING(10), defaultValue: 'REGISTRADO' }
}, {
  tableName: 'ingreso_producto',
  timestamps: false
});

module.exports = IngresoProducto;
