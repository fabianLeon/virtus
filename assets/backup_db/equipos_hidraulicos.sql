-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-02-2016 a las 18:02:50
-- Versión del servidor: 10.1.9-MariaDB
-- Versión de PHP: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `equipos_hidraulicos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion`
--

CREATE TABLE `descripcion` (
  `k_descripcion` int(4) NOT NULL,
  `n_path_imagen` varchar(100) NOT NULL,
  `n_titulo` varchar(100) NOT NULL,
  `n_descripcion` varchar(600) NOT NULL,
  `k_servicio` int(2) NOT NULL,
  `orden` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `descripcion`
--

INSERT INTO `descripcion` (`k_descripcion`, `n_path_imagen`, `n_titulo`, `n_descripcion`, `k_servicio`, `orden`) VALUES
(1, 'antes_tanque.JPG', 'ANTES', 'Se cerrara el registro uno o dos días antes con el fin de desocupar el tanque en su totalidad y no desperdiciar agua durante el lavado. Para la limpieza se utilizara hipoclorito de sodio, para desinfectar pisos y paredes, escobas, manguera de riego, bombas sumergibles y mangueras de motobombas para extraer mugres y sedimentos.\n', 1, 1),
(3, 'durante_tanque.JPG', 'DURANTE', 'Contamos con elementos de protección y seguridad para nuestro personal como, casco de seguridad con lámparas alógenas, impermeable, gafas protectoras y botas de caucho. A continuación una muestra fotográfica del antes, durante  y  después de todo el  procedimiento realizado \r\n', 1, 2),
(4, 'despues_tanque.JPG', 'DESPUÉS ', 'Para esto se elaboró un programa de mantenimiento, limpieza y desinfección de tanques de almacenamiento que se recomienda realizar en forma periódica garantizando de esta manera las condiciones seguras para sus usuarios.', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `k_servicio` int(2) NOT NULL,
  `n_titulo` varchar(100) NOT NULL,
  `n_path_imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`k_servicio`, `n_titulo`, `n_path_imagen`) VALUES
(1, 'LAVADO DE TANQUE', 'despues_tanque.JPG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `k_correo` varchar(50) CHARACTER SET utf8 NOT NULL,
  `n_nombre` varchar(100) CHARACTER SET utf8 NOT NULL,
  `n_edificio_direccion` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `n_telefono` varchar(11) CHARACTER SET utf8 NOT NULL,
  `n_contrasena` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla de Usuarios';

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`k_correo`, `n_nombre`, `n_edificio_direccion`, `n_telefono`, `n_contrasena`) VALUES
('ehidraulicos.jr@hotmail.com', 'ISABEL PORRAS', NULL, '7047550', 'bombas123'),
('fabi_leon@outlook.com', 'Fabián Sánchez', 'edificio villa nueva', '3152191558', 'socito'),
('lauragocu@hotmail.com', 'laura gomez', NULL, '321274917', 'valentina34'),
('ludwingsanchez@outlook.com', 'ludwing sánchez', 'avenida 123', '3152191558', 'ludwing11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `descripcion`
--
ALTER TABLE `descripcion`
  ADD PRIMARY KEY (`k_descripcion`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`k_servicio`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`k_correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `descripcion`
--
ALTER TABLE `descripcion`
  MODIFY `k_descripcion` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `k_servicio` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
