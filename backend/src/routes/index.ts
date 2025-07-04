import { Router } from 'express';
import userRoutes from './user.routes';

// 导入更多路由
// import stakeRoutes from './stake.routes';
// import resourceRoutes from './resource.routes';

/**
 * 全部API路由汇总
 */
const router = Router();

/**
 * 用户路由
 */
router.use('/users', userRoutes);

/**
 * 质押路由 (将在后续实现)
 */
// router.use('/stakes', stakeRoutes);

/**
 * 资源租赁路由 (将在后续实现)
 */
// router.use('/resources', resourceRoutes);

export default router; 