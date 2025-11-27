DELIMITER $$

CREATE PROCEDURE spCancelarIngresoProducto (
    IN p_id_ingreso INT
)
BEGIN
    UPDATE ingreso_producto
    SET estado = 'ANULADO'
    WHERE id_ingreso = p_id_ingreso
      AND estado = 'REGISTRADO';
END$$

DELIMITER ;
