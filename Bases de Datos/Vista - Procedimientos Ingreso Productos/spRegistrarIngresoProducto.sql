DELIMITER $$

CREATE PROCEDURE spRegistrarIngresoProducto (
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
    INSERT INTO ingreso_producto (
        fecha_hora,
        id_almacen,
        id_empleado_recibe,
        id_proveedor,
        transportador,
        factura_remision,
        placa_vehiculo,
        observacion,
        estado
    )
    VALUES (
        p_fecha_hora,
        p_id_almacen,
        p_id_empleado_recibe,
        p_id_proveedor,
        p_transportador,
        p_factura_remision,
        p_placa_vehiculo,
        p_observacion,
        'REGISTRADO'
    );
END$$

DELIMITER ;
