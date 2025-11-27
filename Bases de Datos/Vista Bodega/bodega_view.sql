CREATE OR REPLACE VIEW bodega_view AS
SELECT 
    b.id_bodega AS id,
    b.nombre,
    a.nombre AS almacen,
    b.estado
FROM bodegas b
LEFT JOIN almacen a ON b.id_almacen = a.id_almacen;
