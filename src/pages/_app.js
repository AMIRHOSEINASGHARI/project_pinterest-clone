//* Global CSS
import "@/styles/globals.css";
//* Next-Auth
import { SessionProvider } from "next-auth/react";
//* Components
import { Layout } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <div className="mt-24">
          <Component {...pageProps} />
        </div>
      </Layout>
    </SessionProvider>
  );
}
