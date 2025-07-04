import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import validate from '../middlewares/validation.middleware';

const router = Router();

/**
 * @route POST /api/v1/users/connect
 * @desc 钱包连接登录/注册
 * @access Public
 */
router.post(
  '/connect',
  [
    body('address')
      .notEmpty()
      .withMessage('钱包地址不能为空')
      .isString()
      .withMessage('钱包地址必须是字符串')
      .isLength({ min: 34, max: 34 })
      .withMessage('TRON钱包地址必须是34个字符'),
  ],
  validate([
    body('address')
      .notEmpty()
      .withMessage('钱包地址不能为空')
      .isString()
      .withMessage('钱包地址必须是字符串')
      .isLength({ min: 34, max: 34 })
      .withMessage('TRON钱包地址必须是34个字符'),
  ]),
  userController.connectWallet
);

/**
 * @route GET /api/v1/users/me
 * @desc 获取当前用户信息
 * @access Private
 */
router.get('/me', authenticate, userController.getCurrentUser);

/**
 * @route PUT /api/v1/users/profile
 * @desc 更新用户资料
 * @access Private
 */
router.put(
  '/profile',
  authenticate,
  validate([
    body('nickname')
      .optional()
      .isString()
      .withMessage('昵称必须是字符串')
      .isLength({ min: 2, max: 30 })
      .withMessage('昵称长度必须在2-30个字符之间'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('邮箱格式不正确'),
  ]),
  userController.updateProfile
);

export default router; 