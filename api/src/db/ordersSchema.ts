import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { usersTable } from './usersSchema';
import { productTable } from './productSchema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
export const ordersTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default('New'),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),

  stripePaymentIntentId: varchar({ length: 255 }),
});

export const orderItemsTable = pgTable('order_items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productTable.id)
    .notNull(),

  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  id: true,
  userId: true,
  status: true,
  createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  id: true,
  orderId: true,
  // ORDER ID IS SOMETHING THAT WE DONT SPECIFY HERE ITS GOING TO BE TAKEN BY creating the new order
  //order schema we want to omit frilityom the items the possible the order id
});

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
});

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
  status: true,
});
