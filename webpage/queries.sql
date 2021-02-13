CREATE DATABASE apuestas_DB CHARACTER SET latin1 COLLATE latin1_swedish_ci;

CREATE TABLE apuestas_DB.usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    usuario VARCHAR (20),
    dinero INT,
    PRIMARY KEY (id)
)
CHARACTER SET latin1 COLLATE latin1_swedish_ci
ENGINE MyISAM;

INSERT INTO apuestas_DB.usuarios (usuario, dinero) VALUES ("prueba", 15000);
