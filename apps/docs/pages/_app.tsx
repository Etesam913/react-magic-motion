import "../styles/globals.css";
import "react-magic-motion/dist/index.css";
import { Fragment_Mono as fragmentMonoFont } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const fragmentMono = fragmentMonoFont({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <>
      {/* eslint-disable-next-line*/}
      <style jsx global>{`
        code {
          font-family: ${fragmentMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
