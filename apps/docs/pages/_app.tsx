import "../styles/globals.css";
import { Fragment_Mono } from "next/font/google";

const fragmentMono = Fragment_Mono({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <>
      <style jsx global>{`
        code {
          font-family: ${fragmentMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
