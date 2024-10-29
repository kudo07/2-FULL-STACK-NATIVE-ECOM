import { Request, Response } from 'express';
import { db } from '../../db';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';
import { eq } from 'drizzle-orm';

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
    // THE ID IS GENERATED 5 IN THIS TABLE FOR THE NEW ORDER WHITH USERID 1 NOW
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
      // .ORDERID:5 next time in db is 6
    }));
    console.log(orderItems);
    //       [
    //   { productId: 2, quantity: 1, price: 100, orderId: 5 },
    //   { productId: 3, quantity: 2, price: 120, orderId: 5 }
    // ]

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();
    console.log(newOrderItems);

    //{ id: 9, orderId: 5, productId: 2, quantity: 1, price: 100 },
    //   { id: 10, orderId: 5, productId: 3, quantity: 2, price: 120 }
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
export async function getOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    // 5
    const orderWithItems = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      // LOOP WHEN WE MATCH 5==5
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));
    // LEFTJOIN ORDERITEMSTABLE MEAN CONTAINS ALL THE COLUMN FROM ORDERITEMSTABLE ALONG WITH MATCH ONE

    //
    console.log('ORDERwITHiTEMS', orderWithItems);
    //
    if (orderWithItems.length === 0) {
      res.status(404).send('Order not Found');
    }
    const mergedOrder = {
      ...orderWithItems[0].orders,
      items: orderWithItems.map((oi) => oi.order_items),
    };
    console.log('MERGE ORDER', mergedOrder);
    //
    res.status(200).json(mergedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function updateOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const [updatedOrder] = await db
      .update(ordersTable)
      .set(req.body)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!updatedOrder) {
      res.status(404).send('Order not found');
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
