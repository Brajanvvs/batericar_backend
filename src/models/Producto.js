const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  descripcion: DataTypes.TEXT,
  unidad_medida: { type: DataTypes.STRING(20), defaultValue: 'UNID' },
  capacidad: DataTypes.STRING(20),
  voltage: DataTypes.STRING(20),
  garantia: DataTypes.STRING(50),
  fecha_duracion: DataTypes.DATEONLY,
  fabricante: DataTypes.STRING(50),
  id_tipo: DataTypes.SMALLINT,
  id_proveedor: DataTypes.INTEGER,
  precio_venta: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 },
  stock_actual: { type: DataTypes.INTEGER, defaultValue: 0 },
  stock_minimo: { type: DataTypes.INTEGER, defaultValue: 0 },
  stock_maximo: { type: DataTypes.INTEGER, defaultValue: 0 },
  estado: { type: DataTypes.STRING(10), defaultValue: 'ACTIVO' }
}, {
  tableName: 'producto',
  timestamps: false
});

module.exports = Producto;
