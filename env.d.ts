namespace NodeJS {
  interface ProcessEnv {
    readonly POKEMON_API: string;
  }
}

namespace ApiResponse {
  type Get<T, Key = keyof T> = Pick<Awaited<ReturnType<T>>, Key>;
}
