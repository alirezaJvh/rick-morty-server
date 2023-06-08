import { Query, QueryCharactersArgs } from '../types';
import fetch from 'node-fetch';

const URL = 'https://rickandmortyapi.com/graphql';

const query = {
  async characters(_parent: Query, args: QueryCharactersArgs, { params }: any) {
    console.log('call to characters');
    const { query, variables } = params;
    const dataString = JSON.stringify({ query, variables });
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataString,
    });
    const { data } = await res.json();
    return data.characters;
  },
};

export { query };
