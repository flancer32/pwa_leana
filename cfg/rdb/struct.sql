-- DROP deprecated tables
-- DROP tables with foreign keys to main tables
DROP TABLE IF EXISTS `book_employee_service`;
DROP TABLE IF EXISTS `book_employee_time_work`;
-- DROP main registers
DROP TABLE IF EXISTS `book_service`;
DROP TABLE IF EXISTS `book_employee`;

CREATE TABLE `book_employee`
(
    `id`   int(10) unsigned NOT NULL AUTO_INCREMENT,
    `code` varchar(255) DEFAULT NULL COMMENT 'Short unique name for employee.',
    PRIMARY KEY (`id`),
    UNIQUE KEY `UQ_book_employee__code` (`code`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='Register for employees that provide services.';

CREATE TABLE `book_service`
(
    `id`       int(10) unsigned     NOT NULL AUTO_INCREMENT,
    `code`     varchar(255) DEFAULT NULL COMMENT 'Short unique name for service.',
    `duration` smallint(5) unsigned NOT NULL COMMENT 'Service duration in minutes',
    PRIMARY KEY (`id`),
    UNIQUE KEY `UQ_book_service__code` (`code`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='Register for services.';

CREATE TABLE `book_employee_service`
(
    employee_ref int(10) unsigned NOT NULL,
    service_ref  int(10) unsigned NOT NULL,
    PRIMARY KEY (employee_ref, service_ref),
    CONSTRAINT `FK_book_employee_service__book_employee`
        FOREIGN KEY (employee_ref) REFERENCES `book_employee` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_book_employee_service__book_service`
        FOREIGN KEY (service_ref) REFERENCES `book_service` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='Employee provides services.';

CREATE TABLE `book_employee_time_work`
(
    employee_ref int(10) unsigned NOT NULL,
    `date`       date             NOT NULL DEFAULT curdate(),
    `from`       char(5)          NOT NULL DEFAULT '09:00',
    `to`         char(5)          NOT NULL DEFAULT '20:00',
    PRIMARY KEY (employee_ref, `date`, `from`),
    CONSTRAINT `FK_book_employee_time_work__book_employee`
        FOREIGN KEY (employee_ref) REFERENCES `book_employee` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='Working time for employees.';
