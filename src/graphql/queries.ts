import { MAX_STATICALLY_GENERATED_POKEMONS, POKEMONS_PER_PAGE } from "@/utils";
import { useLazyQuery } from "@apollo/client";
import { PokemonEvolutionQueryVariables } from "./__generated__/graphql";
import client from "./client";
import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_EVOLUTIONS,
} from "./schema";

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

export const getPokemonById = async (pokemonId: string, name: string) => {
  return await client.query({
    query: GET_POKEMON_BY_ID,
    variables: { pokemonId, name },
  });
};

export const useGetPokemonEvolutions = (
  variables: PokemonEvolutionQueryVariables
) => useLazyQuery(GET_POKEMON_EVOLUTIONS, { variables });
