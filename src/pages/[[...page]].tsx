import { HomePageProps } from "@/components/utils/types";
import { HomeView } from "@/components/views";
import { getAllPokemons } from "@/graphql/queries";
import {
  MAX_STATICALLY_GENERATED_PAGES,
  POKEMONS_PER_PAGE,
  pathGenerator,
} from "@/utils";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pokemons,
}) => <HomeView pokemons={pokemons} />;

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

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const [pageParam] = (params?.page || ["1"]) as string[];
  try {
    const { data } = await getAllPokemons(+pageParam);
    const page = +pageParam;
    const paginatedData = data.pokemons?.slice(
      (page - 1) * POKEMONS_PER_PAGE,
      page * POKEMONS_PER_PAGE + 1
    );
    if (!paginatedData?.length) throw "Finished pages!";
    return {
      props: { pokemons: paginatedData },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;
