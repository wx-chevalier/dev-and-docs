/*
 Navicat Premium Data Transfer

 Source Server         : Truelore
 Source Server Type    : MySQL
 Source Server Version : 50715
 Source Host           : rm-bp1n3283lqp6w1n1uo.mysql.rds.aliyuncs.com
 Source Database       : i-knowledge

 Target Server Type    : MySQL
 Target Server Version : 50715
 File Encoding         : utf-8

 Date: 08/26/2018 16:56:17 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `knowledge_graph`
-- ----------------------------
DROP TABLE IF EXISTS `knowledge_graph`;
CREATE TABLE `knowledge_graph` (
  `_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认内键',
  `knowledge_id` varchar(20) NOT NULL DEFAULT '0' COMMENT '知识点编号',
  `knowledge_parent_id` varchar(20) NOT NULL DEFAULT '0' COMMENT '父知识点编号',
  `knowledge_name_en` varchar(200) DEFAULT NULL COMMENT '知识点英文名',
  `knowledge_name_zh` varchar(200) DEFAULT NULL COMMENT '知识点中文名',
  `knowledge_description_en` text COMMENT '知识点英文描述（MD）',
  `knowledge_description_zh` text COMMENT '知识点中文描述（MD）',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `唯一 knowledge_id` (`knowledge_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `knowledge_graph`
-- ----------------------------
BEGIN;
INSERT INTO `knowledge_graph` VALUES ('1', 'coding', 'it', 'Coding', '编程', 'My Coding Knowledge Graph', '我的编程知识图谱与架构体系'), ('2', 'pl', 'coding', 'ProgrammingLanguage', '编程语言', 'Domain of Programming Language', '编程语言的领域'), ('3', 'ce', 'coding', 'Coder-Essentials', '编程基础', 'Coder Essentials', '编程必备基础知识'), ('4', 'ft', 'coding', 'FrontendTechnology', '大前端', 'Frontend Technologo: iOS, Android, Hybrid, Desktop', '大前端开发：原生、跨平台'), ('5', 'is', 'coding', 'InformationSecurity', '信息安全', 'Information Security', '信息安全'), ('6', 'dsai', 'coding', 'DataScienceAI', '数据科学与人工智能', 'DataScience Artificial Intelligence', '数据科学与人工智能'), ('7', 'ssa', 'coding', 'ServerSideApplication', '服务端应用程序架构', 'ServerSide Application', '服务端应用程序架构'), ('8', 'infra', 'coding', 'Infrastructure', '基础架构', 'Infrastructure', '基础架构'), ('9', 'web', 'coding', 'Web', '网页', 'Web', '网页'), ('10', 'java', 'pl', 'Java', 'Java', 'Java', '互联网编程语言之王'), ('11', 'java-cp', 'java', 'Java ConcurrentProgramming', 'Java 并发编程', 'Java Concurrent Programming', 'Java 并发编程');
COMMIT;

-- ----------------------------
--  Table structure for `reference`
-- ----------------------------
DROP TABLE IF EXISTS `reference`;
CREATE TABLE `reference` (
  `_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认内键',
  `reference_id` varchar(10) DEFAULT 'IRFa~VaY2b' COMMENT '知识点编号',
  `reference_link` text COMMENT '链接',
  `reference_short_link` varchar(20) DEFAULT NULL COMMENT '短链接',
  `reference_title_en` varchar(200) DEFAULT NULL,
  `reference_title_zh` varchar(200) DEFAULT NULL,
  `reference_description_en` text,
  `reference_description_zh` text,
  `reference_tags` text,
  `reference_publish_time` date DEFAULT NULL,
  `reference_create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '收录到 Awesome Reference 的时间',
  `reference_update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `reference_type` int(11) DEFAULT '0' COMMENT '0 - Article 单篇文章； 1 - Slide 幻灯片； 2 - Series 系列文章； 3 - Book 书籍； 4 - Course 视频课程； 5 - Resource 资源集锦； 6 - Project 开源的项目或者库；',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `reference_knowledge_category`
-- ----------------------------
DROP TABLE IF EXISTS `reference_knowledge_category`;
CREATE TABLE `reference_knowledge_category` (
  `_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认内键',
  `knowledge_id` int(10) unsigned DEFAULT NULL COMMENT '知识点编号',
  `reference_id` varchar(10) DEFAULT NULL COMMENT '关联的知识点编号',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `series`
-- ----------------------------
DROP TABLE IF EXISTS `series`;
CREATE TABLE `series` (
  `_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认内键',
  `series_id` varchar(50) DEFAULT NULL,
  `knowledge_id` varchar(50) DEFAULT NULL COMMENT '关联的知识点编号',
  `series_cover` varchar(255) DEFAULT NULL,
  `series_name_en` varchar(20) DEFAULT NULL,
  `series_name_zh` varchar(255) DEFAULT NULL,
  `series_description_en` text,
  `series_description_zh` text,
  `series_link` text COMMENT '字符串类型或者 JSON 数组形式，用于存放多个链接',
  `series_tags_en` text,
  `series_tags_zh` text,
  `series_author` varchar(20) DEFAULT NULL,
  `series_type` varchar(20) DEFAULT NULL COMMENT 'weekly - 每周清单总结系列 book - 书籍',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `unique book_id` (`series_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `series`
-- ----------------------------
BEGIN;
INSERT INTO `series` VALUES ('1', 'fw', 'web', null, 'Frontend Weekly', '前端每周清单', null, '前端每周清单专注前端领域内容，以对外文资料的搜集为主，帮助开发者了解一周前端热点；分为新闻热点、开发教程、工程实践、深度阅读、开源项目、巅峰人生等栏目。欢迎关注【前端之巅】微信公众号（ID：frontshow），及时获取前端每周清单。', null, '', '[\"作者：王下邀月熊\",\"编辑：徐川\"]', null, 'weekly');
COMMIT;

-- ----------------------------
--  Table structure for `series_book_content`
-- ----------------------------
DROP TABLE IF EXISTS `series_book_content`;
CREATE TABLE `series_book_content` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `series_chapter`
-- ----------------------------
DROP TABLE IF EXISTS `series_chapter`;
CREATE TABLE `series_chapter` (
  `_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认内键',
  `series_id` varchar(50) DEFAULT NULL,
  `chapter_id` varchar(50) DEFAULT NULL,
  `chapter_parent_id` varchar(20) DEFAULT NULL,
  `chapter_name_en` varchar(200) DEFAULT NULL,
  `chapter_name_zh` varchar(200) DEFAULT NULL,
  `chapter_tags_en` text,
  `chapter_tags_zh` text,
  `chapter_order` int(10) unsigned DEFAULT '0' COMMENT '同级章节的顺序',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `series_chapter`
-- ----------------------------
BEGIN;
INSERT INTO `series_chapter` VALUES ('1', 'fw', 'fw-news', '-1', 'News', '新闻热点', null, '[\'国内国外，前端最新动态\']', '0'), ('2', 'fw', 'fw-develop', '-1', 'Develop Tutorial', '开发教程', null, '[\'步步为营，掌握基础技能\']', '1'), ('3', 'fw', 'fw-epractices', '-1', 'Engineering Practices', '工程实践', null, null, '2'), ('4', 'fw', 'fw-opensource', '-1', 'OpenSource', '开源项目', null, null, '3'), ('5', 'fw', 'fw-coder', '-1', 'Life', '巅峰人生', null, null, '4');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认内键',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `weekly`
-- ----------------------------
DROP TABLE IF EXISTS `weekly`;
CREATE TABLE `weekly` (
  `_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认内键',
  `series_id` varchar(50) DEFAULT NULL,
  `weekly_id` varchar(50) DEFAULT NULL,
  `weekly_cover` varchar(255) DEFAULT NULL,
  `weekly_name_en` varchar(255) DEFAULT NULL,
  `weekly_name_zh` varchar(255) DEFAULT NULL,
  `publish_time` date DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `weekly`
-- ----------------------------
BEGIN;
INSERT INTO `weekly` VALUES ('1', null, '2017-9-1', null, null, null, null, '2017-09-16 22:44:03', '2017-09-16 22:44:06');
COMMIT;

-- ----------------------------
--  Table structure for `weekly_reference`
-- ----------------------------
DROP TABLE IF EXISTS `weekly_reference`;
CREATE TABLE `weekly_reference` (
  `_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '默认内键',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
