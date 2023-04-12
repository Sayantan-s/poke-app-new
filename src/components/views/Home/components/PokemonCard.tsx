import { GetAllPokemonsQuery } from "@/graphql/__generated__/graphql";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const PokemonCard: FC<
  NonNullable<GetAllPokemonsQuery["pokemons"]>[number]
> = (pokemon) => {
  return (
    <div className="bg-stone-50 rounded-lg p-3 border border-stone-200/80 hover:bg-slate-100/70">
      <div className="w-full aspect-square">
        <Link
          href={`/details/${`${pokemon?.id}&name=${pokemon?.name}`}`}
          key={pokemon?.id}
        >
          <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
            <Image
              className="object-contain"
              alt={`pokemon_${pokemon?.id}`}
              fill
              sizes="100vw"
              src={pokemon?.image!}
            />
          </div>
        </Link>
      </div>
      <div className="px-2 pt-3">
        <div>
          <h1 className="font-semibold text-stone-500/80">
            #{pokemon?.number}
          </h1>
          <p className="font-medium text-xl mt-3">{pokemon?.name}</p>
        </div>
        <div className="mt-1.5 space-x-2">
          {pokemon?.types?.map((type) => (
            <div
              className="inline-block bg-emerald-100 border border-emerald-200 text-emerald-600 px-3 py-1 rounded-md text-xs"
              key={type}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
