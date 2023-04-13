import { Modal } from "@/components/organisms";
import { Loader } from "@/components/utils";
import { PokemonEvolutionQueryVariables } from "@/graphql/__generated__/graphql";
import { GET_POKEMON_EVOLUTIONS } from "@/graphql/schema";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { FC } from "react";

type Props = Required<PokemonEvolutionQueryVariables> &
  Omit<Parameters<typeof Modal>["0"], "children" | "className">;

const PokemonEvolutionModal: FC<Props> = ({
  pokemonId,
  name,
  show,
  ...rest
}) => {
  const { loading, data } = useQuery(GET_POKEMON_EVOLUTIONS, {
    variables: { pokemonId, name },
    skip: !show,
  });

  return (
    <Modal className="w-full max-w-xl sm:max-w-2xl" show={show} {...rest}>
      {loading ? (
        <Loader />
      ) : (
        <figure>
          <figcaption>{name}</figcaption>
          <div>
            {data?.pokemon?.evolutions ? (
              <div className="flex gap-3">
                {data.pokemon.evolutions.map((pokemon) => (
                  <div key={pokemon?.id} className="bg-stone-50 p-4">
                    <div className="relative w-40 aspect-square bg-white rounded-xl">
                      <Image
                        className="object-contain w-full h-full"
                        alt={`pokemon_${pokemon?.id}`}
                        fill
                        sizes="100vw"
                        src={pokemon?.image!}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              "No Evolutions found!"
            )}
          </div>
        </figure>
      )}
    </Modal>
  );
};

export default PokemonEvolutionModal;
