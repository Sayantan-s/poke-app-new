import type { DetailPageProps } from "@/components/utils/types";
import { DetailsView } from "@/components/views";
import {
  getAllStaticallyGeneratedPokemons,
  getPokemonById,
} from "@/graphql/queries";
import { pathGenerator } from "@/utils";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

const PokemonDetails: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ pokemon }) => <DetailsView pokemon={pokemon} />;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getAllStaticallyGeneratedPokemons();
  return {
    paths: Array.isArray(data.pokemons)
      ? pathGenerator(data.pokemons, "pokemon", (poke) =>
          typeof poke !== "number" && poke !== null
            ? `${poke?.id}&name=${poke?.name}`
            : ""
        )
      : [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<DetailPageProps> = async ({
  params,
}) => {
  try {
    const [id, name] = (params?.pokemon as string).split("&name=");
    const { data } = await getPokemonById(id, name);
    if (!data.pokemon) throw new Error("Pokemon not found!");
    return {
      props: { pokemon: data.pokemon },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default PokemonDetails;
