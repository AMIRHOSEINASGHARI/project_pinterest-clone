//* Global CSS
import "@/styles/globals.css";
//* Next
import Head from "next/head";
//* Next-Auth
import { SessionProvider } from "next-auth/react";
//* Components
import { Layout } from "@/components";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Pinterest</title>
        </Head>
        <Layout>
          <div className="mt-24">
            <Component {...pageProps} />
          </div>
          <Toaster />
        </Layout>
      </SessionProvider>
    </>
  );
}
