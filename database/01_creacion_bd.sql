CREATE DATABASE segurix;

USE segurix;

CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE medio_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE gasto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    categoria_id INT NOT NULL,
    medio_pago_id INT NOT NULL,

    FOREIGN KEY (categoria_id) REFERENCES categoria(id),
    FOREIGN KEY (medio_pago_id) REFERENCES medio_pago(id)
);