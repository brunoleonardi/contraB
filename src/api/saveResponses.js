// /api/saveResponses.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!uri) {
  throw new Error('Por favor defina a variável de ambiente MONGODB_URI no Vercel');
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Método não permitido. Apenas POST.' });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db('contrabullying'); // Nome do banco de dados
    const collection = db.collection('responses'); // Nome da coleção

    const { ruim, neutro, bom } = req.body;

    if (ruim === undefined || neutro === undefined || bom === undefined) {
      return res.status(400).json({ message: 'Dados incompletos.' });
    }

    const result = await collection.insertOne({
      ruim,
      neutro,
      bom,
      timestamp: new Date(),
    });

    res.status(200).json({ message: 'Dados salvos com sucesso!', id: result.insertedId });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}
