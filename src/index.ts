import 'dotenv/config';
import { YogaInitialContext, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './schema';
import { connectMongo } from './database';
import jwt from 'jsonwebtoken';

const { PORT } = process.env;

connectMongo();

const yoga = createYoga({
  schema,
  context(initicalContext: YogaInitialContext) {
    const { request } = initicalContext;
    const auth = request ? request.headers.get('authorization') : null;
    if (auth && auth.startsWith('Bearer')) {
      const token = auth.split(' ')[1];
      const decodedToken = jwt.verify(token, 'kYK2FZr$B8ytGy^G5T@+');
      return { currentUser: decodedToken };
    }
  },
});
const server = createServer(yoga);

server.listen(PORT, () => {
  console.info(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
