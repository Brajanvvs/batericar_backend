DELIMITER $$

CREATE PROCEDURE spRegistrarAlmacen (
    IN p_nombre VARCHAR(100),
    IN p_ubicacion VARCHAR(100)
)
BEGIN
    INSERT INTO almacen (nombre, ubicacion, estado)
    VALUES (p_nombre, p_ubicacion, 'ACTIVO');
END $$

DELIMITER ;
