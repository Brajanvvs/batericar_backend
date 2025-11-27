DELIMITER $$

CREATE PROCEDURE spModificarAlmacen (
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_ubicacion VARCHAR(100)
)
BEGIN
    UPDATE almacen
    SET nombre = p_nombre,
        ubicacion = p_ubicacion
    WHERE id_almacen = p_id;
END $$

DELIMITER ;
