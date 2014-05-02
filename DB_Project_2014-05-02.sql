# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.5-m8)
# Database: DB_Project
# Generation Time: 2014-05-02 15:20:48 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table To_Do_List
# ------------------------------------------------------------

DROP TABLE IF EXISTS `To_Do_List`;

CREATE TABLE `To_Do_List` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` tinytext,
  `done` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(11) unsigned NOT NULL,
  `priority` char(1) NOT NULL DEFAULT 'B' COMMENT 'ABC',
  `tag` varchar(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user_id`),
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `To_Do_List` WRITE;
/*!40000 ALTER TABLE `To_Do_List` DISABLE KEYS */;

INSERT INTO `To_Do_List` (`id`, `content`, `done`, `user_id`, `priority`, `tag`, `date`)
VALUES
	(3,'123',0,1,'B',NULL,'0000-00-00 00:00:00'),
	(4,'A sdfgh',0,1,'B',NULL,'0000-00-00 00:00:00'),
	(5,'B sdfghjk',0,1,'B',NULL,'0000-00-00 00:00:00'),
	(6,'haha',0,1,'B',NULL,'0000-00-00 00:00:00');

/*!40000 ALTER TABLE `To_Do_List` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `tag` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`id`, `username`, `password`, `tag`)
VALUES
	(1,'st930112','123456',''),
	(2,'haha','123','');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
