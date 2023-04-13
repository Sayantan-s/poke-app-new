import { Modal } from "@/components/organisms";
import { Tags } from "@/components/organisms/TagGroup";
import { Loader } from "@/components/utils";
import { Pokemon } from "@/graphql/__generated__/graphql";
import { GET_POKEMON_EVOLUTIONS } from "@/graphql/schema";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { FC, Fragment } from "react";

type Props = Required<
  Pick<Pokemon, "name" | "image" | "id" | "number" | "types">
> &
  Omit<Parameters<typeof Modal>["0"], "children" | "className">;

const PokemonEvolutionModal: FC<Props> = ({ show, onHide, ...pokeFields }) => {
  const { loading, data } = useQuery(GET_POKEMON_EVOLUTIONS, {
    variables: { pokemonId: pokeFields.id, name: pokeFields.name },
    skip: !show,
  });

  return (
    <Modal className="w-full max-w-xl sm:max-w-3xl" show={show} onHide={onHide}>
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      ) : (
        <figure className="h-full">
          <figcaption className="text-lg text-stone-700 font-semibold">
            Evolutions
          </figcaption>
          <div className="overflow-x-auto pb-6 pt-1 h-full">
            {data?.pokemon?.evolutions ? (
              <div className="flex items-center gap-3 h-full">
                {[pokeFields, ...data.pokemon.evolutions].map(
                  (pokemon, index) => (
                    <Fragment key={pokemon?.id}>
                      {index > 0 ? (
                        <div>
                          <svg
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 text-stone-400 stroke-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </div>
                      ) : null}
                      <div className="text-center">
                        <div className="bg-stone-50 w-48 rounded-full p-4 shadow-md">
                          <div className="relative aspect-square bg-white rounded-full overflow-hidden">
                            <Image
                              className="object-contain"
                              alt={`pokemon_${pokemon?.id}`}
                              fill
                              sizes="100vw"
                              src={pokemon?.image!}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <h1 className="font-semibold text-stone-800">
                            {pokemon?.name}
                          </h1>{" "}
                          <p className="font-semibold text-stone-500/80 mt-2">
                            #{pokemon?.number}
                          </p>{" "}
                          <Tags
                            tagsData={pokemon?.types!}
                            className="justify-center gap-2 mt-3"
                          >
                            {(type) => (
                              <Tags.Tag
                                key={type}
                                className="bg-emerald-50 hover:bg-emerald-100/80 px-2 py-1 rounded-2xl text-xs text-emerald-500 border border-emerald-300"
                              >
                                {type}
                              </Tags.Tag>
                            )}
                          </Tags>
                        </div>
                      </div>
                    </Fragment>
                  )
                )}
              </div>
            ) : (
              <div className="bg-rose-50 h-full rounded-xl flex items-center justify-center border border-red-300">
                <p className="text-rose-500 text-lg font-medium">
                  No Evolutions found!
                </p>
              </div>
            )}
          </div>
        </figure>
      )}
    </Modal>
  );
};

export default PokemonEvolutionModal;
