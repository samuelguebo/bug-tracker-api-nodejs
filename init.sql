SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE
IF NOT EXISTS bugtracker_db;

USE bugtracker_db;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bugtracker_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `content` text NOT NULL,
  `authorId` int NOT NULL,
  `taskId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `createdAt`, `updatedAt`, `content`, `authorId`, `taskId`) VALUES
(5, '2022-12-04 12:41:37.386983', '2022-12-18 12:52:56.000000', 'In JavaScript parseInt() function (or a method) is used to convert the passed in string parameter or value to an integer value itself.', 1, 1),
(30, '2022-12-06 22:11:49.804540', '2022-12-06 22:11:49.804540', 'Well, let\'s see it all again....\n', 1, 3),
(32, '2022-12-06 22:14:05.353491', '2022-12-06 22:14:05.353491', 'Well, let\'s see it all again....', 1, 3),
(37, '2022-12-06 22:22:48.505603', '2022-12-06 22:22:48.505603', 'Well, let\'s see it all again....', 1, 4),
(38, '2022-12-06 22:31:13.858996', '2022-12-06 22:31:13.858996', 'Well, let\'s see it all again....', 1, 4),
(39, '2022-12-06 22:32:14.446238', '2022-12-06 22:32:14.446238', 'Well, let\'s see it all again....', 1, 4),
(41, '2022-12-06 22:38:46.153762', '2022-12-06 22:38:46.153762', 'Well, let\'s see it all again....', 1, 4),
(42, '2022-12-06 22:39:20.735061', '2022-12-06 22:39:20.735061', 'Well, let\'s see it all again....', 1, 4),
(43, '2022-12-06 22:41:46.926173', '2022-12-06 22:41:46.926173', 'Well, let\'s see it all again....', 1, 4),
(44, '2022-12-06 22:44:12.732220', '2022-12-06 22:44:12.732220', 'Well, let\'s see it all again....', 1, 4),
(45, '2022-12-06 22:47:35.293899', '2022-12-06 22:47:35.293899', 'Well, let\'s see it all again....', 1, 4),
(47, '2022-12-06 23:07:19.129304', '2022-12-06 23:07:19.129304', 'Well, let\'s see it all again....', 1, 4),
(48, '2022-12-06 23:15:14.986605', '2022-12-06 23:15:14.986605', 'Well, let\'s see it all again....', 1, 4),
(49, '2022-12-06 23:15:52.040560', '2022-12-06 23:15:52.040560', 'Well, let\'s see it all again....', 1, 4),
(50, '2022-12-06 23:19:15.772932', '2022-12-06 23:19:15.772932', 'Well, let\'s see it all again....', 1, 4),
(52, '2022-12-06 23:22:22.127638', '2022-12-06 23:22:22.127638', 'Well, let\'s see it all again....', 2, 5),
(79, '2022-12-08 21:15:32.186953', '2022-12-08 21:15:36.000000', 'Let\'s see that!!', 1, 14),
(80, '2022-12-18 18:35:46.324599', '2022-12-18 18:35:46.324599', 'Alrighty!', 1, 14),
(81, '2022-12-18 18:36:09.174701', '2022-12-18 18:36:09.174701', 'It seems we\'re going in the right direction!', 2, 12);

-- --------------------------------------------------------

--
-- Table structure for table `custom_migration_table`
--

CREATE TABLE `custom_migration_table` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `title` varchar(80) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `createdAt`, `updatedAt`, `title`, `description`) VALUES
(2, '2022-12-04 19:17:57.061408', '2022-12-05 04:34:05.000000', 'Advertising campaign', 'An advertising campaign is a specifically designed strategy that is carried out across different mediums in order to achieve desired results such as increased brand awareness, increased sales, and improved communication within a specific market. All of this is accomplished through advertising.'),
(3, '2022-12-04 19:19:02.634496', '2022-12-05 04:25:13.000000', 'Staff onboarding', 'New employee onboarding is the process of integrating a new employee with a company and its culture, as well as getting a new hire the tools and information needed to become a productive member of the team.\n\nOnboarding new hires at an organization should be a strategic process that lasts at least one year, staffing and HR experts say, because how employers handle the first few days and months of a new employee\'s experience is crucial to ensuring high retention.'),
(4, '2022-12-04 23:48:44.745132', '2022-12-05 04:29:54.000000', 'Annual planning', 'Planning is an essential aspect of everyday life. And when it comes to companies, whether small or large, planning is equally essential. Annual planning is one of the most important activities that companies do every year because it provides an opportunity to set the overall direction of a company by discussing goals, metrics, budget, and performance.  '),
(5, '2022-12-05 01:59:08.329801', '2022-12-05 22:57:47.000000', 'Fundraising Campaign', 'Nonprofits use fundraising events to raise money to fuel their missions. Events give donors and other community members the opportunity to engage with nonprofits in an active way, as opposed to simply giving a donation. Getting Facetime with donors also gives organizations the chance to reiterate their mission and discuss ways people can get more involved in their work.'),
(6, '2022-12-05 22:39:45.076306', '2022-12-05 23:02:53.000000', 'Technical Privacy review', 'Having a privacy review process is a continuation of the work we have discussed so far, whereby a company has to manage how it classifies data, catalogs the data, protects it using access controls, and processes and shares it over the course of conducting businzess.'),
(7, '2022-12-08 21:46:11.680871', '2022-12-08 21:57:32.000000', 'Employment Policy', 'Employment policy means a policy entered into wholly or partly for the benefit of the employees of an employer against a health risk.');

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `projectId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `project_members`
--

INSERT INTO `project_members` (`projectId`, `userId`) VALUES
(7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_members_user`
--

CREATE TABLE `project_members_user` (
  `projectId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `project_members_user`
--

INSERT INTO `project_members_user` (`projectId`, `userId`) VALUES
(2, 1),
(2, 3),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(5, 1),
(5, 3),
(6, 2),
(7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_tasks`
--

CREATE TABLE `project_tasks` (
  `projectId` int NOT NULL,
  `taskId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_tasks_task`
--

CREATE TABLE `project_tasks_task` (
  `projectId` int NOT NULL,
  `taskId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `title` varchar(255) NOT NULL,
  `description` text,
  `priority` varchar(255) NOT NULL DEFAULT 'low',
  `authorId` int NOT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `createdAt`, `updatedAt`, `title`, `description`, `priority`, `authorId`, `startDate`, `endDate`) VALUES
(1, '2022-12-03 21:38:05.493674', '2022-12-09 18:20:03.000000', 'Complete transition 100% ', 'Let\'s celebrate the move!!!!', 'medium', 1, '2022-12-09 00:00:00', '2022-12-17 00:00:00'),
(3, '2022-12-04 18:32:57.696792', '2022-12-08 21:26:25.000000', 'Reduce size of list', 'Lorem ipsum dolorrr', 'low', 1, NULL, NULL),
(4, '2022-12-04 18:38:08.204863', '2022-12-09 15:54:00.000000', 'Complete transition 100% ', 'Let\'s see that', 'low', 1, NULL, NULL),
(5, '2022-12-04 19:51:29.666532', '2022-12-12 17:01:07.000000', 'Prepare fundraising documentation', 'There has to be some text somehow, right????', 'high', 1, '2022-12-12 00:00:00', '2022-12-23 00:00:00'),
(7, '2022-12-05 00:56:21.934892', '2022-12-12 17:15:31.000000', 'Stephanie de Monaco', 'Flash all day, eyes looking to the sky', 'medium', 1, '2022-12-18 00:00:00', '2022-12-17 00:00:00'),
(10, '2022-12-05 01:46:50.101101', '2022-12-05 01:46:50.101101', 'Yet another test', 'Lorem blabla', 'low', 1, NULL, NULL),
(12, '2022-12-05 22:25:02.517318', '2022-12-05 22:25:02.517318', 'Announcing the agenda for TechCrunch Live', 'Minneapolis is quickly solidifying itself as one of the Midwest’s most important startup ecosystems. TechCrunch Live is thrilled to host a special (virtual) event in the Twin Cities. Next week, on Wednesday, September 7, our crew is set to interview some of the best startups and investors, and speak on the area’s recent fundings, best practices and strategies. Just like every TechCrunch Live event, this one is free to attend and participate in.', 'medium', 2, NULL, NULL),
(13, '2022-12-08 20:46:12.779484', '2022-12-08 20:46:12.779484', 'Test #95', 'Lorem blabla', 'low', 1, NULL, NULL),
(14, '2022-12-08 20:56:09.011517', '2022-12-08 21:21:58.000000', 'Test #100', ' Your answer could be improved with additional supporting information.', 'low', 1, NULL, NULL),
(15, '2022-12-09 13:52:28.582850', '2022-12-09 13:52:28.582850', 'A new day has set down', 'Waiting for a miracle to come', 'low', 1, NULL, NULL),
(16, '2022-12-09 16:40:15.425838', '2022-12-09 18:17:23.000000', 'Hymn for the Weekend', '[Verse 1: Chris Martin]\nOh, angel sent from up above\nYou know you make my world light up\nWhen I was down, when I was hurt\nYou came to lift me up\nLife is a drink and love\'s a drug\nOh now I think I must be miles up\nWhen I was a river dried up\nYou came to rain a flood\n', 'high', 1, '2022-12-06 00:00:00', '2022-12-30 00:00:00'),
(17, '2022-12-09 22:36:16.609141', '2022-12-09 22:42:28.000000', 'Kuchiyose no Jutsu!', 'Hmm. We’re having trouble finding that site.', 'high', 1, '2022-12-09 00:00:00', '2022-12-17 00:00:00'),
(18, '2022-12-09 22:53:58.063452', '2022-12-09 22:53:58.063452', 'Test #101', 'Test blabla', 'low', 1, '2022-12-10 00:00:00', '2022-12-17 00:00:00'),
(19, '2022-12-09 23:00:41.088418', '2022-12-09 23:00:41.088418', '404 Not found', '404 Not found', 'high', 1, '2022-12-31 00:00:00', '2023-01-31 00:00:00'),
(20, '2022-12-11 17:16:05.425653', '2022-12-12 17:14:53.000000', 'Testaaaaa', 'A great task without a title is a shame.', 'low', 2, NULL, NULL),
(21, '2022-12-18 20:53:31.624495', '2022-12-18 20:53:31.624495', 'Implement Role-based views', 'This was down in a smooth and elegant way.', 'high', 2, '2022-12-16 00:00:00', '2022-12-18 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `task_collaborators`
--

CREATE TABLE `task_collaborators` (
  `taskId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `task_collaborators`
--

INSERT INTO `task_collaborators` (`taskId`, `userId`) VALUES
(16, 1),
(16, 2),
(17, 2),
(19, 1),
(19, 2);

-- --------------------------------------------------------

--
-- Table structure for table `task_collaborators_user`
--

CREATE TABLE `task_collaborators_user` (
  `taskId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `task_collaborators_user`
--

INSERT INTO `task_collaborators_user` (`taskId`, `userId`) VALUES
(1, 1),
(1, 2),
(5, 1),
(5, 2),
(7, 2),
(10, 1),
(10, 2),
(12, 1),
(12, 3),
(15, 1),
(15, 2),
(16, 2),
(17, 2),
(20, 1),
(20, 2),
(21, 2),
(21, 3);

-- --------------------------------------------------------

--
-- Table structure for table `task_projects`
--

CREATE TABLE `task_projects` (
  `taskId` int NOT NULL,
  `projectId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_projects_project`
--

CREATE TABLE `task_projects_project` (
  `taskId` int NOT NULL,
  `projectId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `task_projects_project`
--

INSERT INTO `task_projects_project` (`taskId`, `projectId`) VALUES
(4, 2),
(4, 3),
(5, 2),
(5, 3),
(5, 4),
(7, 2),
(7, 4),
(10, 2),
(10, 4),
(12, 3),
(12, 5),
(13, 2),
(13, 4),
(13, 6),
(14, 3),
(14, 5),
(15, 5),
(15, 7),
(16, 5),
(16, 7),
(17, 5),
(18, 5),
(19, 6),
(20, 3),
(20, 5),
(21, 6);

-- --------------------------------------------------------

--
-- Table structure for table `task_projects_user`
--

CREATE TABLE `task_projects_user` (
  `taskId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_subscribers`
--

CREATE TABLE `task_subscribers` (
  `taskId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'member',
  `password` varchar(255) NOT NULL,
  `avatar` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `createdAt`, `updatedAt`, `email`, `firstName`, `lastName`, `role`, `password`, `avatar`) VALUES
(1, '2022-12-03 21:36:57.448317', '2023-02-12 00:17:11.000000', 'marie@rose.com', 'Maria', 'Rose', 'admin', '$2a$10$vd8EWHFOheceVN2fRnE5iebFHqDSDrxEI0Xq19Q0WRkapFDkyXc1O', 6),
(2, '2022-12-05 04:36:26.441214', '2023-02-12 00:19:38.000000', 'samuel@doe.com', 'Samuel', 'Doe', 'member', '$2a$10$sbIpIWBYnu3N2S2SSgVz/eEr81vtvAd/BcHqfvv2taYx1Km7BhVee', 9),
(3, '2022-12-18 19:51:30.352599', '2023-02-12 00:20:42.000000', 'anna@brown.com', 'Anna', 'Brown', 'member', '$2a$10$R.hCYstVO6yyPjTYMkeEIOeha4r8RXiVZ6cxMzmjJ39DoqWNAgUgm', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_projects`
--

CREATE TABLE `user_projects` (
  `projectId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_276779da446413a0d79598d4fbd` (`authorId`),
  ADD KEY `FK_9fc19c95c33ef4d97d09b72ee95` (`taskId`);

--
-- Indexes for table `custom_migration_table`
--
ALTER TABLE `custom_migration_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`projectId`,`userId`),
  ADD KEY `IDX_d19892d8f03928e5bfc7313780` (`projectId`),
  ADD KEY `IDX_08d1346ff91abba68e5a637cfd` (`userId`);

--
-- Indexes for table `project_members_user`
--
ALTER TABLE `project_members_user`
  ADD PRIMARY KEY (`projectId`,`userId`),
  ADD KEY `IDX_c79bdce48cf47ff04f1ec3a8ca` (`projectId`),
  ADD KEY `IDX_66c5703c0321bafc7c9352098b` (`userId`);

--
-- Indexes for table `project_tasks`
--
ALTER TABLE `project_tasks`
  ADD PRIMARY KEY (`projectId`,`taskId`),
  ADD KEY `IDX_8691c10b6396e041f4b6d48f8a` (`projectId`),
  ADD KEY `IDX_384d8a4f974230542e9534fade` (`taskId`);

--
-- Indexes for table `project_tasks_task`
--
ALTER TABLE `project_tasks_task`
  ADD PRIMARY KEY (`projectId`,`taskId`),
  ADD KEY `IDX_aa082f0ebc8b24afddce4718e8` (`projectId`),
  ADD KEY `IDX_9076819ac7aa0ecfa197771745` (`taskId`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_30cb9d78297c1f2a2e07df1a616` (`authorId`);

--
-- Indexes for table `task_collaborators`
--
ALTER TABLE `task_collaborators`
  ADD PRIMARY KEY (`taskId`,`userId`),
  ADD KEY `IDX_91d86a6665718217028c9a0c2b` (`taskId`),
  ADD KEY `IDX_7894523af02d1c28354316c2fa` (`userId`);

--
-- Indexes for table `task_collaborators_user`
--
ALTER TABLE `task_collaborators_user`
  ADD PRIMARY KEY (`taskId`,`userId`),
  ADD KEY `IDX_18bd89b04f48f12d3363db5faf` (`taskId`),
  ADD KEY `IDX_851cac50ba6d59f386eb20aff8` (`userId`);

--
-- Indexes for table `task_projects`
--
ALTER TABLE `task_projects`
  ADD PRIMARY KEY (`taskId`,`projectId`),
  ADD KEY `IDX_dbfb2d6d3a37f8ff37a50105b6` (`taskId`),
  ADD KEY `IDX_7de51bc552589cfd9871bf0af8` (`projectId`);

--
-- Indexes for table `task_projects_project`
--
ALTER TABLE `task_projects_project`
  ADD PRIMARY KEY (`taskId`,`projectId`),
  ADD KEY `IDX_2d4befc8ced6faadfae8544e16` (`taskId`),
  ADD KEY `IDX_5c6dfaaca9d725da6e607ad2e8` (`projectId`);

--
-- Indexes for table `task_projects_user`
--
ALTER TABLE `task_projects_user`
  ADD PRIMARY KEY (`taskId`,`userId`),
  ADD KEY `IDX_23eab4f7497047c06642761b96` (`taskId`),
  ADD KEY `IDX_148358801b20059c8ade13985f` (`userId`);

--
-- Indexes for table `task_subscribers`
--
ALTER TABLE `task_subscribers`
  ADD PRIMARY KEY (`taskId`,`userId`),
  ADD KEY `IDX_4a5ac6a95536010df1f88f07a6` (`taskId`),
  ADD KEY `IDX_82211d78cb32c9651229c9147b` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- Indexes for table `user_projects`
--
ALTER TABLE `user_projects`
  ADD PRIMARY KEY (`projectId`,`userId`),
  ADD KEY `IDX_2320cee7a393cf21d47ce3db75` (`projectId`),
  ADD KEY `IDX_8f5f60efe1ef2847c1f36302f1` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `custom_migration_table`
--
ALTER TABLE `custom_migration_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_9fc19c95c33ef4d97d09b72ee95` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_members`
--
ALTER TABLE `project_members`
  ADD CONSTRAINT `FK_08d1346ff91abba68e5a637cfdb` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_d19892d8f03928e5bfc7313780c` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_members_user`
--
ALTER TABLE `project_members_user`
  ADD CONSTRAINT `FK_66c5703c0321bafc7c9352098b5` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_c79bdce48cf47ff04f1ec3a8ca5` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_tasks`
--
ALTER TABLE `project_tasks`
  ADD CONSTRAINT `FK_384d8a4f974230542e9534fade2` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_8691c10b6396e041f4b6d48f8a0` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_tasks_task`
--
ALTER TABLE `project_tasks_task`
  ADD CONSTRAINT `FK_9076819ac7aa0ecfa197771745e` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_aa082f0ebc8b24afddce4718e83` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `FK_30cb9d78297c1f2a2e07df1a616` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_collaborators`
--
ALTER TABLE `task_collaborators`
  ADD CONSTRAINT `FK_7894523af02d1c28354316c2fa8` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_91d86a6665718217028c9a0c2bd` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_collaborators_user`
--
ALTER TABLE `task_collaborators_user`
  ADD CONSTRAINT `FK_18bd89b04f48f12d3363db5fafd` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_851cac50ba6d59f386eb20aff8f` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `task_projects`
--
ALTER TABLE `task_projects`
  ADD CONSTRAINT `FK_7de51bc552589cfd9871bf0af88` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_dbfb2d6d3a37f8ff37a50105b62` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_projects_project`
--
ALTER TABLE `task_projects_project`
  ADD CONSTRAINT `FK_2d4befc8ced6faadfae8544e16d` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_5c6dfaaca9d725da6e607ad2e8d` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_projects_user`
--
ALTER TABLE `task_projects_user`
  ADD CONSTRAINT `FK_148358801b20059c8ade13985fa` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_23eab4f7497047c06642761b962` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_subscribers`
--
ALTER TABLE `task_subscribers`
  ADD CONSTRAINT `FK_4a5ac6a95536010df1f88f07a62` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_82211d78cb32c9651229c9147bc` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_projects`
--
ALTER TABLE `user_projects`
  ADD CONSTRAINT `FK_2320cee7a393cf21d47ce3db753` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_8f5f60efe1ef2847c1f36302f1f` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
