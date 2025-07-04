# TronStakeProject 后端

TronStakeProject的Node.js+Express+TypeScript后端服务，提供质押挖矿和资源租赁的API接口。

## 项目结构

```
backend/
├── dist/               # 编译输出目录
├── node_modules/       # 依赖包
├── src/                # 源代码目录
│   ├── config/         # 配置文件
│   ├── controllers/    # 控制器
│   ├── interfaces/     # TypeScript接口定义
│   ├── middlewares/    # 中间件
│   ├── models/         # 数据模型
│   ├── routes/         # API路由
│   ├── services/       # 业务服务
│   ├── utils/          # 工具函数
│   └── index.ts        # 应用入口文件
├── .env                # 环境变量（需要手动创建）
├── .env.example        # 环境变量示例
├── .gitignore          # Git忽略文件
├── package.json        # 项目信息和依赖
├── README.md           # 项目说明文档
└── tsconfig.json       # TypeScript配置
```

## 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 5.0
- Redis >= 6.0 (可选)

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制`.env.example`文件为`.env`并根据需求修改配置：

```bash
cp .env.example .env
```

### 3. 运行开发服务器

```bash
npm run dev
```

服务默认运行在 http://localhost:3001

### 4. 构建生产版本

```bash
npm run build
```

### 5. 运行生产服务

```bash
npm start
```

## API文档

### 健康检查

```
GET /health
```

响应示例:

```json
{
  "status": "success",
  "message": "Server is running",
  "data": {
    "uptime": 123.456
  }
}
```

### 用户API

#### 钱包连接/登录

```
POST /api/v1/users/connect
```

请求体:

```json
{
  "address": "T..."  // TRON钱包地址
}
```

#### 获取当前用户信息

```
GET /api/v1/users/me
```

需要在请求头中包含有效的JWT令牌：

```
Authorization: Bearer <token>
```

#### 更新用户资料

```
PUT /api/v1/users/profile
```

请求体:

```json
{
  "nickname": "用户昵称",
  "email": "user@example.com"
}
```

## 开发指南

### 添加新路由

1. 在`src/models`中创建数据模型
2. 在`src/services`中创建服务层
3. 在`src/controllers`中创建控制器
4. 在`src/routes`中创建路由
5. 在`src/routes/index.ts`中注册新路由

### 中间件使用

系统已配置以下中间件：

- CORS：跨域资源共享
- Helmet：安全HTTP头设置
- Body Parser：请求体解析
- Logger：请求日志
- Response Formatter：响应格式化
- Error Handler：统一错误处理

## 测试

```bash
npm test
```

## 贡献指南

1. Fork仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request 