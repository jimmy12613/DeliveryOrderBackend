SET time_zone = "+08:00";

CREATE TABLE `APP`.`ORDER` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `distance` INT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT "UNASSIGNED",
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;


INSERT INTO `APP`.`ORDER` (`distance`) VALUES (100);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (110);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (120);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (130);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (140);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (150);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (160);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (170);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (180);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (190);
INSERT INTO `APP`.`ORDER` (`distance`) VALUES (200);