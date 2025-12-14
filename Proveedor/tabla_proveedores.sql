CREATE OR REPLACE VIEW proveedores_view AS
SELECT 
    nit AS `NIT`,
    nombre AS `Nombre`,
    telefono AS `Telefono`,
    email AS `Email`,
    estado AS `Estado`
FROM proveedores
WHERE estado = 'Activo';
DELIMITER $$

CREATE PROCEDURE spRegistrarProveedor (
    IN new_NIT VARCHAR(20),
    IN new_Nombre VARCHAR(100),
    IN new_Telefono VARCHAR(20),
    IN new_Email VARCHAR(100),
    IN new_Estado VARCHAR(20)
)
BEGIN
    INSERT INTO proveedores(nit, nombre, telefono, email, estado)
    VALUES (
        new_NIT,
        new_Nombre,
        new_Telefono,
        new_Email,
        COALESCE(new_Estado, 'Activo')
    );
END $$

DELIMITER ;
DELIMITER $$

CREATE PROCEDURE spModificarProveedor (
    IN new_id INT,
    IN new_NIT VARCHAR(20),
    IN new_Nombre VARCHAR(100),
    IN new_Telefono VARCHAR(20),
    IN new_Email VARCHAR(100),
    IN new_Estado VARCHAR(20)
)
BEGIN
    UPDATE proveedores 
    SET 
        nit = new_NIT,
        nombre = new_Nombre,
        telefono = new_Telefono,
        email = new_Email,
        estado = new_Estado
    WHERE id_proveedor = new_id;
END $$

DELIMITER ;
    DELIMITER $$

CREATE PROCEDURE spEliminarProveedor (IN new_id INT) 
BEGIN 
    UPDATE proveedores 
    SET estado = 'Inactivo'
    WHERE id_proveedor = new_id; 
END $$

DELIMITER ;

