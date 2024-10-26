import { Router } from 'express';
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from '../../db/usersSchema.js';
import { validateDate } from '../../middlewares/validationMiddleware.js';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';

import jwt from 'jsonwebtoken';
const router = Router();

const generateUserToken = (user: any) => {
  return jwt.sign({ userId: user.id, role: user.role }, 'iwuwyou', {
    expiresIn: '30d',
  });
};

router.post('/register', validateDate(createUserSchema), async (req, res) => {
  // console.log(req.cleanBody);
  try {
    const data = req.cleanBody;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // console.log(data, hashedPassword);
    data.password = hashedPassword;

    //

    const [user] = await db.insert(usersTable).values(data).returning();
    // delete the password to prevent the password includes in the response
    //@ts-ignore
    delete user.password;
    //generate the token
    const token = generateUserToken(user);

    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post('/login', validateDate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user) {
      res.status(401).json({ error: 'Authentication Failed!' });
      return;
    }
    const matched = await bcrypt.compare(password, user.password);
    console.log(user.password, password);

    if (!matched) {
      res.status(401).json({ error: 'Authentication Failed' });
      return;
    }

    // create the jwt token
    const token = generateUserToken(user);

    // delete the password because we send these responses to the frontend and we dont want to store password in the frontend as the security concerns
    //@ts-ignore
    delete user.password;
    // now it safely passes this data to the frontend
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).send('Something error');
  }
});

export default router;
