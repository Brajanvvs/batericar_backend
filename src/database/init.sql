-- =====================================================
-- SCRIPT DE INICIALIZACIÓN PARA POSTGRESQL
-- SISTEMA DE INVENTARIO Y COMPRAS
-- =====================================================

-- Ejecutar este script en la base de datos 'inventario_empresa'
-- CREATE DATABASE inventario_empresa;

-- =====================================================
-- TABLAS MAESTRAS
-- =====================================================

CREATE TABLE IF NOT EXISTS tipo_producto (
  id_tipo SMALLSERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  estado VARCHAR(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO','INACTIVO'))
);

CREATE TABLE IF NOT EXISTS proveedor (
  id_proveedor SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  nit VARCHAR(20) UNIQUE,
  telefono VARCHAR(20),
  email VARCHAR(100),
  entidad_bancaria VARCHAR(100),
  numero_cuenta VARCHAR(50),
  tipo_cuenta VARCHAR(10) DEFAULT 'AHORROS' CHECK (tipo_cuenta IN ('AHORROS','CORRIENTE')),
  direccion VARCHAR(150),
  representante VARCHAR(100),
  estado VARCHAR(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO','INACTIVO'))
);

CREATE TABLE IF NOT EXISTS almacen (
  id_almacen SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  estado VARCHAR(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO','INACTIVO')),
  ubicacion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS bodegas (
  id_bodega SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  estado VARCHAR(50) NOT NULL,
  id_almacen INT,
  CONSTRAINT fk_id_almacen FOREIGN KEY (id_almacen) REFERENCES almacen(id_almacen)
);

CREATE TABLE IF NOT EXISTS producto (
  id_producto SERIAL PRIMARY KEY,
  codigo VARCHAR(30) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  unidad_medida VARCHAR(20) DEFAULT 'UNID',
  capacidad VARCHAR(20),
  voltage VARCHAR(20),
  garantia VARCHAR(50),
  fecha_duracion DATE,
  fabricante VARCHAR(50),
  id_tipo SMALLINT,
  id_proveedor INT,
  precio_venta DECIMAL(14,2) DEFAULT 0,
  stock_actual INT DEFAULT 0,
  stock_minimo INT DEFAULT 0,
  stock_maximo INT DEFAULT 0,
  estado VARCHAR(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO','INACTIVO')),
  CONSTRAINT fk_producto_tipo FOREIGN KEY (id_tipo) REFERENCES tipo_producto(id_tipo),
  CONSTRAINT fk_producto_proveedor FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor)
);

CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  cedula VARCHAR(20) UNIQUE,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  telefono VARCHAR(20),
  rol VARCHAR(10) DEFAULT 'OTRO' CHECK (rol IN ('ADMIN','ALMACEN','COMPRAS','VENTAS','OTRO')),
  password_hash VARCHAR(255),
  ultimo_login TIMESTAMP,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO','INACTIVO'))
);

CREATE TABLE IF NOT EXISTS empleado (
  id_empleado SERIAL PRIMARY KEY,
  cargo VARCHAR(100),
  tipo_contrato VARCHAR(50),
  eps VARCHAR(50),
  arl VARCHAR(50),
  pension VARCHAR(50),
  sueldo DECIMAL(12,2),
  fecha_creacion DATE,
  id_usuario INT,
  estado VARCHAR(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO','INACTIVO')),
  CONSTRAINT fk_empleado_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS cliente (
  id_cliente SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  tipo_documento VARCHAR(20) DEFAULT 'NIT' CHECK (tipo_documento IN ('NIT','CEDULA','CEDULA EXTRANJERIA')),
  numero_documento VARCHAR(20),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion VARCHAR(150),
  tipo_cliente VARCHAR(10) DEFAULT 'JURIDICA' CHECK (tipo_cliente IN ('NATURAL','JURIDICA')),
  estado VARCHAR(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO','INACTIVO'))
);

-- =====================================================
-- MÓDULO DE COMPRAS
-- =====================================================

CREATE TABLE IF NOT EXISTS pedido_compra (
  id_pedido_compra SERIAL PRIMARY KEY,
  fecha_pedido DATE NOT NULL,
  id_proveedor INT NOT NULL,
  id_empleado_solicita INT,
  id_empleado_aprueba INT,
  condiciones_pago VARCHAR(100),
  observaciones TEXT,
  subtotal DECIMAL(14,2) DEFAULT 0,
  iva DECIMAL(14,2) DEFAULT 0,
  total DECIMAL(14,2) DEFAULT 0,
  estado VARCHAR(10) DEFAULT 'REGISTRADO' CHECK (estado IN ('REGISTRADO','APROBADO','RECHAZADO','CERRADO')),
  CONSTRAINT fk_pc_proveedor FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor),
  CONSTRAINT fk_pc_empleado_solicita FOREIGN KEY (id_empleado_solicita) REFERENCES empleado(id_empleado),
  CONSTRAINT fk_pc_empleado_aprueba FOREIGN KEY (id_empleado_aprueba) REFERENCES empleado(id_empleado)
);

CREATE TABLE IF NOT EXISTS detalle_pedido_compra (
  id_detalle_pedido SERIAL PRIMARY KEY,
  id_pedido_compra INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(14,2) NOT NULL,
  subtotal DECIMAL(14,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  CONSTRAINT fk_dpc_pedido FOREIGN KEY (id_pedido_compra) REFERENCES pedido_compra(id_pedido_compra),
  CONSTRAINT fk_dpc_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- =====================================================
-- MÓDULO DE INGRESO A ALMACÉN
-- =====================================================

CREATE TABLE IF NOT EXISTS ingreso_producto (
  id_ingreso SERIAL PRIMARY KEY,
  fecha_hora TIMESTAMP NOT NULL,
  id_almacen INT NOT NULL,
  id_empleado_recibe INT,
  id_proveedor INT,
  transportador VARCHAR(100),
  factura_remision VARCHAR(50),
  placa_vehiculo VARCHAR(20),
  observacion VARCHAR(255),
  estado VARCHAR(10) DEFAULT 'REGISTRADO' CHECK (estado IN ('REGISTRADO','ANULADO')),
  CONSTRAINT fk_ingreso_almacen FOREIGN KEY (id_almacen) REFERENCES almacen(id_almacen),
  CONSTRAINT fk_ingreso_empleado FOREIGN KEY (id_empleado_recibe) REFERENCES empleado(id_empleado),
  CONSTRAINT fk_ingreso_proveedor FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor)
);

CREATE TABLE IF NOT EXISTS detalle_ingreso (
  id_detalle_ingreso SERIAL PRIMARY KEY,
  id_ingreso INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  costo_unitario DECIMAL(14,2) NOT NULL,
  CONSTRAINT fk_di_ingreso FOREIGN KEY (id_ingreso) REFERENCES ingreso_producto(id_ingreso),
  CONSTRAINT fk_di_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- =====================================================
-- MÓDULO DE SALIDA DE MERCANCÍA
-- =====================================================

CREATE TABLE IF NOT EXISTS salida_mercancia (
  id_salida SERIAL PRIMARY KEY,
  fecha_hora TIMESTAMP NOT NULL,
  id_cliente INT,
  id_almacen INT,
  id_empleado_vende INT,
  tipo_salida VARCHAR(15) DEFAULT 'VENTA' CHECK (tipo_salida IN ('VENTA','REMISION','AJUSTE','AVERIA','DEVOLUCION')),
  documento_salida VARCHAR(50),
  observacion VARCHAR(255),
  subtotal DECIMAL(14,2) DEFAULT 0,
  iva DECIMAL(14,2) DEFAULT 0,
  total DECIMAL(14,2) DEFAULT 0,
  estado VARCHAR(10) DEFAULT 'REGISTRADO' CHECK (estado IN ('REGISTRADO','ANULADO')),
  CONSTRAINT fk_salida_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
  CONSTRAINT fk_salida_almacen FOREIGN KEY (id_almacen) REFERENCES almacen(id_almacen),
  CONSTRAINT fk_salida_empleado FOREIGN KEY (id_empleado_vende) REFERENCES empleado(id_empleado)
);

CREATE TABLE IF NOT EXISTS detalle_salida (
  id_detalle_salida SERIAL PRIMARY KEY,
  id_salida INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(14,2) NOT NULL,
  subtotal DECIMAL(14,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  CONSTRAINT fk_ds_salida FOREIGN KEY (id_salida) REFERENCES salida_mercancia(id_salida),
  CONSTRAINT fk_ds_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- =====================================================
-- MÓDULO DE NOVEDADES
-- =====================================================

CREATE TABLE IF NOT EXISTS novedades (
  id_novedad SERIAL PRIMARY KEY,
  descripcion TEXT,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cantidad INT,
  id_detalle_ingreso INT,
  CONSTRAINT fk_nov_detalle_ingreso FOREIGN KEY (id_detalle_ingreso) REFERENCES detalle_ingreso(id_detalle_ingreso)
);
