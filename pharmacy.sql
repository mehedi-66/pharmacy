-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 22, 2021 at 01:45 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Medicine` varchar(100) NOT NULL,
  `BuyDate` date NOT NULL,
  `Total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`ID`, `Name`, `Medicine`, `BuyDate`, `Total`) VALUES
(14, 'Karim', 'Napa Extra', '2021-11-24', 20),
(15, 'Hasan', 'Napa Extra', '2021-12-21', 2),
(16, 'Mehedi', 'Napa Extra', '2021-12-21', 2),
(17, 'Hasan', 'Napa Extra', '2021-12-21', 2),
(18, 'Joy', 'Napa Extra', '2021-12-21', 2),
(19, 'Alamin', 'Napa Extra', '2021-12-21', 2),
(20, 'Hibib', 'Napa Extra', '2021-12-21', 2),
(21, 'Hasan', 'Napa Extra', '2021-12-21', 2),
(22, 'Karim', 'Napa Extra', '2021-12-21', 2),
(23, 'Karim', 'Napa Extra', '2021-12-21', 2),
(24, 'Hasan', 'Napa Extra', '2021-12-21', 2),
(25, 'Hasan', 'Napa Extra', '2021-12-21', 2);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Price` int(11) NOT NULL,
  `Available` int(11) NOT NULL,
  `BuyDate` date NOT NULL,
  `ExpireDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`ID`, `Name`, `Price`, `Available`, `BuyDate`, `ExpireDate`) VALUES
(15, 'Napa Extra', 2, 38, '2021-11-10', '2022-01-30'),
(16, 'Surgel', 5, 50, '2021-11-22', '2021-11-10'),
(17, 'Pantonix', 5, 105, '2021-11-19', '2021-11-23'),
(18, 'Sanofi', 20, 40, '2021-11-20', '2022-01-30'),
(19, 'Thairox', 30, 20, '2021-11-10', '2021-11-23'),
(20, 'Aspirin', 2, 63, '2021-11-09', '2022-01-11'),
(21, 'Paracetamol', 3, 103, '2021-11-12', '2022-01-31'),
(22, 'Antacid', 5, 30, '2021-11-10', '2021-11-22'),
(23, 'Antihistamine', 10, 0, '2021-11-10', '2022-02-28'),
(24, 'lozenges', 4, 0, '2021-11-04', '2022-01-25'),
(25, 'Antiseptic', 30, 15, '2021-10-05', '2021-11-23'),
(26, 'Antifungal ', 20, 0, '2021-11-10', '2021-11-23'),
(28, 'Napa', 2, 60, '2021-11-24', '2022-01-30');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `body`) VALUES
(1, 'updated Title', 'This post number one'),
(2, 'post one', 'This post number one'),
(3, 'post Two', 'This post number one'),
(4, 'post Two', 'This post number one');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
