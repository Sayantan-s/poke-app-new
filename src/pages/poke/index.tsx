import { Page } from "@/components/utils";
import { getAllPokemons } from "@/graphql/queries";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  return <Page>HELLO POKEMON</Page>;
};

export const getStaticProps: GetStaticProps<
  ApiResponse.Get<typeof getAllPokemons, "data">
> = async (args) => {
  console.log(args);

  try {
    const { data } = await getAllPokemons(1);
    return {
      props: { data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;
