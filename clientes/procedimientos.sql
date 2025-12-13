/* PROCEDIMIENTO PARA REGISTRAR CLIENTES */
DELIMITER $$
CREATE PROCEDURE spRegistrarCliente (IN new_TipoCliente ENUM ('Natural','Juridico'),
                                     IN new_Documento VARCHAR(20),
                                     IN new_Nombre VARCHAR(100),
                                     IN new_Telefono VARCHAR(20),
                                     IN new_Estado ENUM ('Activo','Inactivo')
										)
BEGIN
 INSERT INTO cliente(tipo_cliente, nro_documento, nombre, telefono,estado)
  VALUES ( 
     	COALESCE(new_TipoCliente,DEFAULT(tipo_cliente)),
         new_Documento, 
         new_Nombre, 
         new_Telefono,
          COALESCE(new_Estado, DEFAULT(estado))
        );
END
$$

CALL spRegistrarCliente('natural','12345678','Juan Perez', '3209856471','activo')
CALL spRegistrarCliente(null,'9004556787-6','Comercializadora S.A.','311567342',null)
CALL spRegistrarCliente('Natural','1082145637','Juliana Montes','3204708756','Inactivo')

/* PROCEDIMIENTO PARA MODIFICAR CLIENTES */

DELIMITER $$
CREATE PROCEDURE spModificarCliente(IN new_id INT (10),
                                     IN new_TipoCliente ENUM ('Natural','Juridico'),
                                     IN new_Documento VARCHAR(20),
                                     IN new_Nombre VARCHAR(100),
                                     IN new_Telefono VARCHAR(20),
                                     IN new_Estado ENUM ('Activo','Inactivo')
									)
BEGIN
UPDATE cliente SET
tipo_cliente= new_TipoCliente,
nro_documento= new_Documento,
nombre= new_Nombre,
telefono= new_Telefono,
estado= new_Estado
WHERE id_cliente= new_id;
END
$$

CALL spModificarCliente(1,'natural','87654321','Camila Cordoba','3209876543','Inactivo')

/* PROCEDIMIENTO PARA ELIMINAR CLIENTES */

DELIMITER $$
CREATE PROCEDURE spEliminarCliente(IN new_id INT(10)) 
BEGIN 
 UPDATE cliente SET 
 estado = "Inactivo" 
 WHERE id_clientes = new_id_clientes; 
END
$$

CALL spEliminarCliente(5)