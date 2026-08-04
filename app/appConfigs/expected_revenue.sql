-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2026 at 05:24 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `supercrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `expected_revenue`
--

CREATE TABLE IF NOT EXISTS `expected_revenue` (
  `primkey` int(11) NOT NULL,
  `record_id` varchar(100) NOT NULL,
  `revenue_month` varchar(500) DEFAULT NULL,
  `client_id` varchar(100) DEFAULT NULL,
  `deal_id` varchar(100) DEFAULT NULL,
  `expected_amount` decimal(18,2) DEFAULT NULL,
  `currency_code` varchar(20) DEFAULT NULL,
  `payment_status` varchar(500) NOT NULL,
  `payment_ref_no` varchar(500) NOT NULL,
  `expected_close_date` date DEFAULT NULL,
  `probability_percent` varchar(20) DEFAULT NULL,
  `revenue_source_type` varchar(100) DEFAULT NULL,
  `revenue_title` varchar(500) DEFAULT NULL,
  `invoice_id` varchar(100) DEFAULT NULL,
  `lead_id` varchar(100) DEFAULT NULL,
  `revenue_status` varchar(100) DEFAULT NULL,
  `revenue_description` longtext,
  `assigned_to` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `hive_site_id` varchar(100) DEFAULT NULL,
  `hive_site_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expected_revenue`
--

INSERT INTO `expected_revenue` (`primkey`, `record_id`, `revenue_month`, `client_id`, `deal_id`, `expected_amount`, `currency_code`, `payment_status`, `payment_ref_no`, `expected_close_date`, `probability_percent`, `revenue_source_type`, `revenue_title`, `invoice_id`, `lead_id`, `revenue_status`, `revenue_description`, `assigned_to`, `created_at`, `updated_at`, `hive_site_id`, `hive_site_name`) VALUES
(2, 'A5XYBCW', 'May 2026', 'XRJ6DII', 'ZIPZ8PC', '9600.00', 'KES', 'Unpaid', '', '2026-05-28', '', '', '', NULL, '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(3, 'A6LNSXA', 'May 2026', 'A98QVSQ', '8BKE07M', '8000.00', 'KES', 'Unpaid', '', '2026-05-28', '', '', '', NULL, '', 'Pending', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(4, 'JNZ54LK', 'May 2026', 'A98QVSQ', 'E8YDQNI', '6000.00', '', 'Unpaid', '', '2026-05-28', '', '', '', NULL, '', 'Pending', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(5, 'LFYUXTQ', 'May 2026', 'XRJ6DII', '9ST6ZP2', '9600.00', 'KES', 'Unpaid', '', '2026-05-28', '', '', '', NULL, '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(6, 'UZE6DSB', 'May 2026', 'ICG6O5J', '4XEAAXU', '5000.00', 'KES', 'Paid', '', '2026-05-28', '', '', '', NULL, '', 'Completed', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(7, 'AESSSGF', 'May 2026', 'DWB8037', 'E5X16AV', '20000.00', 'KES', 'Unpaid', '', '2026-05-28', '', '', '', NULL, '', 'Completed', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(8, 'FI0EYVR', 'May 2026', 'QHMUBY5', 'E8YDQNI', '8500.00', '', 'Unpaid', 'SDJKSJDSDJ-tROPICAL dESSERT', '2026-05-28', '', '', 'Trufinds Kargo', '3URUWIG', '', 'Pending', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(9, '9IIDG6R', 'May 2026', '81SESHR', 'RI4N4JG', '7500.00', '', 'Unpaid', 'SDJKSJDSDJ-tROPICAL dESSERT', '2026-05-28', '', '', 'Trufinds Kargo', '3URUWIG', '', 'Pending', '', '', '2026-05-28 17:25:00', '0000-00-00 00:00:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(11, 'YNX80G1', 'May 2026', '53UC6IT', 'UEEX1EJ', '7500.00', 'KES', 'Unpaid', 'SDJKSJDSDJ-tROPICAL dESSERT', '2026-05-30', '', '', '', NULL, '', 'Postponed', '', '', '2026-05-30 11:47:00', '2026-05-30 11:47:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin'),
(12, '02VOEB1', 'May 2026', 'VOJJI8H', 'UEEX1EJ', '8500.00', '', 'Unpaid', '', '2026-06-03', '', '', 'Trufinds Kargo', NULL, '', 'Postponed', '', '', '2026-06-03 05:20:00', '2026-06-03 05:20:00', 'LLRR0ZKOXRTCOHN_2024-12-28-07-45-56-pm', 'Superadmin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `expected_revenue`
--
ALTER TABLE `expected_revenue`
  ADD PRIMARY KEY (`primkey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expected_revenue`
--
ALTER TABLE `expected_revenue`
  MODIFY `primkey` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
