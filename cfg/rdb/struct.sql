-- DROP deprecated tables
-- DROP tables with foreign keys to main tables
DROP TABLE IF EXISTS `employee_service`;
DROP TABLE IF EXISTS `employee_time_work`;
-- DROP main registers
DROP TABLE IF EXISTS `service`;
DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee`
(
    `id`   int(10) unsigned NOT NULL AUTO_INCREMENT,
    `code` varchar(255) DEFAULT NULL COMMENT 'Short unique name for employee.',
    PRIMARY KEY (`id`),
    UNIQUE KEY `UQ_employee__code` (`code`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='Register for employees that provide services.';

CREATE TABLE `service`
(
    `id`       int(10) unsigned     NOT NULL AUTO_INCREMENT,
    `code`     varchar(255) DEFAULT NULL COMMENT 'Short unique name for service.',
    `duration` smallint(5) unsigned NOT NULL COMMENT 'Service duration in minutes',
    PRIMARY KEY (`id`),
    UNIQUE KEY `UQ_service__code` (`code`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='Register for services.';

CREATE TABLE `employee_service`
(
    employee_ref int(10) unsigned NOT NULL,
    service_ref  int(10) unsigned NOT NULL,
    PRIMARY KEY (employee_ref, service_ref),
    CONSTRAINT `FK_employee_service__employee`
        FOREIGN KEY (employee_ref) REFERENCES `employee` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_employee_service__service`
        FOREIGN KEY (service_ref) REFERENCES `service` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='Employee provides services.';

CREATE TABLE `employee_time_work`
(
    employee_ref int(10) unsigned NOT NULL,
    `date`       char(8)          NOT NULL COMMENT 'Date as \'YYYYMMDD\'.',
    `from`       char(4)          NOT NULL DEFAULT '0900',
    `to`         char(4)          NOT NULL DEFAULT '2000',
    PRIMARY KEY (employee_ref, `date`, `from`),
    CONSTRAINT `FK_employee_time_work__employee`
        FOREIGN KEY (employee_ref) REFERENCES `employee` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='Working time for employees.';
