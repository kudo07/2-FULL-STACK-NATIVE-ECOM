import { Request, Response } from 'express';
import { db } from '../../db';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';

export async function createrOrder(req: Request, res: Response) {
  // we get the data from the clean body
  try {
    const { order, items } = req.cleanBody;
    const userId = req.userId;
    // from the token which user is actually logged with the help of that token which provided from the authorisation header by copy paste that from login post route from the auth one becausew when we login we send the token in the their it have userId and role and token secret and send it to the login route post response in which we copy that token and paste it in the order create one in the header authorisation one and then pass the req.userId and req.role with that values from that token
    console.log(userId);
    // { userId: 1, role: 'seller', iat: 1730056296, exp: 1732648296 }
    if (!userId) {
      res.status(400).json({ message: 'Invalid order data' });
    }
    const [newOrder] = await db
      .insert(ordersTable)
      //@ts-ignore
      .values({ userId: userId })
      .returning();
    // TODO: validate products ids, and take their actual price from db
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));
    console.log(orderItems);
    //       [
    //   { productId: 2, quantity: 1, price: 100, orderId: 3 },
    //   { productId: 3, quantity: 2, price: 120, orderId: 3 }
    // ]

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();
    console.log(newOrderItems);

    //{ id: 5, orderId: 3, productId: 2, quantity: 1, price: 100 },
    //   { id: 6, orderId: 3, productId: 3, quantity: 2, price: 120 }
    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (error) {
    res.status(400).json({ message: 'Invalid order data' });
  }
}

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(ordersTable);
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
}
