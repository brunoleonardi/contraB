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

    const { ruim, neutro, bom } = req.body;

    const result = await collection.insertOne({
      ruim,
      neutro,
      bom,
      timestamp: new Date(),
    });

    res.status(200).json({ message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar dados.' });
  }
}
