# ConfigurableAPIServer

ConfigurableAPIServer 目标是提供基于配置的、半自动化的、可供非技术人员使用的、交互友好的、支持权限与密钥配置的跨异构数据存储的动态接口生成服务。对于很多中小创公司而言，人手的不足与快速迭代的产品需求一直是主要矛盾之一。笔者之前在[RARF：基于响应式抽象资源流的深度 RESTful 实践](https://segmentfault.com/a/1190000004600730)与[]()中都提及，合理稳定的接口设计会是保障项目工程化的重要因素之一。而 [ConfigurableAPIServer](https://github.com/wxyyxc1992/ConfigurableAPIServer) 即是希望构建一种运营人员可用的交互配置快速创建 API 的尝试，同时也考虑到了接口的权限控制与安全保障。实际上笔者在进行 ConfigurableAPIServer 的设计思考时感觉，其逻辑很类似于 ETL 的过程，包括了数据的输入、抽取、转换、合并、输出等等操作，不过 ConfigurableAPIServer 同时需要考虑到提供可供访问的接口、对于 JSON/XML 格式的支持、对于接口权限控制的支持等等。

## Feature

* 接口生成：可以根据用户输入或者交互式构造的 SQL 语句动态生成接口。
* 异构数据存储：支持从多种类型数据库进行跨库数据获取。
* 权限控制：支持对于接口/接口组的权限控制，支持接口组的动态密钥分配，支持对于返回数据的实时加密。
* 接口风格：支持 ActionOriented、RESTful API、GraphQL 等多种风格的接口访问。

# 基本架构

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/2/1/QQ20170207-0fdfasdfasdfasdfsd.png)

# 交互式复杂查询逻辑构造

我们面临的最终提交给消费者使用的 API 往往是由多个表、多个库，乃至于多个异构存储数据合并转换而来，借鉴自然语言处理或者编译原理的概念，我们可以选择自顶向下的来递归划分处理 API，也可以自底向上的进行合并处理。本文中笔者介绍的过程会以自底向上的合并为主，即
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/2/1/QQ20170207-01111.png)
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/2/1/QQ20170207-0asadas.png)

# 数据操作
