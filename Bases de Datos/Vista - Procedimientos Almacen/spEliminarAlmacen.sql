DELIMITER $$

CREATE PROCEDURE spEliminarAlmacen (
    IN p_id INT
)
BEGIN
    UPDATE almacen
    SET estado = 'INACTIVO'
    WHERE id_almacen = p_id;
END $$

DELIMITER ;
