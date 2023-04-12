import { MAX_STATICALLY_GENERATED_POKEMONS, POKEMONS_PER_PAGE } from "@/utils";
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
      perpage: POKEMONS_PER_PAGE * page,
    },
  });
};

export const getAllStaticallyGeneratedPokemons = async () => {
  return await client.query({
    query: GET_POKEMONS,
    variables: {
      perpage: MAX_STATICALLY_GENERATED_POKEMONS,
    },
  });
};

const GET_POKEMON_BY_ID = graphql(`
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

export const getPokemonById = async (pokemonId: string, name: string) => {
  return await client.query({
    query: GET_POKEMON_BY_ID,
    variables: { pokemonId, name },
  });
};
