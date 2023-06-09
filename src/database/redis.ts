import { createClient } from 'redis';

const connectRedis = async () => {
  const redisClient = createClient();

  redisClient.on('error', (error: string) => console.error(`Error : ${error}`));
  redisClient.on('ready', () => console.log('Redis is running'));
  await redisClient.connect();
  return redisClient;
};

export { connectRedis };
