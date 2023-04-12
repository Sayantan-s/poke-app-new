import { Page } from "@/components/utils";
import { DetailPageProps } from "@/components/utils/types";
import { useRouter } from "next/router";
import { FC } from "react";

export const DetailsView: FC<DetailPageProps> = ({ pokemon }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  const title = pokemon?.name ? { title: pokemon.name.toLowerCase() } : {};

  return <Page {...title}>{pokemon?.name}</Page>;
};
