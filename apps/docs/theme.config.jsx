import Image from "next/image";
export default {
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="react-magic-motion" />
      <meta property="og:description" content="react-magic-motion is a react.js library that magically animates your components." />
      <link
        rel="icon"
        type="image/x-icon"
        href="https://react-magic-motion.nyc3.cdn.digitaloceanspaces.com/react-magic-motion-logo.png"
    />
    </>
  ),
  logo: (
    <span style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
      <Image
        alt="react-magic-motion logo"
        height={36}
        width={36}
        src="https://react-magic-motion.nyc3.cdn.digitaloceanspaces.com/react-magic-motion-logo.png"
      />
      <h1 style={{ fontWeight: "bold" }}>react-magic-motion</h1>
    </span>
  ),
  project: {
    link: "https://github.com/etesam913/react-magic-motion",
  },
  docsRepositoryBase: "https://github.com/Etesam913/react-magic-motion/tree/main/apps/docs/",
  useNextSeoProps() {
    return {
      titleTemplate: "%s - react-magic-motion",
    };
  },
  footer: {
    text: (
      <span
        style={{
          display: "flex",
          flex: 1,
          gap: "0.65rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="https://github.com/etesam913/react-magic-motion"
          style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
        >
          <Image
            height={24}
            width={24}
            alt="react-magic-motion-logo"
            src="https://react-magic-motion.nyc3.cdn.digitaloceanspaces.com/react-magic-motion-logo.png"
          />
          react-magic-motion
        </a>
        <span> MIT {new Date().getFullYear()} ©</span>
      </span>
    ),
  },
};
