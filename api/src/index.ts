import express, { json, urlencoded } from 'express';
import productRoutes from './routes/products/index.js';
import serverless from 'serverless-http';
import authRoutes from './routes/auth/index.js';
// you can import it as any namec,f here
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
//sitting between our routes and our application to get the json format from the requesst
// parse it json in the format
const port = 3000;

// endpoints
//we group them together into the commeon endpoint /products

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
// the next part is continuation
// if (process.env.NODE_ENV === 'dev') {
// }
// export const handler = serverless(app);

app.listen(port, () => {
  console.log(`Example app listening on portss ${port}`);
});
