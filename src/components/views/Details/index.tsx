import { Page } from "@/components/utils";
import { DetailPageProps } from "@/components/utils/types";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { PokemonContent } from "./components/PokemonContent";
import PokemonEvolutionModal from "./components/PokemonEvolutionModal";
import { PokemonImage } from "./components/PokemonImage";

export const DetailsView: FC<DetailPageProps> = ({ pokemon }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const { image, id, name, ...rest } = pokemon!;

  const handleShow = useCallback(async () => {
    setShow(true);
  }, []);

  const title = pokemon?.name ? { title: pokemon.name.toLowerCase() } : {};

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <Page {...title} className="h-full w-full relative">
      <div className="absolute w-full transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 p-4 rounded-lg overflow-hidden">
        <h1 className="text-4xl font-semibold text-center mb-10">
          {pokemon?.name}
        </h1>{" "}
        {/* Not included the pokemon number as it is not mentioned in the requirements */}
        <div className="flex space-x-4 p-4 rounded-lg w-full">
          <PokemonImage image={pokemon?.image} id={pokemon?.id!} />
          <PokemonContent {...rest} onRevolution={handleShow} />
        </div>
      </div>
      <PokemonEvolutionModal
        types={pokemon?.types!}
        id={pokemon?.id!}
        name={pokemon?.name!}
        number={pokemon?.number!}
        image={pokemon?.image!}
        show={show}
        onHide={() => {
          setShow(false);
        }}
      />
    </Page>
  );
};
