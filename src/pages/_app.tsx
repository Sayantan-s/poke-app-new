import client from "@/graphql/client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Fragment } from "react";

const font = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <style jsx global>
        {`
          :root {
            --font-inter: ${font.style.fontFamily};
          }
        `}
      </style>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Fragment>
  );
}
