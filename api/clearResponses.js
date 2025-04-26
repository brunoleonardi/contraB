// /api/clearResponses.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    await client.connect();
    const database = client.db('contrabullying');
    const collection = database.collection('responses');

    const result = await collection.deleteMany({});

    res.status(200).json({ message: 'Todos os dados foram apagados.', deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao limpar os dados' });
  } finally {
    await client.close();
  }
}
