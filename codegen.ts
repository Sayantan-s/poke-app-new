import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env.local") });

const config: CodegenConfig = {
  schema: process.env.POKEMON_API,
  documents: ["./src/graphql/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
