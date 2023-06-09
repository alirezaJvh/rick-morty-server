import 'dotenv/config';
import { YogaInitialContext, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './schema';
import { createContext } from './context';
import { connectDatabase } from './database';

const { PORT } = process.env;

(async () => {
  const redisClient = await connectDatabase();
  const context = createContext(redisClient);
  const yoga = createYoga({ schema, context });
  const server = createServer(yoga);

  server.listen(PORT, () => {
    console.info(`🚀 Server is running on http://localhost:${PORT}/graphql`);
  });
})();
