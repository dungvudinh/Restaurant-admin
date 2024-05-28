-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2024 at 10:20 AM
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
(16, '0869370491', '$2a$10$47P9pkLU1Fe.ulZWxtVZBuhe8lNFfKxml5o6maKg8QPckrwjgxyHe'),
(18, '0869370492', '$2a$10$MqCKRrzRuPJUZep4nXmb8eNo3qCjjxgr3rAtAhAupRWf16rIIBMty'),
(19, '0355969145', '$2a$10$rHgjT8.TsxNOjEklYWgW.O9ie3lXa4077dVh7qAALBjrOqCSMBrk2'),
(20, '0355969123', '$2a$10$og0CdKcUbtPqP2pFts2Ww.RxIhDVVqESXt8.43AMXHaN4fWKUV64S'),
(21, '0355969967', '$2a$10$jCPDVOwQaRjmQdfpxb9Rp.3uxVK0E2fbGFkF6qMKlTPqxjHdb1dI.');

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
(1, '09:19:14', '2024-05-16', 2, 1, 'giờ', 4, '[2]', 5, '2024-05-16 09:20:23', NULL, NULL, NULL, '', 'DB000001', 2),
(2, '10:21:00', '2024-05-16', 1, 1, 'hour', 49, '[2]', 5, '2024-05-16 09:22:18', NULL, NULL, NULL, '', 'DB000002', 1),
(3, '10:21:00', '2024-05-16', 1, 1, 'hour', 50, '[1]', 6, '2024-05-16 09:25:04', NULL, NULL, NULL, '', 'DB000003', 1),
(4, '10:21:00', '2024-05-16', 1, 1, 'hour', 51, '[1]', 6, '2024-05-16 09:37:16', NULL, NULL, NULL, '', 'DB000004', 1),
(5, '23:03:00', '2024-05-16', 1, 1, 'hour', 52, NULL, 1, '2024-05-16 23:05:52', NULL, NULL, NULL, '', 'DB000005', 1),
(6, '11:51:00', '2024-05-17', 1, 1, 'hour', 53, '[1]', 5, '2024-05-17 11:52:18', NULL, NULL, NULL, '', 'DB000006', 0),
(7, '11:51:00', '2024-05-17', 1, 1, 'hour', 54, '[2]', 5, '2024-05-17 11:54:28', NULL, NULL, NULL, '', 'DB000007', 0),
(8, '18:29:00', '2024-05-19', 1, 1, 'giờ', 5, '[2]', 2, '2024-05-19 18:35:25', NULL, NULL, NULL, '', 'DB000008', 0),
(9, '17:58:00', '2024-05-24', 1, 1, 'hour', 55, '[1]', 6, '2024-05-24 17:59:23', NULL, NULL, NULL, '', 'DB000009', 1),
(10, '14:40:00', '2024-05-28', 1, 1, 'hour', 56, '[1]', 6, '2024-05-28 14:49:27', NULL, NULL, NULL, '', 'DB000010', 1);

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
(33, 'Vũ Kiều Linh', '0869370412', 'KH000033', NULL, 'Nam Sách', 0, NULL, NULL),
(34, 'Trương Mỹ Hạnh', '0869370454', 'KH000033', NULL, 'Nam Sách', 0, NULL, NULL),
(35, 'Nguyễn Thị Ngân', '0869370487', 'KH000035', NULL, 'Nam Sách', 0, NULL, NULL),
(36, 'Vũ Đình Dũng', '0869370495', 'KH000036', NULL, 'Nam Sách', 0, NULL, NULL),
(37, 'Lê Khả Hoàng', '0869370411', 'KH000037', NULL, 'Nam Sách', 0, 'anhhung.14079@gmail.com', 'https://res.cloudinary.com/dek0skcdr/image/upload/v1715396455/menuImages/m73bbyo1eyhoahnjgpya.jpg'),
(38, 'Lê Hoàng Anh', '0832984324', 'KH000038', NULL, NULL, NULL, NULL, NULL),
(39, 'Đăng Lê Nguyên Vũ', '0832984324', 'KH000039', NULL, NULL, NULL, NULL, NULL),
(40, 'Nguyễn Văn Anh', '0355969123', 'KH000040', NULL, NULL, NULL, NULL, NULL),
(41, 'Bùi Khắc Tùng', '0355969198', 'KH000041', NULL, NULL, NULL, NULL, NULL),
(42, 'Nguyễn Thanh Tùng', '0355969967', 'KH000042', NULL, NULL, NULL, NULL, NULL),
(43, 'Nguyễn Tùng Dương', '0984203937', 'KH000043', NULL, NULL, NULL, NULL, NULL),
(44, 'Bùi Văn Danh', '0984203937', 'KH000044', NULL, NULL, NULL, NULL, NULL),
(45, 'Lê Trung Kiên', '0984203937', 'KH000045', NULL, NULL, NULL, NULL, NULL),
(46, 'Vũ Tấn Trường', '0984203937', 'KH000046', NULL, NULL, NULL, NULL, NULL),
(47, 'Nguyễn Tuấn Giang', '0984203937', 'KH000047', NULL, NULL, NULL, NULL, NULL),
(48, 'Đào Thanh Thảo', '0984203937', 'KH000048', NULL, NULL, NULL, NULL, NULL),
(49, 'Nguyễn Mỹ Linh', '0984203937', 'KH000049', NULL, NULL, NULL, NULL, NULL),
(50, 'Nguyễn Hồng Sơn', '0984203937', 'KH000050', NULL, NULL, NULL, NULL, NULL),
(51, 'Triệu Mỹ Linh', '0984203437', 'KH000051', NULL, NULL, NULL, NULL, NULL),
(52, 'Triệu Mỹ Linh', '0984203437', 'KH000052', NULL, NULL, NULL, NULL, NULL),
(53, 'Trần Tuấn Nghĩa', '0559507343', 'KH000053', NULL, NULL, NULL, NULL, NULL),
(54, 'Trần Tuấn Hà ', '0559507348', 'KH000054', NULL, NULL, NULL, NULL, NULL),
(55, 'Lê Hoàng Anh', '0559507342', 'KH000055', NULL, NULL, NULL, NULL, NULL),
(56, 'Hoàng Tuấn Anh', '0559507381', 'KH000056', NULL, NULL, NULL, NULL, NULL);

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
(4, 'Filet mignon', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715709676/menuImages/yif72bkfksdt5wksvslz.jpg\"]', '', 1, NULL, 1, '2024-04-11 21:21:04', '2024-05-15 01:02:48', NULL, 25000, 1),
(5, 'Sườn cừu nướng', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715709702/menuImages/jw9mumq3vytxwwcu2jwr.jpg\"]', '', 1, NULL, 1, '2024-04-24 11:56:36', '2024-05-15 01:02:56', NULL, 135000, 1),
(10, 'Sashimi đặc biệt', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715709739/menuImages/uki38zxgnrgxafmxcid8.jpg\"]', '', 1, NULL, 1, '2024-04-26 08:17:18', '2024-05-15 01:03:11', NULL, 100000, 1),
(20, 'Lobster Thermidor', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715709847/menuImages/libo6qf0roditx9xql9u.jpg\"]', 'Một món hải sản sang trọng, lobster được hấp hoặc nướng rồi phục vụ với một phần sốt kem phong phú.', 1, NULL, 1, '2024-05-01 16:23:34', '2024-05-15 01:04:07', NULL, 200000, 1),
(21, 'Foie gras', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715709904/menuImages/ucmqwcchml7ytbqgwayq.jpg\"]', 'Một loại gan vịt hoặc ngỗng nấu chín tới mức mềm mịn, thường được phục vụ với một loại nước sốt ngọt ngào.', 1, NULL, 1, '2024-05-02 14:43:06', '2024-05-15 01:05:04', NULL, 45000, 1),
(22, 'Cá hồi nướng', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715709939/menuImages/hfj5rcq0wpgmwkgwy4nm.jpg\"]', '', 1, NULL, 1, '2024-05-02 14:44:30', '2024-05-15 01:06:34', NULL, 300000, 1),
(25, 'Nước Ép Dưa Hấu', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715741845/menuImages/xqpka2qt0s20b4v3rf7l.jpg\"]', '', 2, NULL, 4, '2024-05-02 16:15:46', '2024-05-15 09:57:25', NULL, 35000, 1),
(26, 'Rượu Vang Ý', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715742129/menuImages/jsvg7g0pb6g9q3yfah1q.jpg\"]', '', 2, '[\"4\",\"6\",\"9\"]', 5, '2024-05-02 16:16:07', '2024-05-15 10:02:09', NULL, 155000, 1),
(27, 'Rượu Vang Chi Lê', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715742152/menuImages/hlo99fzxgfj4kdj3zy5l.jpg\"]', '', 2, '[\"3\",\"4\"]', 5, '2024-05-02 20:43:56', '2024-05-15 10:02:31', NULL, 100000, 1),
(33, 'Thịt cừu nướng kiểu Mediteranean', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715710066/menuImages/tpxph4fgtszworij2c0u.jpg\"]', ' Thịt cừu được ướp gia vị và nướng tới mức chín mềm, thường được phục vụ với rau xanh và sốt yogurt', 1, NULL, 1, '2024-05-15 01:07:46', NULL, NULL, 250000, 1),
(34, 'Cá ngừ hạt tiêu', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715710096/menuImages/anh2uhsf2einskvbebwz.jpg\"]', 'Miếng cá ngừ tươi ngon được ướp gia vị và ăn kèm với hạt tiêu đen tươi và rau xanh', 1, NULL, 1, '2024-05-15 01:08:16', NULL, NULL, 120000, 1),
(35, 'Risotto hải sản', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715710172/menuImages/yvnjkc4msx4xdqm2jvha.jpg\"]', 'Một món risotto ngon miệng với hải sản tươi, như tôm, sò điệp, và mực.', 1, NULL, 1, '2024-05-15 01:09:32', NULL, NULL, 145000, 1),
(36, 'Đùi vịt hầm nấm', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715710207/menuImages/mgyysaynwdaj6afrmlmx.jpg\"]', 'Một món thịt vịt mềm mịn được nấu chín cùng với nấm và sốt hảo hạng.', 1, NULL, 1, '2024-05-15 01:10:07', NULL, NULL, 95000, 1),
(38, 'Bruschetta của Ý', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737356/menuImages/mfkgs9zpppjs0eozsbvl.jpg\"]', 'Một hòa quyện tuyệt vời giữa cà chua tươi, tỏi thơm và dầu ô liu trên miếng bánh mì nướng giòn, Bruschetta là hình ảnh đích thực của sự tinh tế và hương vị Ý.', 1, NULL, 2, '2024-05-15 08:42:35', '2024-05-16 11:29:58', NULL, 135000, 1),
(39, 'Soup À L’oignon', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737536/menuImages/whmlu7alyekqg9mqwy8b.jpg\"]', 'Soup À L’oignon - một hòa quyện tinh tế giữa hành tây caramelized, nước dùng thơm ngậy, và lớp phủ phô mai nóng hổi, tạo nên một hương vị truyền thống đậm đà của ẩm thực Pháp, làm tan chảy trái tim củ', 1, NULL, 2, '2024-05-15 08:45:36', '2024-05-16 11:31:27', NULL, 235000, 1),
(40, 'Soup Bouillabaisse', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737578/menuImages/gqgbfet1lawwaisbvjw7.jpg\"]', 'Soup Bouillabaisse - một biểu tượng ẩm thực Pháp, với hương vị hài hòa của hải sản tươi ngon, gia vị phong phú và hương thơm nồng nàn từ rau mùi, tạo nên một trải nghiệm ẩm thực đích thực của miền địa', 1, NULL, 2, '2024-05-15 08:46:17', '2024-05-16 11:30:51', NULL, 195000, 1),
(41, 'Soup Solyanka của Nga', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737602/menuImages/rtlubf7cms0dg2tjgj7r.jpg\"]', 'Soup Solyanka - một hòa quyện độc đáo giữa hương vị chua cay của cà chua, đậm đà của thịt xông khói và hương thơm của gia vị, tạo nên một trải nghiệm ẩm thực đậm đà và phóng khoáng của nền văn hóa ẩm ', 1, NULL, 2, '2024-05-15 08:46:42', '2024-05-16 11:31:51', NULL, 250000, 1),
(42, 'Caesar salad', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737638/menuImages/tqedbl5uklq5yxmb6o0g.jpg\"]', 'Caesar Salad - một sự pha trộn tinh tế giữa rau xanh tươi mát, sự giòn ngọt của bánh mì nướng, và hương vị đặc trưng của sốt Caesar, tạo nên một trải nghiệm ẩm thực cổ điển, đầy hấp dẫn và sảng khoái.', 1, NULL, 2, '2024-05-15 08:47:17', '2024-05-16 11:32:25', NULL, 100000, 1),
(43, 'Đậu Nành Luộc – Edamame', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737660/menuImages/asoxdwyoxjbtx430unff.jpg\"]', 'Đậu Nành Luộc, hay còn gọi là Edamame, là một món ăn nhẹ đầy dinh dưỡng, với vị ngọt tự nhiên và hương thơm đặc trưng của hạt đậu tươi, là sự lựa chọn hoàn hảo để bắt đầu một bữa ăn thú vị và làm dậy ', 1, NULL, 2, '2024-05-15 08:47:40', '2024-05-16 11:34:32', NULL, 80000, 1),
(44, 'Sunomono dưa leo', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737688/menuImages/s1w0lpki1nbkjwzzkohs.jpg\"]', 'Sunomono dưa leo - một hòa quyện hài hòa giữa dưa leo tươi mát và sốt giấm ngọt dịu, tạo nên một khẩu vị sảng khoái và hấp dẫn, là lựa chọn hoàn hảo để làm mát vị giác trong một bữa ăn Nhật Bản truyền', 1, NULL, 2, '2024-05-15 08:48:08', '2024-05-16 11:35:59', NULL, 75000, 1),
(45, 'Satay', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737832/menuImages/pt3lasoi6tozd0ud1wu2.jpg\"]', 'Satay - một hòa quyện tinh tế giữa thịt thơm béo được nướng và sốt đậm đà từ gia vị, tạo nên một trải nghiệm ẩm thực độc đáo, đầy hương vị và cay nồng, làm sôi động khẩu vị và làm thăng hoa trải nghiệ', 1, NULL, 2, '2024-05-15 08:50:32', NULL, NULL, 235000, 1),
(46, 'Gado-gado', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737859/menuImages/yec3dpllkgbenakljnre.jpg\"]', 'Gado-gado - một hòa quyện tinh tế giữa rau sống tươi mát, đậu hủ, trứng luộc, khoai tây và sốt đậm đà từ đậu phụng, tạo nên một trải nghiệm ẩm thực Indonesia độc đáo, đầy dinh dưỡng và ngon miệng, là ', 1, NULL, 2, '2024-05-15 08:50:59', NULL, NULL, 300000, 1),
(47, 'Há cảo', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715737882/menuImages/jxjdda4oydpu2geregkc.jpg\"]', 'Há Cảo - một biểu tượng của ẩm thực Trung Quốc, với lớp vỏ mỏng mịn, bên trong là nhân nhuyễn mềm của tôm và thịt cua, tạo nên một hương vị độc đáo và phong phú, là một món ăn khó cưỡng từ vẻ đẹp đến ', 1, NULL, 2, '2024-05-15 08:51:22', NULL, NULL, 50000, 1),
(48, 'Bánh mochi', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715738030/menuImages/dfkru2iod4jrrhwos3do.png\"]', '', 1, NULL, 3, '2024-05-15 08:53:49', NULL, NULL, 35000, 1),
(49, 'Kem', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715738085/menuImages/xs5wi9maoltqjh6z0mgb.jpg\"]', '', 1, NULL, 3, '2024-05-15 08:54:44', NULL, NULL, 25000, 1),
(50, 'Panna cotta', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715738125/menuImages/o2kw2p0ha8qqg2hafowj.jpg\"]', '', 1, NULL, 3, '2024-05-15 08:55:25', NULL, NULL, 45000, 1),
(51, 'Bánh flan', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715738142/menuImages/jauba1tecs4htojgishh.jpg\"]', '', 1, NULL, 3, '2024-05-15 08:55:41', NULL, NULL, 25000, 1),
(52, 'Pudding', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715738157/menuImages/xxep26xonarzoufp2tb0.jpg\"]', '', 1, NULL, 3, '2024-05-15 08:55:56', NULL, NULL, 45000, 1),
(53, 'Bánh táo', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715738177/menuImages/dkp4zuaif3iomzn7chjs.jpg\"]', '', 1, NULL, 3, '2024-05-15 08:56:17', NULL, NULL, 55000, 1),
(54, 'Bánh tart', '[\"https://res.cloudinary.com/dek0skcdr/image/upload/v1715738193/menuImages/clrws35ksorawd2m6owl.jpg\"]', '', 1, NULL, 3, '2024-05-15 08:56:32', NULL, NULL, 55000, 1);

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
  `booking_code` varchar(10) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1: đơn chưa thanh toán, 2: đơn đã thanh toán, 3: đơn đã hủy',
  `order_code` varchar(10) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_menu`
--

INSERT INTO `order_menu` (`id`, `client_id`, `table_id`, `order_menu`, `client_quantity`, `note`, `employee_id`, `booking_code`, `created_at`, `updated_at`, `deleted_at`, `status`, `order_code`, `order_id`) VALUES
(67, 4, 1, '[]', 2, '', 1, NULL, '2024-05-13 20:32:33', NULL, NULL, 2, 'HD000001', 1),
(87, 1, 1, '[{\"order_menu_id\":4,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":20,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 1, '', 1, 'DB000035', '2024-05-13 21:35:48', NULL, NULL, 2, 'HD000002', 2),
(89, 43, 2, '[{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":21,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":34,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 1, '', 1, 'DB000038', '2024-05-15 17:06:40', NULL, NULL, 2, 'HD000004', 4),
(90, 42, 1, '[{\"order_menu_id\":5,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":33,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":22,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":36,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 1, '', 1, 'DB000037', '2024-05-15 20:39:49', NULL, NULL, 2, 'HD000005', 5),
(97, 50, 1, '[{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":2},{\"order_menu_id\":22,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":34,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 2, 'dddd', 1, 'DB000003', '2024-05-16 09:54:54', NULL, NULL, 2, 'HD000006', 6),
(98, 51, 1, '[{\"order_menu_id\":22,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":35,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":33,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 2, '', 1, 'DB000004', '2024-05-16 23:06:32', NULL, NULL, 2, 'HD000007', 7),
(114, NULL, 1, '[{\"order_menu_id\":5,\"order_menu_note\":\"hihi\",\"order_menu_quantity\":2},{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":22,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":21,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 1, '', 1, NULL, '2024-05-17 11:26:05', NULL, NULL, 2, 'HD000008', 8),
(115, 1, 2, '[{\"order_menu_id\":5,\"order_menu_note\":\"kkk\",\"order_menu_quantity\":1}]', 1, '', 1, NULL, '2024-05-17 11:34:51', NULL, NULL, 2, 'HD000009', 9),
(116, 1, 4, '[{\"order_menu_id\":4,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":21,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":20,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 1, '', 1, NULL, '2024-05-17 11:38:25', NULL, NULL, 2, 'HD000010', 10),
(117, 54, 3, '[{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":21,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":20,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":33,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":35,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 1, '', 1, NULL, '2024-05-17 11:39:39', NULL, NULL, 2, 'HD000011', 11),
(120, 36, 1, '[{\"order_menu_id\":5,\"order_menu_note\":\"\",\"order_menu_quantity\":2},{\"order_menu_id\":34,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":22,\"order_menu_note\":\"\",\"order_menu_quantity\":2},{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 1, '', 1, NULL, '2024-05-17 11:58:49', NULL, NULL, 2, 'HD000014', 14),
(121, NULL, 4, '[{\"order_menu_id\":5,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":34,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":33,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":22,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 1, '', 1, NULL, '2024-05-17 12:04:14', NULL, NULL, 2, 'HD000015', 15),
(122, 55, 1, '[{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 2, '', 1, 'DB000009', '2024-05-24 17:59:34', NULL, NULL, 2, 'HD000016', 16),
(123, 56, 1, '[{\"order_menu_id\":10,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":22,\"order_menu_note\":\"\",\"order_menu_quantity\":1},{\"order_menu_id\":21,\"order_menu_note\":\"\",\"order_menu_quantity\":1}]', 2, 'kkkkk', 1, 'DB000010', '2024-05-28 14:49:43', NULL, NULL, 2, 'HD000017', 17);

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
(1, 'Bàn số 1', 4, 'Bàn dành cho 4 người kkk', 0, '2024-05-01 14:05:32', NULL, NULL, 1, 1),
(2, 'Bàn số 2', 5, 'Bàn dành cho khách vip hihi', 0, '2024-05-02 15:43:57', NULL, NULL, 1, 1),
(3, 'Bàn số 3', 4, 'Bàn dành cho gia đình', 0, '2024-05-02 15:44:22', NULL, NULL, 2, 1),
(4, 'Bàn số 4', 4, 'blalal', 0, '2024-05-02 15:58:00', NULL, NULL, 1, 1);

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

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `full_name` varchar(30) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 2 COMMENT 'role = 1: admin, role= 2: Lễ tân, thu ngân',
  `gender` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `account_id`, `full_name`, `role`, `gender`, `email`, `age`, `status`) VALUES
(1, 16, 'Vũ Đình Dũng', 1, 1, '', 23, 1),
(2, 18, 'Bùi Việt Hoàng ', 2, 1, '', 23, 1),
(3, 19, 'Đỗ Văn Linh', 2, 1, '', 23, 1),
(4, 20, 'Hoàng Lan Anh', 2, 0, 'lananhhoang@gmail.com', 21, 1),
(5, 21, 'Vũ Minh Tuấn', 2, 1, 'minhtuanvu@gmail.com', 21, 1);

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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

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

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
