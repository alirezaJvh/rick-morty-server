import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './schema';
import 'dotenv/config';

const { PORT } = process.env;

const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql 🚀`);
});
