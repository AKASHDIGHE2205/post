-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2024 at 12:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `postdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(100) NOT NULL,
  `city_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`) VALUES
(1, 'MUMBAI'),
(2, 'NASHIK'),
(3, 'SANGAMNER'),
(4, 'D.RAJA'),
(5, 'HUBLI'),
(6, 'AHMEDNAGAR'),
(7, 'PUNE'),
(8, 'LONI'),
(9, 'DEVPUR'),
(10, 'AMRAWATI'),
(11, 'A.NAGAR'),
(12, 'NEW DELHI'),
(13, 'ULHASNAGAR'),
(14, 'NAGAR'),
(15, 'SATARA'),
(16, 'TALEGAONDABHADE'),
(17, 'DHARAMPUR'),
(18, 'DHULIA'),
(19, 'BANGLORE'),
(20, 'BOMBAY'),
(21, 'ANDHERI WEST'),
(22, 'SOLAPUR'),
(23, 'KANNAD'),
(24, 'PATHARDI'),
(25, 'PARBHANI'),
(26, 'GUWAHATI'),
(27, 'GUWAHATI(ASSAM)'),
(28, 'BARAMALA'),
(29, 'SILGURI'),
(30, 'N.AHMEDNAGER'),
(31, 'AKOLA'),
(32, 'NEWASA'),
(33, 'WASHI'),
(34, 'FARIDABAD'),
(35, 'JAMKHED'),
(36, 'GEVRAI'),
(37, 'AURANGABAD'),
(38, 'GAUHATI'),
(39, 'SANGLI'),
(40, 'HINGOLI'),
(41, 'GHAZIABAD'),
(42, 'KASHTI'),
(43, 'U.S.A.'),
(44, 'AMRAVATI'),
(45, 'DEWLHI'),
(46, 'DELHI'),
(47, 'CHENNAI'),
(48, 'LATUR'),
(49, 'RAHURINANDED'),
(50, 'KOLKATA'),
(51, 'KHAMGAON'),
(52, 'SWEEDAN'),
(53, 'NAVI MUMBAI'),
(54, 'NEW DELHI-05'),
(55, 'MUMBAI-01'),
(56, 'SURENDRANAGAR'),
(57, 'PUNE-04'),
(58, 'BARAMATI'),
(59, 'NOIDA'),
(60, 'SHRIRAMPUR'),
(61, 'DEVLALI PRAVARA'),
(62, 'KOLHAPUR'),
(63, 'SINNER'),
(64, 'ATUL 396020'),
(65, 'MANTHA'),
(66, 'PANVEL'),
(67, 'GADCHIROLI'),
(68, 'SHRIGONDA'),
(69, 'SILLOD'),
(70, 'OSMANABAD'),
(71, 'WADGAON HAWELI'),
(72, 'NAGPUR'),
(73, 'INDORE'),
(74, 'JALGAON'),
(75, 'MURUD'),
(76, 'AMRUTNAGAR'),
(77, 'NO'),
(78, 'LASUR STATION'),
(79, 'KOPARGAON'),
(80, 'COIMBATORE'),
(81, 'WADGAON'),
(82, 'AMBAD'),
(83, 'PAREL'),
(84, 'BHANGAON'),
(85, 'CHANDRAPUR'),
(86, 'USMANABAD'),
(87, 'KHRTIYA'),
(88, 'PARLI VAIJNATH'),
(89, 'PHALTAN'),
(90, 'GANGAPUR'),
(91, 'TRICHY'),
(92, 'TRICHIRAPALLI'),
(93, 'NIMGAON KHAIRI'),
(94, 'KANNUJ'),
(95, 'MALKAPUR'),
(96, 'RAJGURUNAGAR'),
(97, 'NAMBIYUR'),
(98, 'BULDHANA'),
(99, 'SHANDURNI'),
(100, 'SALEKSA GONDIY'),
(101, 'KANDHAPUR'),
(102, 'BHATKUDGAON'),
(103, 'MALEGAON'),
(104, 'DEVRAI'),
(105, 'SATHYAMANGALAM'),
(106, 'CHIDAMBARAM'),
(107, 'TERUCHIRPPALLI'),
(108, 'NASHIK ROAD'),
(109, 'NOIDA 201301'),
(110, 'SIRALA'),
(111, 'TILAKNAGAR'),
(112, 'VANI'),
(113, 'WARI'),
(114, 'MANWAT'),
(115, 'PALDHI'),
(116, 'MADANPALLI'),
(117, 'SELU'),
(118, 'JALANA'),
(119, 'ERANDOL'),
(120, 'ANANTPUR'),
(121, 'HINDPUR'),
(122, 'HINDPUR(A.P.)'),
(123, 'HYDERABAD'),
(124, 'KADAPA'),
(125, 'TAMILNADU'),
(126, 'HINDUPUR'),
(127, 'CHIPLUN'),
(128, 'BURHANPUR'),
(129, 'AKALWADI'),
(130, 'THANE'),
(131, 'PAROLA'),
(132, 'AMALNER'),
(133, 'TUMKUR'),
(134, 'VAMBORI'),
(135, 'NOIDA(U.P)'),
(136, 'RADHOGHAD'),
(137, 'EGATPURI'),
(138, 'GHATKOPAR'),
(139, 'LACKNOW'),
(140, 'MANGALWEDHA'),
(141, 'SASWAD'),
(142, 'RUI'),
(143, 'PUNE-37'),
(144, 'ISLAMPUR'),
(145, 'SAWANTWADI'),
(146, 'BEED'),
(147, 'NANDURA'),
(148, 'AMBIKAPUR'),
(149, 'TAKALI DHOKESHWAR'),
(150, 'BARSHI'),
(151, 'SURENDRANAGAR (GJ)'),
(152, 'SHETRAMAULI'),
(153, 'DAMAN'),
(154, 'NANI DAMAN'),
(155, 'WAMBORI'),
(156, 'NIGUD MAJALGAON'),
(157, 'VAJIRABAD'),
(158, 'YEOLA/NAKHA'),
(159, 'DHULIA'),
(160, 'BHILWARA'),
(161, 'MUMBAI-03'),
(162, 'MUMBAI-09'),
(163, 'ALANDI DEWACHI'),
(164, 'ALANDI');

-- --------------------------------------------------------

--
-- Table structure for table `dept`
--

CREATE TABLE `dept` (
  `dept_id` int(100) NOT NULL,
  `dept_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dept`
--

INSERT INTO `dept` (`dept_id`, `dept_name`) VALUES
(1, 'A.S.M.'),
(2, 'A.M.M.'),
(3, 'ACCOUNTS'),
(4, 'AKOLE ROAD'),
(5, 'AUDIT'),
(6, 'CONSTRUCTION'),
(7, 'D.A.M.'),
(8, 'D.S.M.'),
(9, 'E.D.P.'),
(10, 'ESTATE'),
(11, 'EXCISE'),
(12, 'G.M.M.'),
(13, 'GENERAL'),
(14, 'INDUSTRIES'),
(15, 'LEGAL'),
(16, 'M.D.M.'),
(17, 'M.M.M.'),
(18, 'NITT'),
(19, 'O.D.M.'),
(20, 'OTHER'),
(21, 'PERSONNEL'),
(22, 'PRAFULLA'),
(23, 'PURCHASE'),
(24, 'R.M.M.'),
(25, 'R.O.M.'),
(26, 'RELIANCE GAS'),
(27, 'S.G.M.'),
(28, 'S.R.M.'),
(29, 'S.O.M.'),
(30, 'SALES'),
(31, 'SALES A/C');

-- --------------------------------------------------------

--
-- Table structure for table `firms`
--

CREATE TABLE `firms` (
  `firm_id` int(100) NOT NULL,
  `firm_name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `firms`
--

INSERT INTO `firms` (`firm_id`, `firm_name`) VALUES
(1, 'ABMM'),
(2, 'DHRUV'),
(3, 'DJM'),
(4, 'GEETA PARI.'),
(5, 'GIRIRAJ AUTO'),
(6, 'GIRIRAJ ENTERPRISES HOTEL & MOTEL'),
(7, 'GIRIRAJ H.O.'),
(8, 'GIRIRAJ RETAILS'),
(9, 'HEALTH CLUB'),
(10, 'JARDA ASS.'),
(11, 'LEARN MORE'),
(12, 'MALPANI INSTITUTE'),
(13, 'MAP'),
(14, 'MTC'),
(15, 'OTHER'),
(16, 'PARIWAR TRU'),
(17, 'SARGAM'),
(18, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `mst_company`
--

CREATE TABLE `mst_company` (
  `comp_id` varchar(10) NOT NULL,
  `comp_name` varchar(500) NOT NULL,
  `comp_address` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_entry`
--

CREATE TABLE `post_entry` (
  `entry_id` int(11) NOT NULL,
  `entry_date` date NOT NULL,
  `post_type` char(1) NOT NULL,
  `party_name` varchar(500) NOT NULL,
  `dept_id` int(100) NOT NULL,
  `firm_id` int(100) NOT NULL,
  `city_name` varchar(500) NOT NULL,
  `remark` varchar(500) NOT NULL,
  `receipt_no` varchar(100) NOT NULL,
  `qty` int(100) NOT NULL,
  `flag` char(1) NOT NULL,
  `fr_machine` char(1) NOT NULL,
  `charges` int(10) NOT NULL,
  `rec_no` varchar(100) DEFAULT NULL,
  `rec_date` date DEFAULT NULL,
  `ret` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_type`
--

CREATE TABLE `post_type` (
  `post_id` int(100) NOT NULL,
  `post_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_type`
--

INSERT INTO `post_type` (`post_id`, `post_name`) VALUES
(1, 'BOOK POST'),
(2, 'COURIER AD#'),
(3, 'COURIER B#'),
(4, 'COURIER M#'),
(5, 'COURIER O#'),
(6, 'COURIER P#'),
(7, 'COURIER Q#'),
(8, 'COURIER U#'),
(9, 'COURIER X#'),
(10, 'COURIER Y#'),
(11, 'ENVELOPE'),
(12, 'FORIEGN ENV.'),
(13, 'INLAND'),
(14, 'MONEY ORDER#'),
(15, 'NOT PAID#'),
(16, 'POST CARD'),
(17, 'REG. A. D.'),
(18, 'REG. PARCEL'),
(19, 'SPPED POST'),
(20, 'U. P. C.'),
(21, 'U. R. PARCEL');

-- --------------------------------------------------------

--
-- Table structure for table `stamp_pur`
--

CREATE TABLE `stamp_pur` (
  `pur_date` date NOT NULL,
  `stamp_id` int(10) NOT NULL,
  `firm_name` int(10) NOT NULL,
  `rec_no` varchar(100) NOT NULL,
  `pay_date` date NOT NULL,
  `stamp` varchar(10) NOT NULL,
  `fr_machine` varchar(10) NOT NULL,
  `remark` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `status` char(1) NOT NULL,
  `role` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `mobile` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `status`, `role`, `first_name`, `middle_name`, `last_name`, `email_id`, `mobile`) VALUES
(1, 'admin@gmail.com', '$2b$10$TreMTC2qi87xfwOWhjIkROP6KgkGn5oKh/uB3dPeMJypYw2F5JSda', 'A', 'admin', 'Admin', 'Admin', 'Admin', 'admin@gmail.com', 1234567890),
(2, 'user@gmail.com', '$2b$10$TreMTC2qi87xfwOWhjIkROP6KgkGn5oKh/uB3dPeMJypYw2F5JSda', 'A', 'user', 'user', 'user', 'user', 'user@gmail.com', 1234567890),
(3, 'akash@gmail.com', '$2b$10$DLuh6AcJfFJ.Us74jXJHcOEgZ4N4P3SqI6WVpKmwgEFabZpsre4uW', 'A', 'admin', 'Akash', 'Daulat', 'Dighe', 'akash@gmail.com', 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `voucher_entry`
--

CREATE TABLE `voucher_entry` (
  `v_no` int(10) NOT NULL,
  `v_date` date NOT NULL,
  `receipt_no` varchar(10) NOT NULL,
  `paid_date` date NOT NULL,
  `firm_name` int(10) NOT NULL,
  `stamp` varchar(10) NOT NULL,
  `fr_machine` varchar(10) NOT NULL,
  `remark` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voucher_entry`
--

INSERT INTO `voucher_entry` (`v_no`, `v_date`, `receipt_no`, `paid_date`, `firm_name`, `stamp`, `fr_machine`, `remark`) VALUES
(1, '2024-07-01', '20', '2024-07-18', 2, '20', '30', 'test'),
(2, '2024-07-18', '220', '2024-07-18', 4, '1234', '4321', 'testing...'),
(3, '0000-00-00', '', '0000-00-00', 0, '', '', ''),
(4, '0000-00-00', '', '0000-00-00', 0, '', '', ''),
(5, '2024-07-23', 'A123', '2024-07-30', 2, '12', 'vfc12', 'testing');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `dept`
--
ALTER TABLE `dept`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `firms`
--
ALTER TABLE `firms`
  ADD PRIMARY KEY (`firm_id`);

--
-- Indexes for table `post_entry`
--
ALTER TABLE `post_entry`
  ADD PRIMARY KEY (`entry_id`);

--
-- Indexes for table `post_type`
--
ALTER TABLE `post_type`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `stamp_pur`
--
ALTER TABLE `stamp_pur`
  ADD PRIMARY KEY (`stamp_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `voucher_entry`
--
ALTER TABLE `voucher_entry`
  ADD PRIMARY KEY (`v_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `dept`
--
ALTER TABLE `dept`
  MODIFY `dept_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `firms`
--
ALTER TABLE `firms`
  MODIFY `firm_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `post_entry`
--
ALTER TABLE `post_entry`
  MODIFY `entry_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_type`
--
ALTER TABLE `post_type`
  MODIFY `post_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `stamp_pur`
--
ALTER TABLE `stamp_pur`
  MODIFY `stamp_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `voucher_entry`
--
ALTER TABLE `voucher_entry`
  MODIFY `v_no` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
