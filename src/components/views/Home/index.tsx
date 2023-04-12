import { Page } from "@/components/utils";
import { HomePageProps } from "@/components/utils/types";
import { MAX_STATICALLY_GENERATED_PAGES } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { PokemonCard } from "./components/PokemonCard";

export const HomeView: FC<HomePageProps> = ({ pokemons }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <Page className="flex items-center justify-center w-full h-screen rounded-2xl">
      <div>
        {new Array(MAX_STATICALLY_GENERATED_PAGES + 4)
          .fill(true)
          .map((_, index) => (
            <Link key={index} href={`${index + 1}`}>
              {index + 1}
            </Link>
          ))}
      </div>
      <div className="grid grid-cols-4 gap-4 w-full h-[600px] overflow-scroll">
        {pokemons?.map((pokemon) => (
          <PokemonCard {...pokemon} id={pokemon?.id!} key={pokemon?.id!} />
        ))}
      </div>
    </Page>
  );
};
