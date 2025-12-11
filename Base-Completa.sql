-- =====================================================
-- BASE DE DATOS OPTIMIZADA DE INVENTARIO Y COMPRAS
-- =====================================================
DROP DATABASE IF EXISTS inventario_empresa_opt;
CREATE DATABASE inventario_empresa_opt;
USE inventario_empresa_opt;

-- =====================================================
-- TABLAS MAESTRAS
-- =====================================================

-- ----------------------------
-- Tabla: tipo_producto
-- ----------------------------
CREATE TABLE tipo_producto (
  id_tipo TINYINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO'
);

-- ----------------------------
-- Tabla: proveedor
-- ----------------------------
CREATE TABLE proveedor (
  id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  nit VARCHAR(20) UNIQUE,
  telefono VARCHAR(20),
  email VARCHAR(100),
  entidad_bancaria VARCHAR(100),
  numero_cuenta VARCHAR(50),
  tipo_cuenta ENUM('AHORROS','CORRIENTE') DEFAULT 'AHORROS',
  direccion VARCHAR(150),
  representante VARCHAR(100),
  estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO'
);

-- ----------------------------
-- Tabla: almacen
-- ----------------------------
CREATE TABLE almacen (
  id_almacen INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  -- nombre_bodega VARCHAR(100),
  estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO',
  ubicacion VARCHAR(100)
  
);


-- ----------------------------
-- Tabla: Bodega
-- ----------------------------
CREATE TABLE bodegas (
	id_bodega INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
	estado VARCHAR(50) NOT NULL,
	id_almacen int,

	CONSTRAINT fk_id_almacen FOREIGN KEY (id_almacen)
	REFERENCES almacen(id_almacen)

);

-- ----------------------------
-- Tabla: producto
-- ----------------------------
CREATE TABLE producto (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  codigo VARCHAR(30) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  unidad_medida VARCHAR(20) DEFAULT 'UNID',
  capacidad VARCHAR(20),
  voltage VARCHAR(20),
  garantia VARCHAR(50),
  fecha_duracion DATE,
  fabricante VARCHAR(50),
  id_tipo TINYINT,
  id_proveedor INT,
  stock_actual INT DEFAULT 0,
  stock_minimo INT DEFAULT 0,
  stock_maximo INT DEFAULT 0,
  estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO',
  CONSTRAINT fk_producto_tipo FOREIGN KEY (id_tipo)
    REFERENCES tipo_producto(id_tipo),
  CONSTRAINT fk_producto_proveedor FOREIGN KEY (id_proveedor)
    REFERENCES proveedor(id_proveedor)
);

-- ----------------------------
-- Tabla: usuario
-- (para login/autenticación)
-- ----------------------------
CREATE TABLE usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  cedula VARCHAR(20) UNIQUE,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  telefono VARCHAR(20),
  rol ENUM('ADMIN','ALMACEN','COMPRAS','VENTAS','OTRO') DEFAULT 'OTRO',
  password_hash VARCHAR(255),
  ultimo_login DATETIME,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO'
);

-- ----------------------------
-- Tabla: empleado
-- ----------------------------
CREATE TABLE empleado (
  id_empleado INT PRIMARY KEY AUTO_INCREMENT,
  cargo VARCHAR(100),
  tipo_contrato VARCHAR(50),
  eps VARCHAR(50),
  arl VARCHAR(50),
  pension VARCHAR(50),
  sueldo DECIMAL(12,2),
  fecha_creacion DATE,
  id_usuario INT,
  estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO',
  CONSTRAINT fk_empleado_usuario FOREIGN KEY (id_usuario)
    REFERENCES usuario(id_usuario)
);

-- ----------------------------
-- Tabla: cliente (antes persona_juridica)
-- ----------------------------
CREATE TABLE cliente (
  id_cliente INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  tipo_documento ENUM('NIT','CEDULA','CEDULA EXTRANJERIA') DEFAULT 'NIT',
  numero_documento VARCHAR(20),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion VARCHAR(150),
  tipo_cliente ENUM('NATURAL','JURIDICA') DEFAULT 'JURIDICA',
  estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO'
);

-- =====================================================
-- MÓDULO DE COMPRAS
-- =====================================================

-- ----------------------------
-- Tabla: pedido_compra
-- ----------------------------
CREATE TABLE pedido_compra (
  id_pedido_compra INT PRIMARY KEY AUTO_INCREMENT,
  fecha_pedido DATE NOT NULL,
  id_proveedor INT NOT NULL,
  id_empleado_solicita INT,
  id_empleado_aprueba INT,
  condiciones_pago VARCHAR(100),
  observaciones TEXT,
  subtotal DECIMAL(14,2) DEFAULT 0,
  iva DECIMAL(14,2) DEFAULT 0,
  total DECIMAL(14,2) DEFAULT 0,
  estado ENUM('REGISTRADO','APROBADO','RECHAZADO','CERRADO') DEFAULT 'REGISTRADO',
  CONSTRAINT fk_pc_proveedor FOREIGN KEY (id_proveedor)
    REFERENCES proveedor(id_proveedor),
  CONSTRAINT fk_pc_empleado_solicita FOREIGN KEY (id_empleado_solicita)
    REFERENCES empleado(id_empleado),
  CONSTRAINT fk_pc_empleado_aprueba FOREIGN KEY (id_empleado_aprueba)
    REFERENCES empleado(id_empleado)
);

-- ----------------------------
-- Tabla: detalle_pedido_compra
-- (antes productos_pedido_compra)
-- ----------------------------
CREATE TABLE detalle_pedido_compra (
  id_detalle_pedido INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido_compra INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(14,2) NOT NULL,
  subtotal DECIMAL(14,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  CONSTRAINT fk_dpc_pedido FOREIGN KEY (id_pedido_compra)
    REFERENCES pedido_compra(id_pedido_compra),
  CONSTRAINT fk_dpc_producto FOREIGN KEY (id_producto)
    REFERENCES producto(id_producto)
);

-- =====================================================
-- MÓDULO DE INGRESO A ALMACÉN
-- =====================================================

-- ----------------------------
-- Tabla: ingreso_producto
-- ----------------------------
CREATE TABLE ingreso_producto (
  id_ingreso INT PRIMARY KEY AUTO_INCREMENT,
  fecha_hora DATETIME NOT NULL,
  id_almacen INT NOT NULL,
  id_empleado_recibe INT,
  id_proveedor INT,
  transportador VARCHAR(100),
  factura_remision VARCHAR(50),
  placa_vehiculo VARCHAR(20),
  observacion VARCHAR(255),
  estado ENUM('REGISTRADO','ANULADO') DEFAULT 'REGISTRADO',
  CONSTRAINT fk_ingreso_almacen FOREIGN KEY (id_almacen)
    REFERENCES almacen(id_almacen),
  CONSTRAINT fk_ingreso_empleado FOREIGN KEY (id_empleado_recibe)
    REFERENCES empleado(id_empleado),
  CONSTRAINT fk_ingreso_proveedor FOREIGN KEY (id_proveedor)
    REFERENCES proveedor(id_proveedor)
);

-- ----------------------------
-- Tabla: detalle_ingreso
-- ----------------------------
CREATE TABLE detalle_ingreso (
  id_detalle_ingreso INT PRIMARY KEY AUTO_INCREMENT,
  id_ingreso INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  costo_unitario DECIMAL(14,2) NOT NULL,
  -- subtotal DECIMAL(14,2) GENERATED ALWAYS AS (cantidad * costo_unitario) STORED,
  -- observacion VARCHAR(255),
  -- estado ENUM('REGISTRADO','ANULADO') DEFAULT 'REGISTRADO',
  CONSTRAINT fk_di_ingreso FOREIGN KEY (id_ingreso)
    REFERENCES ingreso_producto(id_ingreso),
  CONSTRAINT fk_di_producto FOREIGN KEY (id_producto)
    REFERENCES producto(id_producto)
);

-- =====================================================
-- MÓDULO DE SALIDA DE MERCANCÍA
-- =====================================================

-- ----------------------------
-- Tabla: salida_mercancia
-- ----------------------------
CREATE TABLE salida_mercancia (
  id_salida INT PRIMARY KEY AUTO_INCREMENT,
  fecha_hora DATETIME NOT NULL,
  id_cliente INT,
  id_almacen INT,
  id_empleado_vende INT,
  tipo_salida ENUM('VENTA','REMISION','AJUSTE','AVERIA', 'DEVOLUCION') DEFAULT 'VENTA',
  documento_salida VARCHAR(50),  -- FIRMA DEL TRANSPORTADOR, ALGUNOS INTERNOS O EXTERNOS TERCEROS
  observacion VARCHAR(255),
  subtotal DECIMAL(14,2) DEFAULT 0,
  iva DECIMAL(14,2) DEFAULT 0,
  total DECIMAL(14,2) DEFAULT 0,
  estado ENUM('REGISTRADO','ANULADO') DEFAULT 'REGISTRADO',
  CONSTRAINT fk_salida_cliente FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente),
  CONSTRAINT fk_salida_almacen FOREIGN KEY (id_almacen)
    REFERENCES almacen(id_almacen),
  CONSTRAINT fk_salida_empleado FOREIGN KEY (id_empleado_vende)
    REFERENCES empleado(id_empleado)
);

-- ----------------------------
-- Tabla: detalle_salida
-- (antes detalle_salida_mercancia)
-- ----------------------------
CREATE TABLE detalle_salida (
  id_detalle_salida INT PRIMARY KEY AUTO_INCREMENT,
  id_salida INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(14,2) NOT NULL,  -- PRECIO VENTA
  subtotal DECIMAL(14,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  CONSTRAINT fk_ds_salida FOREIGN KEY (id_salida)
    REFERENCES salida_mercancia(id_salida),
  CONSTRAINT fk_ds_producto FOREIGN KEY (id_producto)
    REFERENCES producto(id_producto)
);

-- =====================================================
-- MÓDULO DE NOVEDADES
-- =====================================================

-- ----------------------------
-- Tabla: novedades
-- ----------------------------
CREATE TABLE novedades (
  id_novedad INT PRIMARY KEY AUTO_INCREMENT,
  descripcion TEXT,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cantidad INT,
  id_detalle_ingreso INT,
  CONSTRAINT fk_nov_detalle_ingreso FOREIGN KEY (id_detalle_ingreso)
    REFERENCES detalle_ingreso(id_detalle_ingreso)
);


/*
-- =====================================================
-- TRIGGERS DE CONTROL DE STOCK
-- =====================================================
DELIMITER $$

-- Trigger: sumar stock al registrar un detalle de ingreso
CREATE TRIGGER trg_sumar_stock_ingreso
AFTER INSERT ON detalle_ingreso
FOR EACH ROW
BEGIN
  UPDATE producto
  SET stock_actual = stock_actual + NEW.cantidad
  WHERE id_producto = NEW.id_producto;
END$$

-- Trigger: restar stock al registrar un detalle de salida
CREATE TRIGGER trg_restar_stock_salida
AFTER INSERT ON detalle_salida
FOR EACH ROW
BEGIN
  UPDATE producto
  SET stock_actual = stock_actual - NEW.cantidad
  WHERE id_producto = NEW.id_producto;
END$$

DELIMITER ;

*/

/*
-- VISTA DE PRODUCTOS

CREATE OR REPLACE VIEW vw_productos AS
SELECT 
    p.id_producto,
    p.codigo,
    p.nombre AS nombre_producto,
    p.descripcion,
    t.nombre AS tipo_producto,
    pr.nombre AS proveedor,
    p.fabricante,
    p.capacidad,
    p.voltage,
    p.garantia,
    p.fecha_duracion,
    p.unidad_medida,
    p.stock_actual,
    p.stock_minimo,
    p.stock_maximo,
    p.estado,
    pr.telefono AS proveedor_telefono,
    pr.email AS proveedor_email,
    pr.nit AS proveedor_nit
FROM producto p
LEFT JOIN tipo_producto t 
    ON p.id_tipo = t.id_tipo
LEFT JOIN proveedor pr 
    ON p.id_proveedor = pr.id_proveedor
ORDER BY p.nombre ASC;


*/


-- 1 tabla cada uno de nosotros
/*
carpeta, 

codigo tabla

vista
procedimientos


BRAJAN


ALMACEN
Bodega  - TODOS LOS CAMPOS, 


TABLA BODEGA

Almacen 1 0 muchas
bodega 1 almacen


INNER JOIN DE ALMACEN NOMBRE DE EL ALMACEN



PROCEDURES ELIMINAR ALMACEN PERO CAMBIA EL ESTADO MAS NO LA ELIMINACION



*/



