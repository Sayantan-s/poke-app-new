export const MAX_STATICALLY_GENERATED_PAGES = 3;
export const MAX_STATICALLY_GENERATED_POKEMONS = 20;
export const POKEMONS_PER_PAGE = 20;

export const pathGenerator = <TData>(
  limitPayload: number | TData[],
  key: string,
  callback: (item: TData | number, index: number) => string | string[]
) => {
  let limit: number[] | TData[];
  if (typeof limitPayload === "number")
    limit = new Array(limitPayload).fill(true);
  else limit = limitPayload;
  return limit.map((item, index) => ({
    params: { [key]: callback(item, index) }, // hof to implement DRY.
  }));
};

export const isClientSide = () => typeof window !== "undefined";
