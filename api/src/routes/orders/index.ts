import { Router } from 'express';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { validateDate } from '../../middlewares/validationMiddleware.js';
import {
  insertOrderItemSchema,
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from '../../db/ordersSchema.js';
import {
  createrOrder,
  getOrder,
  listOrders,
  updateOrder,
} from './orderController.js';

const router = Router();
router.post(
  '/',
  verifyToken,
  // validateDate(insertOrderItemSchema),
  validateDate(insertOrderWithItemsSchema),
  createrOrder
);

router.get('/', verifyToken, listOrders);
router.get('/:id', verifyToken, getOrder);
router.put('/:id', verifyToken, validateDate(updateOrderSchema), updateOrder);
export default router;
