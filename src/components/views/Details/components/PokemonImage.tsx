import { Pokemon } from "@/graphql/__generated__/graphql";
import Image from "next/image";
import { FC, memo } from "react";

type Props = Pick<Pokemon, "id" | "image">;

export const PokemonImage: FC<Props> = memo((pokemon) => {
  return (
    <div className="w-full aspect-video lg:aspect-square flex-1 bg-stone-50 p-4 rounded-xl">
      <div className="relative w-full h-full bg-white rounded-xl">
        <Image
          className="object-contain"
          alt={`pokemon_${pokemon.id}`}
          fill
          sizes="100vw"
          src={pokemon.image!}
        />
      </div>
    </div>
  );
});

PokemonImage.displayName = "Pokemon.Image";
