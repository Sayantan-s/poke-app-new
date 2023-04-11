import { graphql } from "./__generated__";
import client from "./client";

const GET_POKEMONS = graphql(`
  query GetAllPokemons($perpage: Int!) {
    pokemons(first: $perpage) {
      id
      number
      name
      image
      types
    }
  }
`);

export const getAllPokemons = async (page: number) => {
  return await client.query({
    query: GET_POKEMONS,
    variables: {
      perpage: 20 * page,
    },
  });
};

export const GET_POKEMONS_BY_ID = graphql(`
  query GetSinglePokemon($pokemonId: String, $name: String) {
    pokemon(id: $pokemonId, name: $name) {
      id
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      image
    }
  }
`);
