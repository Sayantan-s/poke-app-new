import { Page } from "@/components/utils";
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
import { useRouter } from "next/router";

interface Props {
  pokemon: Awaited<ReturnType<typeof getPokemonById>>["data"]["pokemon"];
}

const PokemonDetails: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ pokemon }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return <Page>{pokemon?.name}</Page>;
};

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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const [id, name] = (params?.pokemon as string).split("&name=");
    const { data } = await getPokemonById(id, name);
    return {
      props: { pokemon: data.pokemon },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default PokemonDetails;
