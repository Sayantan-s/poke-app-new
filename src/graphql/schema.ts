import { graphql } from "./__generated__";

export const GET_POKEMONS = graphql(`
  query Pokemons($perpage: Int!) {
    pokemons(first: $perpage) {
      id
      number
      name
      image
      types
    }
  }
`);

export const GET_POKEMON_BY_ID = graphql(`
  query Pokemon($pokemonId: String, $name: String) {
    pokemon(id: $pokemonId, name: $name) {
      id
      name
      types
      image
      number
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      resistant
      weaknesses
    }
  }
`);

export const GET_POKEMON_EVOLUTIONS = graphql(`
  query PokemonEvolution($pokemonId: String, $name: String) {
    pokemon(id: $pokemonId, name: $name) {
      evolutions {
        id
        name
        types
        image
        number
      }
    }
  }
`);
