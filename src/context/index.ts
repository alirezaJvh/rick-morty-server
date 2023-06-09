import { GraphQLParams, YogaInitialContext } from 'graphql-yoga';
import jwt from 'jsonwebtoken';
import { RedisClientType } from 'redis';

const { PRIVATE_KEY } = process.env;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface GraphQLContext extends YogaInitialContext {
  redisClient: RedisClientType;
  cache: any;
  currentUser: any;
}

const createContext = (redisClient: RedisClientType | undefined) => {
  if (!redisClient) throw new Error('redisClient is not provided');
  return context(redisClient);
};

const checkUser = (request: Request) => {
  const auth = request ? request.headers.get('authorization') : null;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    const decodedToken = jwt.verify(token, PRIVATE_KEY!);
    return decodedToken;
  }
};

const checkCache = async (params: GraphQLParams, redisClient: RedisClientType) => {
  if (params.operationName === 'Characters' && redisClient) {
    const redisKey = `${params.operationName}:${params.variables?.page}`;
    const jsonCache = await redisClient.get(redisKey);
    return jsonCache !== null ? JSON.parse(jsonCache) : undefined;
  }
};

const context =
  (redisClient: RedisClientType) =>
  async (initicalContext: YogaInitialContext): Promise<GraphQLContext> => {
    const { request, params } = initicalContext;
    const cache = await checkCache(params, redisClient);
    const currentUser = checkUser(request);
    return { ...initicalContext, currentUser, cache, redisClient };
  };

export { createContext, GraphQLContext };
