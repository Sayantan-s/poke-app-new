import { Pokemon } from "@/graphql/__generated__/graphql";
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
    return (
      <div className="flex-1 space-y-3">
        <div className="flex justify-end">
          <button
            onClick={onRevolution}
            className="border border-rose-600 bg-gradient-to-t from-rose-600/70 via-rose-500 to-rose-600/80 transi text-rose-50 px-3 py-1.5 rounded-md transition-transform active:scale-95"
          >
            Evolutions
          </button>
        </div>
        <div className="bg-blue-100 border border-blue-300 p-4 aspect-video rounded-xl flex">
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
            <div className="flex flex-wrap gap-2 mt-2">
              {pokemon?.resistant?.map((resistence) => (
                <div
                  key={resistence}
                  className="bg-blue-200 hover:bg-blue-300/60 inline-block px-2 py-1 rounded-full text-xs text-blue-500 border border-blue-300 space-x-0.5"
                >
                  <span>&#8226;</span>
                  <span>{resistence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-emerald-400 font-medium text-lg">Type</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {pokemon?.types?.map((type) => (
              <div
                key={type}
                className="bg-emerald-50 hover:bg-emerald-100/80 px-2 py-1 rounded-2xl text-xs text-emerald-500 border border-emerald-300 space-x-1 text-center"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-orange-400 font-medium text-lg">Weaknesses</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {pokemon?.weaknesses?.map((weakness) => (
              <div
                key={weakness}
                className="bg-orange-50 hover:bg-orange-100/80 px-2 py-1 rounded-2xl text-xs text-orange-500 border border-orange-300 space-x-1 text-center"
              >
                {weakness}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

PokemonContent.displayName = "Pokemon.Content";
