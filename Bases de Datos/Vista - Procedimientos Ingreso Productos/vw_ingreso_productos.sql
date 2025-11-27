CREATE OR REPLACE VIEW vw_ingreso_productos AS
SELECT 
    i.id_ingreso AS id,
    i.fecha_hora AS fecha,
    p.nombre AS proveedor,
    a.nombre AS almacen,
    i.estado
FROM ingreso_producto i
LEFT JOIN proveedor p ON i.id_proveedor = p.id_proveedor
LEFT JOIN almacen a ON i.id_almacen = a.id_almacen
ORDER BY i.fecha_hora DESC;
