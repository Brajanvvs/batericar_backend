CREATE DATABASE IF NOT EXISTS productos_db;
USE productos_db;

CREATE TABLE IF NOT EXISTS productos(
    codigo INT UNSIGNED AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    capacidad VARCHAR(50),
    estado ENUM('Activo','Inactivo') DEFAULT 'Activo',
    CONSTRAINT PRIMARY KEY (codigo),
    CONSTRAINT un_producto UNIQUE (nombre)
);
-- ================================
-- VISTA PRODUCTOS
-- ================================
CREATE OR REPLACE VIEW productos_view AS
SELECT
    codigo,
    nombre,
    fabricante,
    capacidad,
    estado
FROM productos;
-- =====================================
-- PROCEDIMIENTOS ALMACENADOS PRODUCTOS
-- =====================================

DELIMITER $$

-- REGISTRAR PRODUCTO
CREATE PROCEDURE spRegistrarProducto(
    IN p_nombre VARCHAR(100),
    IN p_fabricante VARCHAR(100),
    IN p_capacidad VARCHAR(50)
)
BEGIN
    INSERT INTO productos(nombre, fabricante, capacidad, estado)
    VALUES (p_nombre, p_fabricante, p_capacidad, 'Activo');
END $$

-- MODIFICAR PRODUCTO
CREATE PROCEDURE spModificarProducto(
    IN p_codigo INT,
    IN p_nombre VARCHAR(100),
    IN p_fabricante VARCHAR(100),
    IN p_capacidad VARCHAR(50),
    IN p_estado ENUM('Activo','Inactivo')
)
BEGIN
    UPDATE productos
    SET nombre = p_nombre,
        fabricante = p_fabricante,
        capacidad = p_capacidad,
        estado = p_estado
    WHERE codigo = p_codigo;
END $$

-- ELIMINADO LÓGICO
CREATE PROCEDURE spEliminarProducto(
    IN p_codigo INT
)
BEGIN
    UPDATE productos
    SET estado = 'Inactivo'
    WHERE codigo = p_codigo;
END $$

DELIMITER ;


