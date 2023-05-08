import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { MongoClient, ServerApiVersion } from 'mongodb';
import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';
import KPI from './models/KPI.js';
import Product from './models/Product.js';
import Transaction from './models/Transaction.js';
import { kpis, products, transactions } from './data/data.js';

// /* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/kpi', kpiRoutes);
app.use('/product', productRoutes);
app.use('/transaction', transactionRoutes);

const uri =
  'mongodb+srv://elva329:1234@cluster0.4dy91if.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('test').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
    // await client.db('test').dropDatabase();
    // await client.db('test').collection('products').insertMany(products);
    // await client.db('test').collection('transactions').insertMany(transactions);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
