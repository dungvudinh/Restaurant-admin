-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2024 at 01:03 PM
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
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `phone_number`, `password`) VALUES
(16, '0869370491', '$2a$10$i1ITEwYhi5TJXveTuEdXB.SPsmVvF002fzuJRRxo6MTbu4Xe4nHFy');

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `note` varchar(200) NOT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id`, `name`, `note`, `area_id`) VALUES
(1, 'Tầng 1', 'Tầng dành cho khách thường ', 1),
(2, 'Tầng 2', 'Tầng dành cho khách VIP', 2);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `booking_time` time NOT NULL,
  `booking_date` date NOT NULL,
  `adult_quantity` int(11) NOT NULL,
  `period_time` int(11) NOT NULL,
  `time_unit` varchar(10) NOT NULL,
  `client_id` int(11) NOT NULL,
  `table_id` varchar(10) DEFAULT NULL,
  `booking_status` int(11) NOT NULL DEFAULT 1 COMMENT '0: chờ xác nhận 1: chờ xếp bàn \r\n2: đã xếp bàn \r\n3: Đã nhận bàn\r\n4: Quá giờ/ không đến \r\n5: Đã hủy\r\n6: Đã thanh toán',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `time_checkout` time DEFAULT NULL,
  `note` varchar(100) NOT NULL,
  `booking_code` varchar(20) NOT NULL,
  `children_quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `booking_time`, `booking_date`, `adult_quantity`, `period_time`, `time_unit`, `client_id`, `table_id`, `booking_status`, `created_at`, `updated_at`, `deleted_at`, `time_checkout`, `note`, `booking_code`, `children_quantity`) VALUES
(1, '17:00:00', '2024-04-11', 2, 1, 'giờ', 1, '1', 1, '2024-04-11 16:03:04', NULL, NULL, NULL, '', '', 2),
(2, '14:00:00', '2024-04-11', 2, 1, 'giờ', 2, '2', 6, '2024-04-11 16:12:16', NULL, NULL, '15:03:32', '', '', 0),
(3, '14:00:00', '2024-04-11', 2, 1, 'giờ', 3, '3', 3, '2024-04-11 16:13:35', NULL, NULL, NULL, '', '', 0),
(4, '13:00:00', '2024-04-11', 2, 1, 'giờ', 4, '2', 6, '2024-04-11 18:02:40', NULL, NULL, '14:05:19', '', '', 0),
(5, '08:00:00', '2024-04-10', 2, 1, 'giờ', 1, '1', 6, '2024-04-13 09:13:39', NULL, NULL, '09:00:00', '', '', 0),
(6, '08:22:50', '2024-04-09', 2, 30, 'phút', 2, '2', 6, '2024-04-13 09:25:13', NULL, NULL, '09:00:00', '', '', 0),
(7, '08:27:05', '2024-04-08', 4, 30, 'phút', 3, '3', 6, '2024-04-13 09:29:55', NULL, NULL, '09:27:00', '', '', 0),
(8, '10:09:12', '2024-04-13', 2, 1, 'giờ', 4, '2', 6, '2024-04-13 13:46:46', NULL, NULL, '10:46:12', '', '', 0),
(9, '08:30:20', '2024-05-05', 2, 1, 'giờ', 5, '2', 3, '2024-05-05 08:27:26', NULL, NULL, '09:26:47', '', 'HD240505010', 2),
(10, '17:00:00', '2024-05-06', 1, 1, 'giờ', 5, '[1]', 2, '2024-05-06 16:38:49', NULL, NULL, NULL, 'abcd', 'DB16323266', 1),
(11, '17:55:00', '2024-05-06', 1, 1, 'giờ', 1, '[1]', 2, '2024-05-06 16:50:59', NULL, NULL, NULL, 'abcd', 'DB16475931', 1),
(12, '17:55:00', '2024-05-06', 1, 1, 'giờ', 1, NULL, 1, '2024-05-06 16:53:50', NULL, NULL, NULL, 'abcd', 'DB16475931', 1),
(13, '09:00:00', '2024-05-07', 1, 1, 'giờ', 1, '[1]', 5, '2024-05-07 09:19:42', NULL, NULL, NULL, 'abcd', 'DB09192330', 1),
(14, '00:00:00', '0000-00-00', 1, 1, 'giờ', 1, NULL, 1, '2024-05-07 16:02:09', NULL, NULL, NULL, 'abcd', 'DB000013', 1),
(15, '16:11:00', '2024-04-07', 1, 1, 'giờ', 1, NULL, 1, '2024-05-07 16:12:05', NULL, NULL, NULL, 'abcd', 'DB000014', 1),
(19, '21:47:00', '2024-05-07', 1, 1, 'giờ', 1, '[1]', 2, '2024-05-07 21:51:02', NULL, NULL, NULL, '', 'DB000015', 0),
(20, '23:06:00', '2024-05-07', 1, 1, 'giờ', 1, '[1,2]', 2, '2024-05-07 23:06:17', NULL, NULL, NULL, '', 'DB000019', 0),
(21, '23:08:00', '2024-05-07', 1, 1, 'giờ', 3, '[1,2]', 2, '2024-05-07 23:08:49', NULL, NULL, NULL, '', 'DB000020', 0),
(22, '07:51:00', '2024-05-08', 1, 1, 'giờ', 1, '[2]', 2, '2024-05-08 07:52:52', NULL, NULL, NULL, '', 'DB000021', 0),
(23, '07:55:00', '2024-05-08', 1, 1, 'giờ', 5, '[1]', 2, '2024-05-08 07:55:47', NULL, NULL, NULL, '', 'DB000022', 0),
(24, '07:59:00', '2024-05-08', 1, 1, 'giờ', 5, '[2]', 2, '2024-05-08 07:59:38', NULL, NULL, NULL, '', 'DB000023', 0),
(25, '08:01:00', '2024-05-08', 1, 1, 'giờ', 7, '[1]', 2, '2024-05-08 08:01:24', NULL, NULL, NULL, '', 'DB000024', 0);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `full_name` varchar(30) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `client_code` varchar(20) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `img_path` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `full_name`, `phone_number`, `client_code`, `birth_date`, `address`, `gender`, `email`, `img_path`) VALUES
(1, 'Lê Tuấn Kiệt', '0355969145', 'KH000001', NULL, NULL, NULL, NULL, NULL),
(2, 'Lê Hải Anh', '0869370911', 'KH000002', NULL, NULL, NULL, NULL, NULL),
(3, 'Phạm Văn Khánh', '0869374921', 'KH000003', NULL, NULL, NULL, NULL, NULL),
(4, 'Bùi Văn Thành', '0869370952', 'KH000004', NULL, NULL, NULL, NULL, NULL),
(5, 'Nguyễn Thị Dung ', '0869374865', 'KH000005', NULL, NULL, NULL, NULL, NULL),
(6, 'Lê Hải Anh', '0869370492', 'KH000006', NULL, NULL, NULL, NULL, NULL),
(7, 'Bùi Việt Hoàng', '0869370492', 'KH000007', '2002-04-14', 'Nam Sách', 0, 'anhkho992@gmail.com', 'https://res.cloudinary.com/dek0skcdr/image/upload/v1715014465/menuImages/re4j5zbinultitvtssj4.jpg'),
(32, 'Phạm Văn Thoại', '0869370481', 'KH000008', NULL, 'Hà Nội', 0, NULL, NULL),
(33, 'Vũ Đình Dũng', '0869370412', 'KH000033', NULL, 'Nam Sách', 0, NULL, NULL),
(34, 'Vũ Đình Dũng', '0869370454', 'KH000033', NULL, 'Nam Sách', 0, NULL, NULL),
(35, 'Vũ Đình Dũng', '0869370487', 'KH000035', NULL, 'Nam Sách', 0, NULL, NULL),
(36, 'Vũ Đình Dũng', '0869370495', 'KH000036', NULL, 'Nam Sách', 0, NULL, NULL),
(37, 'Lê Khả Hoàng', '0869370411', 'KH000037', NULL, 'Nam Sách', 0, 'anhhung.14079@gmail.com', 'https://res.cloudinary.com/dek0skcdr/image/upload/v1715396455/menuImages/m73bbyo1eyhoahnjgpya.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`) VALUES
(1, 'thịt bò'),
(2, 'bún'),
(3, 'đậu rán'),
(4, 'mắm tôm'),
(5, 'móng giò'),
(6, 'cà chua'),
(7, 'cà chua'),
(8, 'rau xanh'),
(9, 'nem'),
(10, 'thịt lợn'),
(11, 'tiết lợn');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `menu_type_id` int(11) NOT NULL,
  `ingredient` varchar(100) DEFAULT NULL,
  `menu_group_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `price` double NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `image_url`, `description`, `menu_type_id`, `ingredient`, `menu_group_id`, `created_at`, `updated_at`, `deleted_at`, `price`, `is_active`) VALUES
(4, 'Bún bò huế', NULL, '', 1, '[\"1\",\"2\",\"5\",\"11\"]', 1, '2024-04-11 21:21:04', '2024-05-02 21:47:25', NULL, 45000, 1),
(5, 'gỏi củ hủ dừa', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714615096/menuImages/vsz8qazibjisctprdgyj.jpg\",\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714615116/menuImages/fgl5rhkqt7csh1rer1sr.jpg\"]', '', 1, '[\"4\",\"7\",\"9\"]', 1, '2024-04-24 11:56:36', '2024-05-02 21:29:39', NULL, 40000, 0),
(10, 'Bún chả Hà Nội', NULL, 'Đặc sản Hà Nội', 1, '[1, 2]', 1, '2024-04-26 08:17:18', NULL, NULL, 3500, 1),
(20, 'mỳ cay', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714555412/menuImages/lemqk1uocnntxj6bwyrt.jpg\",\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714555413/menuImages/f327ymsuxedrc1va1u60.jpg\",\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714555413/menuImages/uoedlgtvqr7zkvfc7g1m.jpg\"]', 'abcd', 1, '[\"3\",\"5\",\"7\",\"8\"]', 1, '2024-05-01 16:23:34', NULL, NULL, 55000, 1),
(21, 'Nem Nướng Nha Trang', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714635786/menuImages/kbr1gbtqgngawg34ppua.jpg\"]', 'Đặc sản Nha Trang', 1, '[\"3\",\"5\",\"7\",\"8\"]', 1, '2024-05-02 14:43:06', NULL, NULL, 45000, 1),
(22, 'Bún Cá Măng Cay', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714635871/menuImages/txxwe4oyioyvnru4bygo.jpg\"]', 'abcd', 1, '[\"6\",\"8\",\"10\"]', 1, '2024-05-02 14:44:30', NULL, NULL, 35000, 1),
(23, 'Mỳ Cay Hải Sản', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714635921/menuImages/j8qn4cvpaqe7fgmnkkqv.jpg\"]', '', 1, '[\"3\",\"5\"]', 1, '2024-05-02 14:45:21', NULL, NULL, 55000, 1),
(25, 'Nước Cam Ép', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714658907/menuImages/enzhmalsqg6cnd3tlfnn.jpg\"]', '', 2, NULL, 4, '2024-05-02 16:15:46', '2024-05-02 21:08:26', NULL, 35000, 1),
(26, 'Rượu Vang', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714658607/menuImages/vigaymiwjvxb7hyjl1yf.webp\"]', '', 2, '[\"4\",\"6\",\"9\"]', 5, '2024-05-02 16:16:07', '2024-05-02 21:03:40', NULL, 65000, 1),
(27, 'Rượu Nho', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1714657437/menuImages/wosebxvvzo8wnkkwerv6.jpg\"]', '', 2, '[\"3\",\"4\"]', 5, '2024-05-02 20:43:56', NULL, NULL, 100000, 1),
(28, 'Bún chả', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715252113/menuImages/n25nzriizt1cze2iqnvk.jpg\",\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715252114/menuImages/swwj8iwg4efimhet9prk.webp\",\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715252114/menuImages/dsw3t11q8qfwl9qgbaub.jpg\"]', '', 1, NULL, 1, '2024-05-09 17:55:11', NULL, NULL, 35000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `menu_group`
--

CREATE TABLE `menu_group` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_group`
--

INSERT INTO `menu_group` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'món chính', '2024-03-18 21:01:48', NULL, NULL),
(2, 'món khai vị', '2024-03-18 21:01:48', NULL, NULL),
(3, 'món tráng miệng', '2024-03-18 21:01:58', NULL, NULL),
(4, 'Nước Ép', '2024-05-02 20:55:03', NULL, NULL),
(5, 'Rượu', '2024-05-02 20:55:03', NULL, NULL);

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
-- Table structure for table `order_menu`
--

CREATE TABLE `order_menu` (
  `id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `order_menu` varchar(1000) NOT NULL,
  `client_quantity` int(11) NOT NULL,
  `note` varchar(100) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `booking_code` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1: đơn chưa thanh toán, 2: đơn đã thanh toán, 3: đơn đã hủy',
  `order_code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 2, 2, 4, 1, '2024-04-11 16:07:06', NULL, NULL),
(2, 2, 2, 4, 2, '2024-04-11 16:07:20', NULL, NULL),
(3, 3, 3, 5, 1, '2024-04-11 21:09:52', NULL, NULL),
(4, 3, 3, 5, 2, '2024-04-11 21:17:15', NULL, NULL),
(5, 2, 2, 4, 2, '2024-04-11 21:23:13', NULL, NULL),
(6, 2, 4, 10, 2, '2024-04-11 21:54:02', NULL, NULL),
(7, 2, 5, 10, 2, '2024-05-04 08:22:33', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roomtable`
--

CREATE TABLE `roomtable` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `chair_quantity` int(11) NOT NULL,
  `note` varchar(200) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `area` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roomtable`
--

INSERT INTO `roomtable` (`id`, `name`, `chair_quantity`, `note`, `status`, `created_at`, `updated_at`, `deleted_at`, `area`, `is_active`) VALUES
(1, 'Bàn số 1', 4, 'Bàn dành cho 4 người', 1, '2024-05-01 14:05:32', NULL, NULL, 1, 1),
(2, 'Bàn số 2', 4, 'Bàn dành cho khách vip', 1, '2024-05-02 15:43:57', NULL, NULL, 1, 1),
(3, 'Bàn số 3', 4, 'Bàn dành cho gia đình', 0, '2024-05-02 15:44:22', NULL, NULL, 2, 1),
(4, 'Bàn số 4', 4, 'blalal', 1, '2024-05-02 15:58:00', NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `table_history`
--

CREATE TABLE `table_history` (
  `bill_id` varchar(10) NOT NULL,
  `date` date NOT NULL,
  `created_by` varchar(30) NOT NULL,
  `client_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `table_history`
--

INSERT INTO `table_history` (`bill_id`, `date`, `created_by`, `client_id`, `table_id`, `total`) VALUES
('HD0001', '2024-03-19', 'Vũ Đình Dũng', 1, 1, 70000),
('HD0002', '2024-04-01', 'Vũ Đình Dũng', 2, 1, 100000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

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
-- Indexes for table `order_menu`
--
ALTER TABLE `order_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roomtable`
--
ALTER TABLE `roomtable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `menu_group`
--
ALTER TABLE `menu_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `menu_type`
--
ALTER TABLE `menu_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_menu`
--
ALTER TABLE `order_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roomtable`
--
ALTER TABLE `roomtable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
