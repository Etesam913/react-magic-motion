import "./index.css";
export default function AppRow({
  isCardExpanded,
  name,
  desc,
  img,
}: {
  isCardExpanded: boolean;
  name: string;
  desc: string;
  img: string;
}) {
  return (
    <li className="app-row">
      <div className="app-row-flex" style={{ justifyContent: "space-between" }}>
        <div className="app-row-flex">
          <div
            className="app-row-img"
            style={{
              backgroundImage: `url(${img})`,
              minHeight: isCardExpanded ? "64px" : "48px",
              minWidth: isCardExpanded ? "64px" : "48px",
            }}
          />
          <div>
            <h3 className="app-row-header">{name}</h3>
            <p className="app-row-desc">{desc}</p>
          </div>
        </div>

        <button className="app-row-get-button">Get</button>
      </div>
    </li>
  );
}
