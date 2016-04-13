-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-04-2016 a las 06:49:49
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
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE IF NOT EXISTS `contacto` (
  `n_nombre` varchar(100) NOT NULL,
  `n_correo` varchar(100) CHARACTER SET utf16 NOT NULL,
  `n_asunto` varchar(100) NOT NULL,
  `n_mensaje` varchar(1000) NOT NULL,
  `k_contacto` int(10) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`n_nombre`, `n_correo`, `n_asunto`, `n_mensaje`, `k_contacto`) VALUES
('Fabian', 'fabi_leon@outlook.com', 'asutno', 'mensaje', 1),
('andres velandia', 'andresvelandia@hotmail.com', 'un tema en especifico', 'Este es un mensajito lindo', 2);

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
  `t_duracion` int(11) DEFAULT NULL,
  `q_click` int(11) DEFAULT NULL,
  `n_teclado` varchar(1000) DEFAULT NULL,
  `d_fecha` date DEFAULT NULL,
  `q_eficiencia` int(1) NOT NULL,
  `q_efectividad` int(1) NOT NULL,
  `q_estrategia` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nivel_usuario`
--

INSERT INTO `nivel_usuario` (`k_nivel`, `k_usuario`, `n_intento`, `t_duracion`, `q_click`, `n_teclado`, `d_fecha`, `q_eficiencia`, `q_efectividad`, `q_estrategia`) VALUES
(1, 'andresvelandia93@hotmail.com', NULL, 12000, 250, 'aiemfasjdofjasodmcfaosdcfaoaejfasfalmcweocmasd', '0000-00-00', 0, 0, 0),
(1, 'ludsachez@live.com', NULL, 0, 0, '', '0000-00-00', 0, 0, 0),
(4, 'fadarsaleeing@gmail.com', 17, 12000, 250, 'fabian"', '2016-03-22', 0, 0, 0),
(6, 'fadarsaleeing@gmail.com', 5, 12000, 250, 'aiemfasjdofjasodmcfaosdcfaoaejfasfalmcweocmasd', '2016-03-22', 0, 0, 0);

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
('andresvelandia93@hotmail.com', 'Andrés Velandia', 23, 'INGENIERO', '123456'),
('fadarsaleeing@gmail.com', 'Fabian Leon', 25, 'INGENIERO', '12345'),
('ludsachez@live.com', 'Ludwing', 19, 'TECNOLOGO', '12345');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`k_contacto`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `k_contacto` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
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
