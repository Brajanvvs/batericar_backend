DELIMITER $$

CREATE PROCEDURE spModificarIngresoProducto (
    IN p_id_ingreso INT,
    IN p_fecha_hora DATETIME,
    IN p_id_almacen INT,
    IN p_id_empleado_recibe INT,
    IN p_id_proveedor INT,
    IN p_transportador VARCHAR(100),
    IN p_factura_remision VARCHAR(50),
    IN p_placa_vehiculo VARCHAR(20),
    IN p_observacion VARCHAR(255)
)
BEGIN
    UPDATE ingreso_producto
    SET
        fecha_hora = p_fecha_hora,
        id_almacen = p_id_almacen,
        id_empleado_recibe = p_id_empleado_recibe,
        id_proveedor = p_id_proveedor,
        transportador = p_transportador,
        factura_remision = p_factura_remision,
        placa_vehiculo = p_placa_vehiculo,
        observacion = p_observacion
    WHERE id_ingreso = p_id_ingreso
      AND estado = 'REGISTRADO'; -- Solo permite modificar si no está anulado
END$$

DELIMITER ;
