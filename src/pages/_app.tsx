import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Cursor from "@/components/Cursor";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Cursor />
      <Component {...pageProps} />
    </>
  );
}
