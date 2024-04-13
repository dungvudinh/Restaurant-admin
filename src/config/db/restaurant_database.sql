-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2024 at 11:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `booking_time` time NOT NULL,
  `booking_date` date NOT NULL,
  `client_quantity` int(11) NOT NULL,
  `period_time` int(11) NOT NULL,
  `time_unit` varchar(10) NOT NULL,
  `client_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `booking_status` int(11) NOT NULL DEFAULT 1 COMMENT '1: chờ xếp bàn \r\n2: đã xếp bàn \r\n3: Đã nhận bàn\r\n4: Quá giờ/ không đến \r\n5: Đã hủy\r\n6: Đã thanh toán',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `time_checkout` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `booking_time`, `booking_date`, `client_quantity`, `period_time`, `time_unit`, `client_id`, `table_id`, `booking_status`, `created_at`, `updated_at`, `deleted_at`, `time_checkout`) VALUES
(1, '17:00:00', '2024-04-11', 4, 1, 'giờ', 1, 1, 1, '2024-04-11 16:03:04', NULL, NULL, NULL),
(2, '14:00:00', '2024-04-11', 2, 1, 'giờ', 2, 2, 6, '2024-04-11 16:12:16', NULL, NULL, '15:03:32'),
(3, '14:00:00', '2024-04-11', 2, 1, 'giờ', 3, 3, 3, '2024-04-11 16:13:35', NULL, NULL, NULL),
(4, '13:00:00', '2024-04-11', 2, 1, 'giờ', 4, 2, 6, '2024-04-11 18:02:40', NULL, NULL, '14:05:19'),
(5, '08:00:00', '2024-04-10', 2, 1, 'giờ', 1, 1, 6, '2024-04-13 09:13:39', NULL, NULL, '09:00:00'),
(6, '08:22:50', '2024-04-09', 2, 30, 'phút', 2, 2, 6, '2024-04-13 09:25:13', NULL, NULL, '09:00:00'),
(7, '08:27:05', '2024-04-08', 4, 30, 'phút', 3, 3, 6, '2024-04-13 09:29:55', NULL, NULL, '09:27:00'),
(8, '10:09:12', '2024-04-13', 2, 1, 'giờ', 4, 2, 6, '2024-04-13 13:46:46', NULL, NULL, '10:46:12');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `description` varchar(200) NOT NULL,
  `menu_type_id` int(11) NOT NULL,
  `ingredient` varchar(100) NOT NULL,
  `menu_group_id` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `image_url`, `description`, `menu_type_id`, `ingredient`, `menu_group_id`, `created_at`, `updated_at`, `deleted_at`, `price`) VALUES
(1, 'Bún chả Hà Nội', '', 'Bún chả Hà Nội - ẩm thực đậm chất Hà Nội', 1, '[\"thịt lợn\", \"cà chua\", \"rau xanh\"]', '[2]', '2024-03-18 20:55:24', NULL, NULL, 35000),
(2, 'bún đậu mắm tôm', '', 'món ăn ngon lọt top', 1, '[\"đậu rán\",\"nem\",\"thịt lợn\",\"rau\"]', '[2]', '2024-03-18 21:37:39', NULL, NULL, 35000),
(4, 'Bún bò huế', '', 'Đặc sản hương vị Huế', 1, '[\"bún\", \"móng giò\", \"thịt bò\", \"tiết bò\"]', '[2]', '2024-04-11 21:21:04', NULL, NULL, 45000);

-- --------------------------------------------------------

--
-- Table structure for table `menu_group`
--

CREATE TABLE `menu_group` (
  `id` int(11) NOT NULL,
  `menu_group_name` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_group`
--

INSERT INTO `menu_group` (`id`, `menu_group_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'món tráng miệng', '2024-03-18 21:01:48', NULL, NULL),
(2, 'món chính', '2024-03-18 21:01:48', NULL, NULL),
(3, 'món chay', '2024-03-18 21:01:58', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menu_type`
--

CREATE TABLE `menu_type` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_type`
--

INSERT INTO `menu_type` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'đồ ăn', '2024-03-18 20:59:19', NULL, NULL),
(2, 'đồ uống', '2024-03-18 20:59:19', NULL, NULL),
(3, 'khác', '2024-03-18 20:59:28', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL COMMENT 'id món ăn',
  `quantity` int(11) NOT NULL COMMENT 'số lượng món của 1 món ăn',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`id`, `table_id`, `client_id`, `menu_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 2, 1, 1, '2024-04-11 16:07:06', NULL, NULL),
(2, 2, 2, 2, 2, '2024-04-11 16:07:20', NULL, NULL),
(3, 3, 3, 2, 1, '2024-04-11 21:09:52', NULL, NULL),
(4, 3, 3, 1, 2, '2024-04-11 21:17:15', NULL, NULL),
(5, 2, 2, 4, 2, '2024-04-11 21:23:13', NULL, NULL),
(6, 2, 4, 1, 2, '2024-04-11 21:54:02', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_group`
--
ALTER TABLE `menu_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_type`
--
ALTER TABLE `menu_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menu_group`
--
ALTER TABLE `menu_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu_type`
--
ALTER TABLE `menu_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
