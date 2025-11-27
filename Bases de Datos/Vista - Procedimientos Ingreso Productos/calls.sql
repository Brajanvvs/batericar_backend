CALL spRegistrarIngresoProducto(
    NOW(), 1, 2, 3, 'Juan Pérez', 'FAC-001', 'ABC123', 'Ingreso de prueba'
);

CALL spModificarIngresoProducto(
    1, NOW(), 1, 2, 3, 'Transportes Gómez', 'FAC-001A', 'XYZ789', 'Actualización de datos'
);

CALL spCancelarIngresoProducto(1);

SELECT * FROM vw_ingreso_productos;
