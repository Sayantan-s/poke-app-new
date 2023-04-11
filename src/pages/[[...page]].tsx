import { Page } from "@/components/utils";
import { getAllPokemons } from "@/graphql/queries";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const MAX_STATICALLY_GENERATED_PAGES = 3;

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <Page>
      {new Array(MAX_STATICALLY_GENERATED_PAGES + 2)
        .fill(true)
        .map((_, index) => (
          <Link href={`/${index + 1}`} key={index}>
            {index + 1}
          </Link>
        ))}
      <div>{JSON.stringify(props)}</div>
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data } = await getAllPokemons(MAX_STATICALLY_GENERATED_PAGES);
  return {
    paths: new Array(3)
      .fill(true)
      .map((_, index) => ({ params: { page: [(index + 1).toString()] } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  ApiResponse.Get<typeof getAllPokemons, "data">
> = async ({ params }) => {
  const [pageParam] = (params?.page || ["1"]) as string[];
  try {
    const { data } = await getAllPokemons(+pageParam);
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
