import { Tags } from "@/components/organisms/TagGroup";
import { Pokemon } from "@/graphql/__generated__/graphql";
import { useRouter } from "next/router";
import { FC, MouseEventHandler, memo } from "react";

interface Props
  extends Pick<
    Pokemon,
    | "height"
    | "classification"
    | "weight"
    | "weaknesses"
    | "resistant"
    | "types"
  > {
  onRevolution: MouseEventHandler<HTMLButtonElement>;
}

export const PokemonContent: FC<Props> = memo(
  ({ onRevolution, ...pokemon }) => {
    const router = useRouter();

    const goBack = () => {
      router.replace("/");
    };

    return (
      <div className="flex-1 sm:flex-auto lg:flex-1 space-y-3">
        <div className="flex justify-between items-center gap-3">
          <button
            className="h-full aspect-square rounded-full"
            title="go to home page"
            onClick={goBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-indigo-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={onRevolution}
            className="border w-full sm:w-auto border-rose-600 bg-gradient-to-t from-rose-600/70 via-rose-500 to-rose-600/80 transi text-rose-50 px-3 py-1.5 rounded-md transition-transform active:scale-95"
          >
            Evolutions
          </button>
        </div>
        <div className="flex flex-col space-x-0 sm:flex-row sm:space-x-4 lg:space-x-0 lg:flex-col">
          <div className="bg-blue-100 border border-blue-300 p-4 sm:aspect-video rounded-xl flex">
            <div className="space-y-3 flex flex-col flex-1">
              <div className="flex-1">
                <h1 className="text-blue-500">Classification</h1>
                <p className="text-blue-900 font-medium text-lg mt-2">
                  {pokemon?.classification}
                </p>
              </div>
              <div className="flex-1">
                <h1 className="text-blue-500">Height</h1>
                <p className="text-blue-900 font-medium text-lg mt-2">
                  {pokemon?.height?.minimum} - {pokemon?.height?.maximum}
                </p>
              </div>
              <div className="flex-1">
                <h1 className="text-blue-500">Weight</h1>
                <p className="text-blue-900 font-medium text-lg mt-2">
                  {pokemon?.weight?.minimum} - {pokemon?.weight?.maximum}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-blue-500">Resistence</h1>
              <Tags className="gap-2 mt-3" tagsData={pokemon?.resistant!}>
                {(resistence) => (
                  <Tags.Tag
                    key={resistence}
                    className="bg-blue-200 hover:bg-blue-300/60 inline-block px-2 py-1 rounded-full text-xs text-blue-500 border border-blue-300"
                  >
                    <span>&#8226;</span>
                    <span>{resistence}</span>
                  </Tags.Tag>
                )}
              </Tags>
            </div>
          </div>
          <div className="mt-3 space-y-3">
            <div>
              <h1 className="text-emerald-400 font-medium text-lg">Type</h1>
              <Tags className="gap-2 mt-3" tagsData={pokemon.types!}>
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
            <div>
              <h1 className="text-orange-400 font-medium text-lg">
                Weaknesses
              </h1>
              <Tags className="gap-2 mt-3" tagsData={pokemon.weaknesses!}>
                {(weakness) => (
                  <Tags.Tag
                    key={weakness}
                    className="bg-orange-50 hover:bg-orange-100/80 px-2 py-1 rounded-2xl text-xs text-orange-500 border border-orange-300 "
                  >
                    {weakness}
                  </Tags.Tag>
                )}
              </Tags>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PokemonContent.displayName = "Pokemon.Content";
