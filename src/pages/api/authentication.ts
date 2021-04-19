import { VercelResponse , VercelRequest } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

let cacheDb: Db = null;

async function connectToDatabase(uri: string){
  if(cacheDb){
    return cacheDb;
  }

  const client = await MongoClient.connect(uri, { //Fazendo conexão com cloud
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1); //Captura o nome do database

  const db = client.db(dbName); //Selecionando o banco de dados

  cacheDb = db; //Grava o cache do database

  return db;
}

export default async (req: VercelRequest, res: VercelResponse) =>{
  const { email } = req.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('users');

  await collection.insertOne({
    email,
    createAt: new Date(),
  })
  
  return res.status(201).json({ success: 'Usuário criado com sucesso.'})
}

