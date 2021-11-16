-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2021 at 06:01 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `user_id1` int(11) NOT NULL,
  `user_id2` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `friends_since` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `user_id1`, `user_id2`, `status`, `friends_since`) VALUES
(127, 18, 20, 'pending', ''),
(131, 19, 18, 'accepted', '2021-11-16 07:28:40'),
(132, 18, 19, 'accepted', '2021-11-16 07:28:40');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id1` int(11) NOT NULL,
  `user_id2` int(11) NOT NULL,
  `message` text NOT NULL,
  `sendtime` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id1`, `user_id2`, `message`, `sendtime`) VALUES
(1, 1, 2, 'hi', '2021-11-12 04:48:59'),
(2, 1, 4, 'hiiii', '2021-11-12 04:56:58'),
(3, 2, 1, 'asdasdasdasad', '2021-11-12 21:51:36'),
(4, 9, 7, 'hi', '2021-11-12 23:57:10'),
(5, 9, 13, 'hi', '2021-11-13 00:00:20'),
(6, 13, 9, 'hiii', '2021-11-13 00:00:27'),
(7, 9, 14, 'hfghf', '2021-11-13 00:20:28'),
(8, 15, 9, 'asdasdasd', '2021-11-13 00:20:38'),
(9, 9, 15, 'hfghf', '2021-11-13 00:20:53'),
(10, 9, 15, 'hfghf', '2021-11-13 00:21:03'),
(11, 9, 15, 'hfghf', '2021-11-13 00:21:06'),
(12, 9, 15, 'hfghf', '2021-11-13 00:21:07'),
(13, 9, 15, 'hfghf', '2021-11-13 00:21:08'),
(14, 9, 15, 'hfghf', '2021-11-13 00:21:08'),
(15, 9, 15, 'hfghf', '2021-11-13 00:21:10'),
(16, 15, 9, 'asdasdasd', '2021-11-13 00:21:42'),
(17, 13, 9, '2312313', '2021-11-13 04:02:19'),
(18, 1, 9, 'hi', '2021-11-13 20:20:55'),
(19, 1, 9, 'hi', '2021-11-13 20:20:56'),
(20, 1, 9, 'hi', '2021-11-13 20:20:57'),
(21, 1, 9, 'hi', '2021-11-13 20:20:57'),
(22, 1, 9, 'hi', '2021-11-13 20:20:57'),
(23, 1, 9, 'hi', '2021-11-13 20:20:57'),
(24, 1, 9, 'hi', '2021-11-13 20:20:57'),
(25, 1, 9, 'fuck', '2021-11-13 20:21:02'),
(26, 9, 1, '1231231', '2021-11-13 20:26:18'),
(27, 9, 1, '1231231123123', '2021-11-13 20:26:19'),
(28, 9, 1, '1231231123123', '2021-11-13 20:26:19'),
(29, 9, 1, '1231231123123', '2021-11-13 20:26:19'),
(30, 1, 9, '123', '2021-11-13 20:31:18'),
(31, 1, 13, 'hi', '2021-11-13 21:34:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `biography` text NOT NULL,
  `imageURL` varchar(100) NOT NULL,
  `last_login` varchar(100) NOT NULL,
  `current_socket` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `biography`, `imageURL`, `last_login`, `current_socket`) VALUES
(18, '1', '1', '$2b$10$xtnpOUPOfHEw2vLZNq4Yp.HMfFUdriZICHA/2QG2dlSTe9RaRJM22', '', '', '', 'u-mdGuFu7PzJa2HDAABC'),
(19, '2', '2', '$2b$10$pgr8TV8WLPILydnwfipaZOxTl/NPpsdOChoMSF6r/NaitGv1kbbTW', '', '', '', 'uzSCwlmiplV23NzBAABG'),
(20, '3', '3@gmail.com', '$2b$10$o3BwmKji2aW67uAXSW1M6ejKCDMtX8NUOFO.fPAD7avp/1QaLIeJ2', '', '', '', ''),
(21, '5', '5', '$2b$10$ES1wtuulNnbrTOTuRxz48ubno8p7SaJ67XNqeSBxHDeQ29liw94V6', '', '1636918476929sukuna-yuji-itadori-from-jujutsu-kaisen_3840x2160_xtrafondos.com.jpg', '', ''),
(22, '6', '6', '$2b$10$tM2G7ZOO0VhRsFDAY6pkJ.nED6QAY5vRzUlD2vnK5OKTDy121ivI2', '', '16369185324744648143.jpg', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `videocall`
--

CREATE TABLE `videocall` (
  `id` int(11) NOT NULL,
  `user_id1` int(11) NOT NULL,
  `user_id2` int(11) NOT NULL,
  `call_start` varchar(100) NOT NULL,
  `call_end` varchar(100) NOT NULL,
  `call_duration` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videocall`
--
ALTER TABLE `videocall`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `videocall`
--
ALTER TABLE `videocall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
