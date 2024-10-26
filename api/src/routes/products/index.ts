import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from './productController.js';
import { validateDate } from '../../middlewares/validationMiddleware.js';
import { createInsertSchema } from 'drizzle-zod';
import {
  createProductSchema,
  productTable,
  updateProductSchema,
} from '../../db/productSchema.js';
import { verifySeller, verifyToken } from '../../middlewares/authMiddleware.js';

// but we use drizzle-zod which we dont use double schema declaration
// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.number({ message: 'Price should be a number' }),
// });
// THIS IS HOW WE MAKE WITHOUT DOUBLE SCHEMA VALIDATION ALREADY IN SCHEMA

//
// type ProductType = z.infer<typeof createProductSchema>;
//
const router = Router();
router.get('/', listProducts);
router.get('/:id', getProductById);

router.post(
  '/',
  verifyToken,
  verifySeller,
  validateDate(createProductSchema),
  createProduct
);
// we only allow seller do this request
router.put(
  '/:id',
  verifyToken,
  verifySeller,
  validateDate(updateProductSchema),
  updateProduct
);
router.delete('/:id', verifyToken, verifySeller, deleteProduct);

export default router;
