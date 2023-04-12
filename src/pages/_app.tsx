import { withLayout } from "@/components/layouts";
import client from "@/graphql/client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { PageConfig } from "next";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Fragment } from "react";

const font = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
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
};

export default withLayout(App);

export const config: PageConfig = {
  runtime: "experimental-edge",
};
