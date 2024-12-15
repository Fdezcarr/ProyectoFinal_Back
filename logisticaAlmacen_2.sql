-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema logistica_almacen
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema logistica_almacen
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `logistica_almacen` DEFAULT CHARACTER SET utf8mb3 ;
USE `logistica_almacen` ;

-- -----------------------------------------------------
-- Table `logistica_almacen`.`almacenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logistica_almacen`.`almacenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `localizacion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logistica_almacen`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logistica_almacen`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('operario', 'encargado', 'jefe') NOT NULL,
  `almacen_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `almacen_id` (`almacen_id` ASC) VISIBLE,
  CONSTRAINT `usuarios_ibfk_1`
    FOREIGN KEY (`almacen_id`)
    REFERENCES `logistica_almacen`.`almacenes` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logistica_almacen`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logistica_almacen`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha_salida` DATE NOT NULL,
  `origen` VARCHAR(255) NOT NULL,
  `destino` VARCHAR(255) NOT NULL,
  `matricula_camion` VARCHAR(50) NOT NULL,
  `estado` ENUM('pendiente', 'revisando', 'completo') NULL DEFAULT 'pendiente',
  `operario_id` INT NULL DEFAULT NULL,
  `encargado_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `operario_id` (`operario_id` ASC) VISIBLE,
  INDEX `encargado_id` (`encargado_id` ASC) VISIBLE,
  CONSTRAINT `pedidos_ibfk_1`
    FOREIGN KEY (`operario_id`)
    REFERENCES `logistica_almacen`.`usuarios` (`id`)
    ON DELETE SET NULL,
  CONSTRAINT `pedidos_ibfk_2`
    FOREIGN KEY (`encargado_id`)
    REFERENCES `logistica_almacen`.`usuarios` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
