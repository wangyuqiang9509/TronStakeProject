# TronStakeProject

## 项目简介
TronStakeProject是一个基于TRON区块链的质押挖矿和资源租赁平台，用户可以质押TRX获得能量收益，并参与资源租赁获得额外收益。

## 技术栈
- **前端**: React + TypeScript + Material-UI
- **后端**: Node.js + Express + TypeScript
- **智能合约**: Solidity + Hardhat + TronBox
- **数据库**: MongoDB + Redis
- **区块链**: TRON Network + TronWeb

## 项目结构
```
TronStakeProject/
├── frontend/           # 前端应用
├── backend/            # 后端API服务
├── contracts/          # 智能合约
├── docs/              # 项目文档
├── scripts/           # 部署和工具脚本
├── tests/             # 集成测试
└── README.md          # 项目说明
```

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- **推荐使用 Cursor 编辑器**

### 安装和运行
```bash
# 安装依赖
npm install

# 运行设置脚本
chmod +x scripts/setup.sh
./scripts/setup.sh

# 复制环境变量
cp .env.example .env
# 编辑 .env 文件配置实际参数

# 安装所有模块依赖
npm run install:all

# 启动开发服务器
npm run dev
```

## 📋 项目状态

### 🚀 快速查看进度
```bash
# 运行项目进度检查脚本
./scripts/check-progress.sh

# 或者查看详细进度文档
cat docs/project-management/progress-tracker.md
```

### ✅ 已完成模块
- **1.1 项目初始化** (2小时) - 已完成
  - 项目目录结构初始化
  - Cursor编辑器配置优化  
  - 代码质量工具配置 (ESLint + Prettier)
  - TypeScript开发环境配置
  - Git仓库初始化
  - **项目进度追踪系统建立**

### 🔄 当前进度
- **阶段**: 环境搭建与基础架构 (2/10小时完成)
- **下一个任务**: 1.2.1 React+TypeScript项目初始化
- **总体进度**: 1/48 主要任务 (约2.1%)

### 📊 详细进度追踪
查看完整的项目进度信息：
- [📈 项目进度追踪](docs/project-management/progress-tracker.md)
- [📋 任务分解结构](docs/project-management/task-breakdown.md)

## 开发指南
请参考 `docs/development-guide.md` 了解详细的开发指南。

## 编辑器配置
项目已为 **Cursor 编辑器** 优化配置，包含：
- 自动代码格式化和检查
- Solidity 智能合约开发支持  
- TypeScript/React 开发增强
- AI 编程助手集成

## 许可证
MIT License 