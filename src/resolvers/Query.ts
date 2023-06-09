import { Query, QueryCharactersArgs } from '../types';
import fetch from 'node-fetch';

const URL = 'https://rickandmortyapi.com/graphql';

const query = {
  async characters(_parent: Query, args: QueryCharactersArgs, context: any) {
    const { params, cache, redisClient } = context;
    const { query, variables, operationName } = params;
    const isCache = false;
    if (cache) return cache.characters;

    const dataString = JSON.stringify({ query, variables });
    console.log(isCache);
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataString,
    });
    const { data } = await res.json();
    const redisKey = `${operationName}:${params.variables?.page}`;
    await redisClient.set(redisKey, JSON.stringify(data));
    return data.characters;
  },
};

export { query };
