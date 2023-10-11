import "../styles/globals.css";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  style: "normal",
  weight: ["400", "700"],
  subsets: ["latin"],
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <>
      <style jsx global>{`
        code {
          font-family: ${spaceMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
