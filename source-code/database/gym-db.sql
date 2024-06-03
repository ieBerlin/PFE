-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 08:31 PM
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
-- Database: `gym-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `bookingId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `equipmentId` int(11) NOT NULL,
  `bookingDate` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `actionDate` varchar(255) DEFAULT NULL,
  `color` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`bookingId`, `userId`, `equipmentId`, `bookingDate`, `status`, `actionDate`, `color`, `size`) VALUES
(39, 51, 51, '2024-06-01 22:30:00', 'confirmed', NULL, '', ''),
(40, 51, 48, '2024-06-01 23:34:00', 'rejected', NULL, '', ''),
(41, 51, 49, '2024-06-02 21:52:00', 'confirmed', NULL, '', ''),
(42, 51, 50, '2024-06-03 06:52:00', 'confirmed', NULL, '', ''),
(43, 51, 48, '2024-06-03 11:30:00', 'pending', NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `certification`
--

CREATE TABLE `certification` (
  `id` int(11) NOT NULL,
  `coachId` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `certification`
--

INSERT INTO `certification` (`id`, `coachId`, `image`, `created_at`) VALUES
(13, 43, '1717268162114-636425459.png', '2024-06-01 18:56:02'),
(14, 44, '1717268215762-928728690.jpg', '2024-06-01 18:56:55'),
(15, 45, '1717268257639-840284657.jpg', '2024-06-01 18:57:37'),
(16, 46, '1717268340299-225813271.jpg', '2024-06-01 18:59:00'),
(17, 47, '1717268370666-301458793.jpg', '2024-06-01 18:59:30'),
(18, 48, '1717268411581-723165250.jpg', '2024-06-01 19:00:11'),
(19, 49, '1717268458767-448141280.jpg', '2024-06-01 19:00:58'),
(20, 50, '1717268512704-208231329.jpg', '2024-06-01 19:01:52'),
(24, 43, '1717283168462-813810646.jpg', '2024-06-01 23:06:08');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `classId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `instructorId` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endDate` date NOT NULL,
  `endTime` time NOT NULL,
  `maximum_capacity` int(11) NOT NULL,
  `current_enrollment_count` int(11) DEFAULT 0,
  `price` varchar(50) NOT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`classId`, `name`, `description`, `instructorId`, `startDate`, `startTime`, `endDate`, `endTime`, `maximum_capacity`, `current_enrollment_count`, `price`, `category`, `created_at`, `updated_at`, `status`) VALUES
(25, ' Kickboxing Class Now Available! :)', '+ Ready to train like a champion and transform your fitness routine? Join our dynamic kickboxing classes today!\n+ Fundamental Techniques: Master the essential punches, kicks, and defensive moves of kickboxing.\n+ Skill Development: Improve your speed, agility, and precision through targeted drills and exercises.', '49', '2024-06-12', '23:00:00', '2024-06-12', '13:00:00', 10, 2, '650', 'kickboxing', '2024-06-01 21:00:00', '2024-06-01 21:14:00', 'open'),
(26, 'Strength & Sculpt: Bodybuilding Class', '+ Ready to build strength, muscle, and confidence? Join our intensive bodybuilding class today!\\n+ Muscle Development: Learn proven techniques to target major muscle groups for maximum growth and definition.\\n+ Progressive Overload: Master the principles of progressive overload to continuously challenge your muscles and promote growth.\\n+ Personalized Guidance: Receive personalized coaching and feedback from experienced trainers to optimize your training and results.', '46', '2024-06-12', '10:00:00', '2024-06-12', '00:00:00', 5, 0, '1000', 'bodybuilding', '2024-06-01 21:54:00', NULL, 'open'),
(27, 'Exciting New Fitness class starting now', 'We are thrilled to announce the launch of our latest fitness class.', '43', '2024-06-09', '22:47:00', '2024-06-09', '12:47:00', 12, 1, '500', 'fitness', '2024-06-02 21:47:00', '2024-06-02 21:47:00', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `coach_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `start_from` datetime NOT NULL DEFAULT current_timestamp(),
  `message_text` text DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `coach_id`, `member_id`, `start_from`, `message_text`, `status`) VALUES
(30, 43, 51, '2024-06-01 22:11:30', NULL, 'confirmed'),
(31, 44, 51, '2024-06-01 22:15:20', NULL, 'confirmed'),
(32, 46, 51, '2024-06-01 22:27:54', NULL, 'pending'),
(33, 49, 51, '2024-06-02 21:52:40', NULL, 'confirmed');

-- --------------------------------------------------------

--
-- Table structure for table `coaches`
--

CREATE TABLE `coaches` (
  `coachId` int(11) NOT NULL,
  `specialization` varchar(100) NOT NULL DEFAULT 'Not set yet',
  `experienceLevel` varchar(100) NOT NULL DEFAULT 'not set yet',
  `userId` int(11) NOT NULL,
  `totalTrainedMembers` int(11) DEFAULT 0,
  `bio` text DEFAULT '',
  `contact` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coaches`
--

INSERT INTO `coaches` (`coachId`, `specialization`, `experienceLevel`, `userId`, `totalTrainedMembers`, `bio`, `contact`) VALUES
(43, 'bodybuilding', 'not set yet', 0, 10, ' Known as The Godfather of Bodybuilding, Charles Glass is one of the most renowned bodybuilding coaches in the world. With a background in competitive bodybuilding himself, including winning the 1983 Mr. America, Glass has transitioned into a legendary trainer.', NULL),
(44, 'bodybuilding', 'not set yet', 0, 5, ' known as The Pro Creator, is a highly respected bodybuilding coach. He has a background in kinesiology and biomechanics, which he applies to his training methods.', NULL),
(45, 'fitness', 'not set yet', 0, 5, ' well-known fitness trainer, author, and television personality. She gained widespread fame as a trainer on the television show The Biggest Loser.', NULL),
(46, 'kickboxing', 'not set yet', 0, 6, 'Duke Roufus is a former professional kickboxer and one of the most successful kickboxing and MMA coaches. He co-founded the Roufusport gym in Milwaukee, Wisconsin.', NULL),
(47, 'kickboxing', 'not set yet', 0, 6, 'renowned kickboxing and MMA coach based in Albuquerque, New Mexico. He is a co-owner of the Jackson Wink MMA Academy.', NULL),
(48, 'kickboxing', 'not set yet', 0, 5, 'known as The Diamond, was a legendary Dutch kickboxer and trainer. He had a decorated career with multiple world titles in Muay Thai and kickboxing.', NULL),
(49, 'kickboxing', 'not set yet', 0, 32, 'Saenchai is a legendary Muay Thai fighter from Thailand, widely regarded as one of the best fighters in the sport\'s history. His career is marked by an impressive record and multiple Lumpinee Stadium titles', NULL),
(50, 'yoga', 'not set yet', 0, 12, 'One of the most recognized yoga instructors in the United States. He began his yoga journey in the 1980s and has been teaching for over 30 years.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `enrollmentrequests`
--

CREATE TABLE `enrollmentrequests` (
  `id` int(11) NOT NULL,
  `applicant_user_id` int(11) DEFAULT NULL,
  `date` date DEFAULT current_timestamp(),
  `class_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `enrollmentrequests`
--

INSERT INTO `enrollmentrequests` (`id`, `applicant_user_id`, `date`, `class_id`, `status`) VALUES
(39, 51, '2024-06-01', 26, 'confirmed'),
(40, 52, '2024-06-01', 26, 'rejected'),
(41, 52, '2024-06-01', 25, 'confirmed'),
(42, 58, '2024-06-01', 25, 'confirmed'),
(43, 51, '2024-06-02', 27, 'confirmed');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `max_quantity` int(11) NOT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `availableQuantity` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `name`, `description`, `max_quantity`, `created_at`, `updated_at`, `availableQuantity`, `image`, `category`, `price`) VALUES
(48, 'Boxing Gloves', 'Padded gloves used in boxing to protect hands and reduce impact.', 6, '2024-06-01 20:18', NULL, 4, '1717269511274-319318149.jpg', 'kickboxing', 300.00),
(49, 'Hand Wraps', 'Cloth wraps used to protect the wrists, knuckles, and hands during boxing or kickboxing', 7, '2024-06-01 20:19', '2024-06-01 23:54', 6, '1717282465490-820827949.jpg', 'kickboxing', 150.00),
(50, 'Shin Guards', 'Padding to protect shins from kicks.', 3, '2024-06-01 20:21', NULL, 2, '1717269686061-344167614.jpg', 'kickboxing', 500.00),
(51, 'Dumbbells ', 'Handheld weights used in strength training, typically consisting of a metal bar with weights attached to each end. ', 12, '2024-06-01 20:38', NULL, 11, '1717270718386-36060572.jpg', 'bodybuilding', 200.00),
(52, 'Yoga Mats', 'Provides cushioning and grip for yoga poses and floor exercises.', 4, '2024-06-01 20:40', NULL, 4, '1717270856405-934875935.jpg', 'yoga', 100.00);

-- --------------------------------------------------------

--
-- Table structure for table `memberships`
--

CREATE TABLE `memberships` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `type` enum('basic','standard','premium') DEFAULT 'basic',
  `date_when` date NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `memberships`
--

INSERT INTO `memberships` (`id`, `userId`, `type`, `date_when`, `price`) VALUES
(10, 60, 'premium', '2024-06-01', 18000.00),
(11, 51, 'standard', '2024-06-01', 2500.00),
(12, 57, 'premium', '2024-06-01', 1500.00),
(13, 53, 'premium', '2024-06-03', 15000.00);

-- --------------------------------------------------------

--
-- Table structure for table `membershipstatus`
--

CREATE TABLE `membershipstatus` (
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `coach_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `whoSent` enum('coach','member','','') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `coach_id`, `member_id`, `message`, `whoSent`, `created_at`) VALUES
(31, 43, 51, 'dfgdfg', 'coach', '2024-06-01 22:14:09'),
(32, 44, 51, 'Hey user', 'coach', '2024-06-01 22:22:22'),
(33, 44, 51, 'You\'re my client', 'coach', '2024-06-01 22:22:32'),
(34, 44, 51, 'You\'re my clienti\'ll send you schedule', 'coach', '2024-06-01 22:22:40'),
(35, 44, 51, 'tomrrow\n', 'coach', '2024-06-01 22:22:45'),
(36, 44, 51, 'okay', 'coach', '2024-06-01 22:22:49'),
(37, 44, 51, 'Bye Bye Stay Safe', 'coach', '2024-06-01 22:25:03'),
(38, 44, 51, 'Heeey', 'coach', '2024-06-01 22:26:43'),
(39, 49, 51, 'Hey user, come tomorrow at 09:30 AM :)\n', 'coach', '2024-06-02 21:58:50'),
(40, 43, 51, 'hello', 'coach', '2024-06-03 09:12:12');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` text NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isRead` tinyint(1) DEFAULT 0,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `userId`, `message`, `created_at`, `isRead`, `title`) VALUES
(115, '53', 'Your account has been successfully recharged with the requested amount. You now have access to all features and services on our platform without interruption. If you encounter any difficulties or have questions, please don\'t hesitate to contact us. We\'re here to assist you every step of the way. Thank you for being a valued member of our platform!', '2024-06-01 20:20:09', 0, 'User Account Recharged Successfully'),
(116, '55', 'Your account has been successfully recharged with the requested amount. You now have access to all features and services on our platform without interruption. If you encounter any difficulties or have questions, please don\'t hesitate to contact us. We\'re here to assist you every step of the way. Thank you for being a valued member of our platform!', '2024-06-01 20:21:39', 0, 'User Account Recharged Successfully'),
(117, '60', 'Your account has been successfully recharged with the requested amount. You now have access to all features and services on our platform without interruption. If you encounter any difficulties or have questions, please don\'t hesitate to contact us. We\'re here to assist you every step of the way. Thank you for being a valued member of our platform!', '2024-06-01 20:22:41', 0, 'User Account Recharged Successfully'),
(118, '51', 'Your account has been successfully recharged with the requested amount. You now have access to all features and services on our platform without interruption. If you encounter any difficulties or have questions, please don\'t hesitate to contact us. We\'re here to assist you every step of the way. Thank you for being a valued member of our platform!', '2024-06-01 20:24:51', 1, 'User Account Recharged Successfully'),
(119, '57', 'Your account has been successfully recharged with the requested amount. You now have access to all features and services on our platform without interruption. If you encounter any difficulties or have questions, please don\'t hesitate to contact us. We\'re here to assist you every step of the way. Thank you for being a valued member of our platform!', '2024-06-01 20:25:14', 0, 'User Account Recharged Successfully'),
(120, '51', 'Congratulations! Your class enrollment request has been approved. You\'re now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don\'t hesitate to contact us. Enjoy the class!', '2024-06-01 20:44:25', 1, 'Class Enrollment Request Approved'),
(121, '51', ' We regret to inform you that your class enrollment request has been rejected. Unfortunately, the class is currently at full capacity. We understand your disappointment and apologize for any inconvenience caused. If you have any further questions or need assistance, please feel free to get in touch. Thank you for your understanding.', '2024-06-01 20:49:47', 1, 'Class Enrollment Request Rejected'),
(122, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(123, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(124, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(125, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(126, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(127, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(128, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(129, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(130, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(131, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(132, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(133, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(134, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(135, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(136, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(137, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(138, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(139, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(140, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(141, '', 'Tomorrow, Gym is close', '2024-06-01 20:51:00', 0, 'Alert'),
(142, '56', 'Congratulations! Your class enrollment request has been approved. You\'re now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don\'t hesitate to contact us. Enjoy the class!', '2024-06-01 20:57:34', 0, 'Class Enrollment Request Approved'),
(143, '51', 'Congratulations! Your class enrollment request has been approved. You\'re now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don\'t hesitate to contact us. Enjoy the class!', '2024-06-01 20:57:36', 1, 'Class Enrollment Request Approved'),
(144, '51', 'Congratulations! Your class enrollment request has been approved. You\'re now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don\'t hesitate to contact us. Enjoy the class!', '2024-06-01 21:06:15', 1, 'Class Enrollment Request Approved'),
(145, '52', 'Congratulations! Your class enrollment request has been approved. You\'re now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don\'t hesitate to contact us. Enjoy the class!', '2024-06-01 21:08:25', 0, 'Class Enrollment Request Approved'),
(146, '52', 'Congratulations! Your class enrollment request has been approved. You\'re now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don\'t hesitate to contact us. Enjoy the class!', '2024-06-01 21:08:26', 0, 'Class Enrollment Request Approved'),
(147, '58', 'Congratulations! Your class enrollment request has been approved. You\'re now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don\'t hesitate to contact us. Enjoy the class!', '2024-06-01 21:08:26', 0, 'Class Enrollment Request Approved'),
(148, '51', 'Congratulations! Your coaching messaging request has been accepted. You\'re now connected with your coach and can begin your sessions. Feel free to reach out to them to schedule your first meeting. Here\'s to a journey of growth and success together!', '2024-06-01 21:12:07', 1, 'Coach Messaging Accepted'),
(149, '51', 'Congratulations! Your coaching messaging request has been accepted. You\'re now connected with your coach and can begin your sessions. Feel free to reach out to them to schedule your first meeting. Here\'s to a journey of growth and success together!', '2024-06-01 21:15:37', 1, 'Coach Messaging Accepted'),
(150, '51', 'Your equipment reservation has been approved! You\'re all set to use the equipment for your upcoming project. Just a reminder, please ensure to return it within the specified 10-day period to avoid any inconvenience. If you have any questions or need assistance, feel free to reach out. Happy working!', '2024-06-01 21:30:33', 1, 'Equipment Reservation Approved with Return Deadline'),
(151, '52', ' We regret to inform you that your class enrollment request has been rejected. Unfortunately, the class is currently at full capacity. We understand your disappointment and apologize for any inconvenience caused. If you have any further questions or need assistance, please feel free to get in touch. Thank you for your understanding.', '2024-06-01 21:33:40', 0, 'Class Enrollment Request Rejected'),
(152, '51', 'Dear Member,\n      We\'re writing to inform you that your membership with Organization/Service Name is approaching its end. Your access to specific features or benefits will be discontinued as of End Date.', '2024-06-02 20:49:25', 1, 'Membership End Notification'),
(153, '51', 'Tomorrow come to pick up your missing gloves ', '2024-06-02 20:49:49', 1, 'Hello User'),
(154, '51', 'Your equipment reservation has been approved! You\'re all set to use the equipment for your upcoming project. Just a reminder, please ensure to return it within the specified 10-day period to avoid any inconvenience. If you have any questions or need assistance, feel free to reach out. Happy working!', '2024-06-02 20:53:25', 1, 'Equipment Reservation Approved with Return Deadline'),
(155, '51', ' We regret to inform you that your equipment reservation request has been rejected. Unfortunately, all available equipment is currently allocated. We understand the importance of your project and apologize for any inconvenience this may cause. If you have any further queries or require assistance, please don\'t hesitate to contact us. We appreciate your understanding.', '2024-06-02 20:53:30', 1, 'Equipment Reservation Rejected'),
(156, '51', 'Congratulations! Your coaching messaging request has been accepted. You\'re now connected with your coach and can begin your sessions. Feel free to reach out to them to schedule your first meeting. Here\'s to a journey of growth and success together!', '2024-06-02 20:58:26', 1, 'Coach Messaging Accepted'),
(157, '51', 'Congratulations! Your class enrollment request has been approved. You\'re now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don\'t hesitate to contact us. Enjoy the class!', '2024-06-02 21:02:30', 1, 'Class Enrollment Request Approved'),
(158, '51', 'Your equipment reservation has been approved! You\'re all set to use the equipment for your upcoming project. Just a reminder, please ensure to return it within the specified 10-day period to avoid any inconvenience. If you have any questions or need assistance, feel free to reach out. Happy working!', '2024-06-03 05:53:14', 1, 'Equipment Reservation Approved with Return Deadline'),
(159, '53', 'Your account has been successfully recharged with the requested amount. You now have access to all features and services on our platform without interruption. If you encounter any difficulties or have questions, please don\'t hesitate to contact us. We\'re here to assist you every step of the way. Thank you for being a valued member of our platform!', '2024-06-03 10:25:43', 0, 'User Account Recharged Successfully');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transactionId` int(11) NOT NULL,
  `userId` int(255) DEFAULT NULL,
  `transactionType` varchar(255) NOT NULL,
  `transactionMethod` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `paymentType` enum('income','expense') NOT NULL,
  `transactionStatus` varchar(255) NOT NULL,
  `transactionDate` date NOT NULL DEFAULT current_timestamp(),
  `transactionTime` time NOT NULL DEFAULT current_timestamp(),
  `transactionNotes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transactionId`, `userId`, `transactionType`, `transactionMethod`, `price`, `paymentType`, `transactionStatus`, `transactionDate`, `transactionTime`, `transactionNotes`) VALUES
(42, 51, 'Personal Training', 'cash', '200', 'income', 'refunded', '2024-06-01', '21:15:00', 'Member 1 paid personal session fee'),
(43, NULL, 'Merchandise Purchase', 'cash', '1000', 'expense', 'paid', '2024-05-31', '22:18:00', 'Bought new cable for machines'),
(46, 60, 'Membership Fee', 'Cash', '18000', 'income', 'completed', '2024-06-01', '21:22:41', NULL),
(47, 51, 'Membership Fee', 'Cash', '2500', 'income', 'completed', '2024-06-01', '21:24:51', NULL),
(48, 57, 'Membership Fee', 'Cash', '1500', 'income', 'completed', '2024-06-01', '21:25:14', NULL),
(49, 51, 'equipment booking', 'cash', '150', 'expense', 'paid', '2024-06-02', '21:54:00', ''),
(50, 53, 'Membership Fee', 'Cash', '15000', 'income', 'completed', '2024-06-03', '11:25:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `role` varchar(20) NOT NULL,
  `registration_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_time_login` varchar(50) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `username`, `password`, `first_name`, `last_name`, `date_of_birth`, `phone_number`, `gender`, `address`, `role`, `registration_date`, `last_time_login`, `userId`, `status`, `image`) VALUES
('admin@gmail.com', 'admin12', '$2b$10$asdsEKTvF24WJNIRYe1imOWA5y0yun8SAfSErSVmrpCsblZ3tSyEa', 'Ahmed', 'Alawi', '2000-10-02', 500000000, 'male', '123 Main St', 'admin', '2024-06-01 18:55:02', '', 41, 'active', NULL),
('coach1@gmail.com', 'coach_123', '$2b$10$OkbvQkiQ5l6x1.3QjznTyeuxalzb8OnQ8tfma.faV8.dARsNp4biG', 'Mustafa', 'Khalid', '2000-10-02', 500000001, 'male', '123 Main St', 'coach', '2024-06-01 19:04:47', '', 43, 'active', '1717265644273-970895171.jpg'),
('coach2@gmail.com', 'coach_234', '$2b$10$s7xk6x49nsifnksjIqzh5eyodB3vdpVV.8NSff5yY63X36XkVIb0y', 'Abdullah', 'Khalid', '2000-10-02', 500000002, 'male', '123 Main St', 'coach', '2024-06-01 19:06:16', '', 44, 'active', '1717265669862-775608305.jpg'),
('coach3@gmail.com', 'coach_345', '$2b$10$7gXcB2vBAa2T2RFgLug15eC3c/K9ebzgwkM9vgoSRFrgR7ZEoUwKa', 'Mohammed', 'Al-Masri', '2000-10-02', 500000003, 'male', '123 Main St', 'coach', '2024-06-01 19:07:20', '', 45, 'active', '1717265701943-778705475.jpg'),
('coach4@gmail.com', 'coach_456', '$2b$10$AuhY6rLJGIw5wdmsXKLkiO2KN/XzlXdAxGmxbdHvKvKfVoJ8fpxCK', 'Mansour', 'Karim', '2000-10-02', 500000004, 'male', '123 Main St', 'coach', '2024-06-01 19:08:16', '', 46, 'active', '1717265718504-462028082.jpg'),
('coach5@gmail.com', 'coach_567', '$2b$10$198XRyAJFqfwUnvH.aT6K.D9LIPmaWMUw1FrRVUC3aGJjzuXAS98a', 'Khaled', 'Osman', '2000-10-02', 500000005, 'male', '123 Main St', 'coach', '2024-06-01 19:08:59', '', 47, 'active', '1717265735474-395193318.jpg'),
('coach6@gmail.com', 'coach_678', '$2b$10$xB4nSPRE/3lfmE6xTu/DHO7vxKXrY9gmo5Y5YBxx13UUD0jcbDrsy', 'Abdulaziz', 'Osman', '2000-10-02', 500000006, 'male', '123 Main St', 'coach', '2024-06-01 19:10:09', '', 48, 'active', '1717265755232-669154849.jpg'),
('coach7@gmail.com', 'coach_789', '$2b$10$LDXT/ASAiLKGJ.vMHJK4Yef8t1dlRFcVmP45Wh7hy/Z1T2rrg0HpK', 'Ali', 'Waleed', '2000-10-02', 500000007, 'male', '123 Main St', 'coach', '2024-06-01 19:10:52', '', 49, 'active', '1717265770692-447268455.jpg'),
('coach8@gmail.com', 'coach_890', '$2b$10$dvcAh6raW6BgICLw0LiQzuT6UdUupALwIb8JZH5mka2.Azb6C3y26', 'Hassan', 'Ahmad', '2000-10-02', 500000008, 'male', '123 Main St', 'coach', '2024-06-01 19:11:39', '', 50, 'active', '1717265787226-741839932.jpg'),
('member1@gmail.com', 'member01', '$2b$10$FAcNCoGZ8TNdngHuZg4s5.OZIDVJtTtVQgMM7D/ZiScR9/cM0Xd/G', 'Ahmed', 'Ali', '2000-10-02', 500000020, 'male', '123 Main St', 'member', '2024-06-01 19:18:36', '', 51, 'active', '1717361502592-593600246.jpg'),
('member2@gmail.com', 'member02', '$2b$10$TA/WBFxlclGoR//3XWDRKuCCWLHUpN6oI/nv70J09nFVMUiOvdBRy', 'Bashir', 'Fadi', '2000-10-02', 500000020, 'male', '123 Main St', 'member', '2024-06-01 19:18:56', '', 52, 'active', NULL),
('member3@gmail.com', 'member03', '$2b$10$0XOyoNRJJ39tDZ6.os8rZul.HioHTEvEW5tEpB4I4wnOCON7lxNFO', 'Bashir', 'Hassan', '2000-10-02', 500000030, 'male', '123 Main St', 'member', '2024-06-01 19:19:15', '', 53, 'blocked', NULL),
('member4@gmail.com', 'member04', '$2b$10$dMrMREGn2y8gEhzMU4aW7.5aq2VRwgWNg2W.ccVyWtVnJpp8rP/D.', 'Hussein', 'Ibrahim', '2000-10-02', 500000040, 'male', '123 Main St', 'member', '2024-06-01 19:20:37', '', 54, 'active', NULL),
('member5@gmail.com', 'member05', '$2b$10$/7bGlODQ.7Ya11eSGi4RduNhDbldRFC7KhNim9H0vzQTTQxRnVWj6', 'Khaled', 'Ibrahim', '2000-10-02', 500000050, 'male', '123 Main St', 'member', '2024-06-01 19:20:52', '', 55, 'active', NULL),
('member6@gmail.com', 'member06', '$2b$10$YODi5l48vR2q4/tYtLN0tuNyWclEj76Cj1RytWGjmRxdAl3Pkw8ha', 'Khaled', 'Mahmoud', '2000-10-02', 500000060, 'male', '123 Main St', 'member', '2024-06-01 19:21:05', '', 56, 'active', NULL),
('member7@gmail.com', 'member07', '$2b$10$uufFu65/LmRUG9PNT7ojlev3n7aKzVydCtlw8/W6lUcI6fw8AszlW', 'Fadi', 'Mohammed', '2000-10-02', 500000070, 'male', '123 Main St', 'member', '2024-06-01 19:21:21', '', 57, 'active', NULL),
('member8@gmail.com', 'member08', '$2b$10$OZbpBVZ0uRnMzcc1/L62deq4e0qMYSc73PUKsm5ZorE8oz9EG2oBS', 'Saeed', 'Omar', '2000-10-02', 500000080, 'male', '123 Main St', 'member', '2024-06-01 19:21:49', '', 58, 'active', NULL),
('member9@gmail.com', 'member09', '$2b$10$81ZfTyAlvJexOux56x4B5e9eAEDe28CDx.UnXWbyV8RAsr4kAC9l2', 'Rami', 'Tarek', '2000-10-02', 500000090, 'male', '123 Main St', 'member', '2024-06-01 19:22:10', '', 59, 'active', NULL),
('member10@gmail.com', 'member10', '$2b$10$pyshAxYRSwgPu4FMMVjAa.f9hLpx9Dd47XyfylTu1/ZPyYGIWTqqa', 'Anwar', 'Bilal', '2000-10-02', 500000100, 'male', '123 Main St', 'member', '2024-06-01 19:23:08', '', 60, 'active', NULL),
('member11@gmail.com', 'member11', '$2b$10$DUaI59XiHcuBHOUAh/6u5.2zKhfkIKpD./mR20aqLrzOGKca8r1hu', 'Khaled', 'Bilal', '2000-10-02', 500000110, 'male', '123 Main St', 'member', '2024-06-01 19:23:22', '', 61, 'active', NULL),
('member12@gmail.com', 'member12', '$2b$10$wZm9ode7I/kiQcm8jvyTR.9K6ivr6f6gq7SWKdRMSUhD5JxDbi.xW', 'Bilal', 'Hamza', '2000-10-02', 500000120, 'male', '123 Main St', 'member', '2024-06-01 19:24:19', '', 62, 'active', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`bookingId`);

--
-- Indexes for table `certification`
--
ALTER TABLE `certification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`classId`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coaches`
--
ALTER TABLE `coaches`
  ADD PRIMARY KEY (`coachId`,`userId`);

--
-- Indexes for table `enrollmentrequests`
--
ALTER TABLE `enrollmentrequests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `memberships`
--
ALTER TABLE `memberships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membershipstatus`
--
ALTER TABLE `membershipstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `coach_id` (`coach_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transactionId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `bookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `certification`
--
ALTER TABLE `certification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `classId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `enrollmentrequests`
--
ALTER TABLE `enrollmentrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `memberships`
--
ALTER TABLE `memberships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `membershipstatus`
--
ALTER TABLE `membershipstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coaches`
--
ALTER TABLE `coaches`
  ADD CONSTRAINT `fk_coach_user` FOREIGN KEY (`coachId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`coachId`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
