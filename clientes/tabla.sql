/* TABLA CLIENTE */
CREATE TABLE IF NOT EXISTS cliente(
    id        		 INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,
    tipo_cliente   ENUM ('Natural', 'Juridica') NOT NULL DEFAULT 'Juridica',
    nombre    		 VARCHAR(100) NOT NULL,
    tipo_documento  ENUM ('NIT','Cedula','Cedula Extranjera')  NULL DEFAULT 'NIT',
    nro_documento    VARCHAR(20) NOT NULL,
    telefono    	 VARCHAR(20) NULL,
    email            VARCHAR(100) NULL,
    direccion    	 VARCHAR(150) NULL,
    estado    		ENUM ('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    CONSTRAINT PRIMARY KEY (id),
    CONSTRAINT un_cliente UNIQUE (nombre)
);

