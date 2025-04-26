// /api/getResponses.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const database = client.db('contrabullying');
    const collection = database.collection('responses');

    const responses = await collection.find().toArray();

    res.status(200).json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar dados' });
  } finally {
    await client.close();
  }
}