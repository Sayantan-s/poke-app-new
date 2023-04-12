import { getAllPokemons, getPokemonById } from "@/graphql/queries";

export interface HomePageProps {
  pokemons: Awaited<ReturnType<typeof getAllPokemons>>["data"]["pokemons"];
}

export interface DetailPageProps {
  pokemon: Awaited<ReturnType<typeof getPokemonById>>["data"]["pokemon"];
}
