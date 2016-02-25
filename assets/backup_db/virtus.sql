-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2016 a las 08:40:41
-- Versión del servidor: 5.6.26
-- Versión de PHP: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `virtus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medalla`
--

CREATE TABLE IF NOT EXISTS `medalla` (
  `k_medalla` int(4) NOT NULL,
  `n_nombre` varchar(50) NOT NULL,
  `k_usuario` varchar(50) NOT NULL,
  `k_nive` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_usuario`
--

CREATE TABLE IF NOT EXISTS `nivel_usuario` (
  `k_nivel` int(2) NOT NULL,
  `k_usuario` varchar(50) NOT NULL,
  `n_intento` int(11) DEFAULT NULL,
  `t_duracion` int(11) NOT NULL,
  `n_secuencia` varchar(150) NOT NULL,
  `q_desorden` int(11) DEFAULT NULL,
  `q_click` int(11) NOT NULL,
  `n_teclado` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nivel_usuario`
--

INSERT INTO `nivel_usuario` (`k_nivel`, `k_usuario`, `n_intento`, `t_duracion`, `n_secuencia`, `q_desorden`, `q_click`, `n_teclado`) VALUES
(1, 'fadarsaleeing@gmail.com', 1, 12000, '4', 0, 250, 'aiemfasjdofjasodmcfaosdcfaoaejfasfalmcweocmasd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `k_correo` varchar(50) NOT NULL,
  `n_nombre` varchar(120) DEFAULT NULL,
  `q_edad` int(11) NOT NULL,
  `en_profesion` enum('TÉCNICO','TECNOLOGO','INGENIERO') NOT NULL,
  `n_contrasena` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`k_correo`, `n_nombre`, `q_edad`, `en_profesion`, `n_contrasena`) VALUES
('fadarsaleeing@gmail.com', 'Fabian Leon', 25, 'INGENIERO', '12345'),
('ludsachez@live.com', 'Ludwing', 19, 'TECNOLOGO', '12345');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `nivel_usuario`
--
ALTER TABLE `nivel_usuario`
  ADD PRIMARY KEY (`k_nivel`,`k_usuario`),
  ADD KEY `FK_idUsuario_Usuario_JU_idx` (`k_usuario`),
  ADD KEY `FK_NivelUsuario_idNivel_idx` (`k_nivel`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`k_correo`),
  ADD KEY `FK_Profesion_Usuario_idx` (`en_profesion`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `nivel_usuario`
--
ALTER TABLE `nivel_usuario`
  ADD CONSTRAINT `FK_idUsuario_Usuario_JU` FOREIGN KEY (`k_usuario`) REFERENCES `usuario` (`k_correo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
