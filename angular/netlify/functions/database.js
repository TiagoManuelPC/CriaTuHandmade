const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // MongoDB connection string from Netlify environment variables
let client;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('CriaTu'); // Replace <dbname> with your database name
};

exports.handler = async (event, context) => {
  try {
    const collectionName = event.path.split('/').pop();
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    if (event.httpMethod === 'GET') {
      const data = await collection.find({}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else if (event.httpMethod === 'POST') {
      const newData = JSON.parse(event.body);
      console.log('Hey!!!!!!!!!')
      console.log(newData);
      const result = await collection.insertOne(newData);
      console.log(result)
      return {
        statusCode: 201,
        body: JSON.stringify(newData),
      };
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request' }),
    };
  }
};