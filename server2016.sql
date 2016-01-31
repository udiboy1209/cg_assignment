-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 01, 2016 at 12:33 AM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `server2016`
--

-- --------------------------------------------------------

--
-- Table structure for table `acco_request`
--

CREATE TABLE IF NOT EXISTS `acco_request` (
  `mi_no` varchar(12) NOT NULL,
  `cl_request` tinyint(1) NOT NULL,
  `group_no` int(11) NOT NULL,
  UNIQUE KEY `mi_no` (`mi_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `acco_request`
--

INSERT INTO `acco_request` (`mi_no`, `cl_request`, `group_no`) VALUES
('MI-TES-101', 1, 0),
('MI-TES-102', 1, 0),
('MI-TES-104', 0, 1),
('MI-TES-106', 0, 1),
('MI-TES-107', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE IF NOT EXISTS `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`) VALUES
(1, 'Mumbai'),
(2, 'Pune'),
(3, 'Nagpur'),
(6, 'Delhi'),
(7, 'Kanpur'),
(9, 'Madras'),
(10, 'Jamshedpur');

-- --------------------------------------------------------

--
-- Table structure for table `clusers`
--

CREATE TABLE IF NOT EXISTS `clusers` (
  `mi_no` text NOT NULL,
  `college` int(11) NOT NULL,
  `password` text NOT NULL,
  UNIQUE KEY `college` (`college`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clusers`
--

INSERT INTO `clusers` (`mi_no`, `college`, `password`) VALUES
('MI-TES-102', 1, ''),
('MI-TES-103', 2, 'kjsomaiya'),
('MI-TES-106', 4, '');

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE IF NOT EXISTS `colleges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` int(11) NOT NULL,
  `name` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`id`, `city`, `name`) VALUES
(1, 1, 'IIT Bombay'),
(2, 1, 'KJ Somaiya'),
(4, 2, 'ABC College'),
(5, 9, 'IIT Madras'),
(6, 2, 'XYZ College'),
(7, 1, 'PACE powai'),
(8, 1, 'Don Bosco'),
(9, 6, 'IIT Delhi'),
(10, 6, 'Delhi University'),
(11, 10, 'Tata Institute'),
(12, 3, 'Mango College');

-- --------------------------------------------------------

--
-- Table structure for table `competitions`
--

CREATE TABLE IF NOT EXISTS `competitions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `min_team_size` int(11) NOT NULL,
  `max_team_size` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `competitions`
--

INSERT INTO `competitions` (`id`, `name`, `min_team_size`, `max_team_size`) VALUES
(1, 'Sutta Phuking', 2, 5),
(2, 'Dance', 5, 10),
(3, 'Music', 1, 1),
(4, 'Comedy', 1, 2),
(5, 'Quiz', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `compi_reg`
--

CREATE TABLE IF NOT EXISTS `compi_reg` (
  `compi` int(11) NOT NULL,
  `team` int(11) NOT NULL,
  `mi_no` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `compi_reg`
--

INSERT INTO `compi_reg` (`compi`, `team`, `mi_no`) VALUES
(1, 1, 'MI-TES-101'),
(1, 1, 'MI-TES-102'),
(5, 1, 'MI-TES-103'),
(5, 1, 'MI-TES-104'),
(5, 1, 'MI-TES-105'),
(1, 2, 'MI-TES-107'),
(1, 2, 'MI-TES-108'),
(1, 2, 'MI-TES-106');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('4BPofyeSGDHZYdoTNiaibOdRIsNhAL6j', 1454263940, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"root":true}'),
('nLMLKcOHkmmkt9iyck7hl2pD_ck9vn28', 1454311920, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"root":true}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `mi_no` varchar(12) DEFAULT NULL,
  `name` text NOT NULL,
  `college` int(11) NOT NULL,
  `dob` text NOT NULL,
  `phone` text NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `year_of_study` int(11) NOT NULL,
  `email` text NOT NULL,
  UNIQUE KEY `mi_no` (`mi_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`mi_no`, `name`, `college`, `dob`, `phone`, `gender`, `year_of_study`, `email`) VALUES
('MI-TES-101', 'Test 1', 1, '2016-01-01', '9090909090', 1, 2, 'mudeshi1209@gmail.com'),
('MI-TES-102', 'Test 2', 1, '2016-01-01', '9090909090', 0, 2, 'mudeshi1209@gmail.com'),
('MI-TES-103', 'Test 3', 2, '2016-01-01', '9090909090', 1, 4, 'mudeshi1209@gmail.com'),
('MI-TES-104', 'Test 4', 2, '2016-01-01', '9090909090', 0, 1, 'mudeshi1209@gmail.com'),
('MI-TES-105', 'Test 5', 2, '2016-01-01', '9090909090', 0, 4, 'mudeshi1209@gmail.com'),
('MI-TES-106', 'Test 6', 4, '2016-01-01', '9090909090', 0, 3, 'mudeshi1209@gmail.com'),
('MI-TES-107', 'Test 7', 4, '2016-01-01', '9090909090', 1, 2, 'mudeshi1209@gmail.com'),
('MI-TES-109', 'Test 9', 9, '2016-01-01', '9090199090', 0, 5, 'mudeshi1209@gmail.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
