import { Page } from "@/components/utils";
import { getAllPokemons } from "@/graphql/queries";
import { MAX_STATICALLY_GENERATED_PAGES, pathGenerator } from "@/utils";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface StaticProps {
  pokemons: Awaited<ReturnType<typeof getAllPokemons>>["data"]["pokemons"];
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pokemons,
}) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <Page>
      <div>
        {pokemons?.map((pokemon) => (
          <Link
            href={`/details/${`${pokemon?.id}&name=${pokemon?.name}`}`}
            key={pokemon?.id}
          >
            {pokemon?.name}
          </Link>
        ))}
      </div>
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: pathGenerator(
      MAX_STATICALLY_GENERATED_PAGES + 1,
      "page",
      (_, index) => (index > 0 ? [index.toString()] : [])
    ),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const [pageParam] = (params?.page || ["1"]) as string[];
  try {
    const { data } = await getAllPokemons(+pageParam);
    const page = +pageParam;
    return {
      props: { pokemons: data.pokemons?.slice(page - 1 * 20, page * 20) },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;
