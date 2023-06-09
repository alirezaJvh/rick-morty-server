import { GraphQLParams } from 'graphql-yoga';
import { RedisClientType } from 'redis';
import { Characters, Query, QueryCharactersArgs } from '../types';
import fetch from 'node-fetch';
import { GraphQLContext } from '../context';

const query = {
  async characters(
    _parent: Query,
    _args: QueryCharactersArgs,
    { params, cache, redisClient }: GraphQLContext,
  ) {
    console.log('call characters query');
    const { query, variables } = params;
    const isCache = false;
    if (cache) return cache.characters;

    const dataString = JSON.stringify({ query, variables });
    console.log(isCache);
    const data = await requestAPI(dataString);
    await makeCache(redisClient, data, params);
    return data.characters;
  },
};

const requestAPI = async (body: string) => {
  const URL = 'https://rickandmortyapi.com/graphql';
  const res = await fetch(URL, {
    body,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const { data } = await res.json();
  return data;
};

const makeCache = async (
  redisClient: RedisClientType,
  data: { characters: Characters },
  { operationName, variables }: GraphQLParams,
) => {
  const redisKey = `${operationName}:${variables?.page}`;
  await redisClient.set(redisKey, JSON.stringify(data), {
    EX: 600,
    NX: true,
  });
};

export { query };
