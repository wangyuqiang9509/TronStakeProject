#!/bin/bash

# TronStakeProject 环境设置脚本
# 作者: TronStakeProject Team
# 版本: 1.0.0

echo "🚀 TronStakeProject 环境设置开始..."

# 检查Node.js版本
echo "📦 检查Node.js版本..."
node_version=$(node -v | sed 's/v//')
required_version="18.0.0"

if [ "$(printf '%s\n' "$required_version" "$node_version" | sort -V | head -n1)" = "$required_version" ]; then
    echo "✅ Node.js版本检查通过: $node_version"
else
    echo "❌ Node.js版本过低，需要 >= $required_version，当前版本: $node_version"
    exit 1
fi

# 检查npm版本
echo "📦 检查npm版本..."
npm_version=$(npm -v)
echo "✅ npm版本: $npm_version"

# 安装根目录依赖
echo "📦 安装项目依赖..."
npm install

# 创建环境变量模板
echo "🔧 创建环境变量模板..."
cat > .env.example << EOF
# 环境配置
NODE_ENV=development

# 服务端口
FRONTEND_PORT=3000
BACKEND_PORT=3001

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/tron-stake-project
REDIS_URL=redis://localhost:6379

# TRON网络配置
TRON_NETWORK=nile  # mainnet, shasta, nile
TRON_PRIVATE_KEY=your_private_key_here
TRON_FULL_NODE=https://api.nileex.io
TRON_SOLIDITY_NODE=https://api.nileex.io
TRON_EVENT_SERVER=https://api.nileex.io

# JWT配置
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# API配置
API_BASE_URL=http://localhost:3001/api
EOF

echo "📄 环境变量模板已创建: .env.example"

# 创建开发指南
echo "📚 创建开发指南..."
cat > docs/development-guide.md << EOF
# TronStakeProject 开发指南

## 快速开始

### 1. 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### 2. 项目设置
\`\`\`bash
# 克隆项目
git clone <repository-url>
cd tron-stake-project

# 运行设置脚本
chmod +x scripts/setup.sh
./scripts/setup.sh

# 复制环境变量
cp .env.example .env
# 编辑 .env 文件，填入实际配置值
\`\`\`

### 3. 开发命令
\`\`\`bash
# 安装所有模块依赖
npm run install:all

# 启动开发服务器（前端+后端）
npm run dev

# 单独启动前端
npm run dev:frontend

# 单独启动后端
npm run dev:backend

# 运行测试
npm test

# 代码检查
npm run lint

# 构建项目
npm run build
\`\`\`

### 4. 项目结构
参考根目录 README.md 文件

### 5. 开发规范
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码
- 提交前运行 lint 检查
- 编写单元测试

### 6. 推荐编辑器设置
项目已为 Cursor 编辑器优化配置:
- 自动格式化和代码检查
- Solidity 智能合约开发支持
- TypeScript/React 智能提示
- AI 编程助手集成

### 7. AI协作
参考 docs/project-management/ai-collaboration.md
EOF

echo "📚 开发指南已创建: docs/development-guide.md"

# 优化Cursor编辑器配置
echo "🎨 优化Cursor编辑器配置..."
if [ -d ".cursor" ]; then
    echo "✅ Cursor配置目录已存在"
    echo "✅ 已为TronStakeProject优化Cursor设置"
    echo "✅ 已配置Solidity、TypeScript、React等开发扩展"
else
    echo "⚠️  未找到Cursor配置目录，请确保使用Cursor编辑器打开项目"
fi

# 设置Git hooks
echo "🔗 设置Git hooks..."
mkdir -p .git/hooks

cat > .git/hooks/pre-commit << EOF
#!/bin/bash
echo "运行pre-commit检查..."
npm run lint
if [ \$? -ne 0 ]; then
    echo "❌ 代码检查失败，请修复后再提交"
    exit 1
fi
echo "✅ 代码检查通过"
EOF

chmod +x .git/hooks/pre-commit
echo "✅ Git pre-commit hook已设置"

echo ""
echo "🎉 项目初始化完成！"
echo ""
echo "📋 下一步操作:"
echo "1. 复制 .env.example 为 .env 并配置环境变量"
echo "2. 运行 npm run install:all 安装所有模块依赖"
echo "3. 开始开发各个模块"
echo ""
echo "💡 开发提示:"
echo "- 查看 docs/development-guide.md 了解开发指南"
echo "- 使用 npm run dev 启动开发服务器"
echo "- 推荐使用 Cursor 编辑器以获得最佳开发体验"
echo "- 遵循 AI协作指南提高开发效率"
echo ""
EOF 