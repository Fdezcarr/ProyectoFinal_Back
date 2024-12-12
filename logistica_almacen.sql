-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2024 a las 13:00:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `logistica_almacen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacenes`
--

CREATE TABLE `almacenes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `localizacion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `almacenes`
--

INSERT INTO `almacenes` (`id`, `nombre`, `localizacion`) VALUES
(1, 'Almacén Norte', 'Calle del Norte 123, Madrid'),
(2, 'Almacén Sur', 'Calle del Sur 456, Sevilla'),
(3, 'Almacén Central', 'Avenida Central 789, Barcelona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(10) UNSIGNED NOT NULL,
  `fecha_salida` date NOT NULL,
  `origen` varchar(255) NOT NULL,
  `destino` varchar(255) NOT NULL,
  `matricula_camion` varchar(50) NOT NULL,
  `estado` enum('completado','revisando','pendiente') DEFAULT 'pendiente',
  `operario_id` int(10) UNSIGNED DEFAULT NULL,
  `encargado_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `fecha_salida`, `origen`, `destino`, `matricula_camion`, `estado`, `operario_id`, `encargado_id`) VALUES
(1, '2024-12-14', 'Madrid', 'Barcelona', 'ABC-1234', 'revisando', NULL, NULL),
(2, '2024-12-15', 'Badajoz', 'Cádiz', '0000DFD', 'revisando', NULL, NULL),
(3, '2024-12-13', 'Teruel', 'Almería', '0265FTA', 'completado', NULL, NULL),
(4, '2024-12-16', 'Alicante', 'Murcia', 'DEF-2345', 'completado', NULL, NULL),
(5, '2024-12-12', 'Valladolid', 'Salamanca', 'GHI-3456', 'revisando', NULL, NULL),
(6, '2024-12-14', 'Toledo', 'Cuenca', 'JKL-4567', 'completado', NULL, NULL),
(7, '2024-12-15', 'Zaragoza', 'Huesca', 'NOP-5678', 'pendiente', NULL, NULL),
(8, '2024-12-17', 'Santander', 'Oviedo', 'QRS-6789', 'revisando', NULL, NULL),
(9, '2024-12-11', 'Cádiz', 'Málaga', 'TUV-7890', 'completado', NULL, NULL),
(10, '2024-12-18', 'Burgos', 'León', 'WXY-8901', 'pendiente', NULL, NULL),
(11, '2024-12-13', 'Girona', 'Tarragona', 'ZAB-9012', 'revisando', NULL, NULL),
(12, '2024-12-14', 'Pamplona', 'Logroño', 'CDE-0123', 'completado', NULL, NULL),
(13, '2024-12-16', 'Córdoba', 'Almería', 'FGH-1234', 'pendiente', NULL, NULL),
(14, '2024-12-15', 'Lugo', 'Ourense', 'IJK-2345', 'revisando', NULL, NULL),
(15, '2024-12-14', 'Las Palmas', 'Santa Cruz de Tenerife', 'LMO-3456', 'pendiente', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('operario','encargado','jefe') NOT NULL,
  `almacen_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `rol`, `almacen_id`) VALUES
(2, 'Jose', 'Lopez', 'jose@gmail.com', '$2a$08$dQq/99LAu.zOdOlmZ7M9bOckD1ym3mZ9R6IUs4AX4VIkN1oZG6Irm', 'jefe', NULL),
(4, 'Pepe', 'pepe', 'pepe@pepe.es', '$2a$08$eGgPbgobcndVDJVYvhRZV.HCzCsFW/LFI1DYQnF0pchzqXwYaVdDW', 'operario', NULL),
(5, 'Juan', 'Perez', 'juan@juan.es', '$2a$08$W7UNBPOAz/6W/B5C9S12h.ZrC1z3Y0.hpwAmwrXIlyAQWn7p5ziMO', 'encargado', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `almacenes`
--
ALTER TABLE `almacenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `almacen_id` (`almacen_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `almacenes`
--
ALTER TABLE `almacenes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`almacen_id`) REFERENCES `almacenes` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
