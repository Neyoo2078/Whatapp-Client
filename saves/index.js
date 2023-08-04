import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { data } from './data.js';
import { ProductRouter } from './Routers/Product.js';
import dotenv from 'dotenv';
import userRouter from './Routers/User.js';
import { OrderRouter } from './Routers/Order.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const CONNECTION_URL = process.env.MONGOOSE_URL;

app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extented: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extented: true }));
app.use(cors());

app.use('/products', ProductRouter);
app.use('/user', userRouter);
app.use('/cart', OrderRouter);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log('app connected op port 5000');
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
