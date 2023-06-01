import 'dotenv/config';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './schema';
import { connectMongo } from './database';

const { PORT } = process.env;

connectMongo();

const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql 🚀`);
});
