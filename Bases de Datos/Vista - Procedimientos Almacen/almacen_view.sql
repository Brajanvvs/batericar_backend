CREATE OR REPLACE VIEW almacen_view AS
SELECT 
    id_almacen AS id,
    nombre,
    ubicacion,
    estado
FROM almacen;
