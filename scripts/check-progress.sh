#!/bin/bash

# TronStakeProject 项目进度快速检查脚本
# 使用方法: ./scripts/check-progress.sh

echo "🚀 TronStakeProject 项目进度检查"
echo "=================================="
echo ""

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 显示项目基本信息
echo "📋 项目信息:"
PROJECT_NAME=$(grep '"name"' package.json | head -1 | awk -F'"' '{print $4}')
echo "   项目名称: $PROJECT_NAME"
echo "   当前目录: $(pwd)"
echo "   Git状态: $(git branch --show-current 2>/dev/null || echo '未初始化')"
echo ""

# 检查主要目录结构
echo "📁 项目结构:"
for dir in frontend backend contracts docs scripts tests; do
    if [ -d "$dir" ]; then
        echo "   ✅ $dir/"
    else
        echo "   ❌ $dir/ (缺失)"
    fi
done
echo ""

# 检查核心配置文件
echo "⚙️  核心配置:"
for file in package.json tsconfig.json .eslintrc.js .prettierrc; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file (缺失)"
    fi
done
echo ""

# 检查Cursor配置
echo "🎯 Cursor配置:"
if [ -d ".cursor" ]; then
    echo "   ✅ Cursor配置目录存在"
    for file in settings.json extensions.json workspace.json; do
        if [ -f ".cursor/$file" ]; then
            echo "   ✅ .cursor/$file"
        else
            echo "   ❌ .cursor/$file (缺失)"
        fi
    done
    if [ -d ".cursor/rules" ]; then
        rule_count=$(find .cursor/rules -name "*.mdc" | wc -l)
        echo "   ✅ Cursor Rules ($rule_count 个规则文件)"
    else
        echo "   ❌ .cursor/rules (缺失)"
    fi
else
    echo "   ❌ .cursor/ 目录不存在"
fi
echo ""

# 显示进度文档链接
echo "📊 查看详细进度:"
echo "   → docs/project-management/progress-tracker.md"
echo "   → docs/project-management/task-breakdown.md"
echo ""

# 检查进度追踪文件
if [ -f "docs/project-management/progress-tracker.md" ]; then
    echo "📈 当前进度概览:"
    # 提取当前阶段信息
    current_phase=$(grep "当前阶段" docs/project-management/progress-tracker.md | head -1 | cut -d':' -f2 | sed 's/^ *//')
    completed_tasks=$(grep "已完成任务" docs/project-management/progress-tracker.md | head -1 | cut -d':' -f2 | sed 's/^ *//')
    progress=$(grep "完成进度" docs/project-management/progress-tracker.md | head -1 | cut -d':' -f2 | sed 's/^ *//')
    
    echo "   当前阶段: $current_phase"
    echo "   已完成任务: $completed_tasks"
    echo "   完成进度: $progress"
    echo ""
    
    echo "🎯 下一步任务:"
    # 提取下一个待执行的任务
    next_task=$(grep -A5 "下一步行动计划" docs/project-management/progress-tracker.md | grep "立即执行" | cut -d':' -f2 | sed 's/^ *//')
    if [ ! -z "$next_task" ]; then
        echo "   $next_task"
    else
        echo "   请查看进度追踪文档了解详情"
    fi
else
    echo "❌ 进度追踪文档不存在: docs/project-management/progress-tracker.md"
fi

echo ""
echo "💡 提示: 要查看完整的项目进度和任务详情，请查看:"
echo "   📄 docs/project-management/progress-tracker.md"
echo "   📋 docs/project-management/task-breakdown.md"
echo ""
echo "✨ 开发指引: 打开Cursor编辑器查看 .cursor/rules/ 目录下的开发规范" 