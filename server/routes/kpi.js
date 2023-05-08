import express from 'express';
import { MongoClient } from 'mongodb';
import KPI from '../models/KPI.js';

const uri =
  'mongodb+srv://elva329:1234@cluster0.4dy91if.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const database = client.db('test');
const kpiData = database.collection('kpis');

const router = express.Router();

router.get('/kpissss', async (req, res) => {
  try {
    const kpis = kpiData.find().toArray();
    console.log('res', res);
    // const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
