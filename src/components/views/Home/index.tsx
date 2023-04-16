import { Page } from "@/components/utils";
import { HomePageProps } from "@/components/utils/types";
import { useRouter } from "next/router";
import { FC } from "react";
import { PokemonCard } from "./components/PokemonCard";

export const HomeView: FC<HomePageProps> = ({ pokemons }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <Page className="flex items-center justify-center w-full h-screen rounded-2xl py-8">
      <div className="grid px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full overflow-scroll">
        {pokemons?.map((pokemon) => (
          <PokemonCard {...pokemon} id={pokemon?.id!} key={pokemon?.id!} />
        ))}
      </div>
    </Page>
  );
};
