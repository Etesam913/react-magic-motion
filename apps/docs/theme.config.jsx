export default {
  logo: (
    <span style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
      <img
        style={{ height: 36, width: 36 }}
        src="https://react-motionize.nyc3.cdn.digitaloceanspaces.com/react-motionize-logo.png"
      />
      <h1 style={{ fontWeight: "bold" }}>react-motionize</h1>
    </span>
  ),
  project: {
    link: "https://github.com/etesam913/react-motionize",
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
          href="https://github.com/etesam913/react-motionize"
          target="_blank"
          style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
        >
          <img
            style={{ height: 24, width: 24 }}
            src="https://react-motionize.nyc3.cdn.digitaloceanspaces.com/react-motionize-logo.png"
          />
          react-motionize
        </a>
        <span> MIT {new Date().getFullYear()} ©</span>
      </span>
    ),
  },
  // ... other theme options
};
