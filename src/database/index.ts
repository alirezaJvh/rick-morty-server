import { RedisClientType } from 'redis';
import { connectMongo } from './mongodb';
import { connectRedis } from './redis';

const connectDatabase = async (): Promise<any> => {
  try {
    const dbClients = await Promise.all([connectRedis(), connectMongo()]);
    const redisClient = dbClients[0];
    return redisClient as RedisClientType;
  } catch (e) {
    console.log(e);
  }
};

export { connectDatabase };
