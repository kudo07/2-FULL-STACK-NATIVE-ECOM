import { Router } from 'express';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { validateDate } from '../../middlewares/validationMiddleware.js';
import {
  insertOrderItemSchema,
  insertOrderWithItemsSchema,
} from '../../db/ordersSchema.js';
import { createrOrder } from './orderController.js';

const router = Router();
router.post(
  '/',
  verifyToken,
  // validateDate(insertOrderItemSchema),
  validateDate(insertOrderWithItemsSchema),
  createrOrder
);
export default router;
