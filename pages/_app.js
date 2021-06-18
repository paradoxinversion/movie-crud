import { Provider } from "next-auth/client";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
