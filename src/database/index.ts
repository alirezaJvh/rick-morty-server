import { connectMongo } from './mongodb';
import { connectRedis } from './redis';

const connectDatabase = async () => {
  try {
    const dbClients = await Promise.all([connectRedis(), connectMongo()]);
    const redisClient = dbClients[0];
    return redisClient;
  } catch (e) {
    console.log(e);
  }
};

export { connectDatabase };
