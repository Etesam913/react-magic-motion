import Image from "next/image";
export default {
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
  // ... other theme options
};
