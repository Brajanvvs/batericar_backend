/* VISTAS CLIENTES */
CREATE VIEW vistas_cliente AS 
SELECT tipo_cliente AS 'Tipo de Cliente', nro_documento AS Documento, nombre AS Nombre,telefono AS Telefono,estado AS Estado
FROM cliente
WHERE estado = 'Activo';