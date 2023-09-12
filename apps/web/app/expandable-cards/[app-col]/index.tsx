import "./index.css";
export default function AppCol({
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
    <li className="app-col">
      <div className="app-col-flex">
        <div className="app-col-flex">
          <div
            className="app-row-img"
            style={{
              backgroundImage: `url(${img})`,
              minHeight: isCardExpanded ? "64px" : "48px",
              maxWidth: isCardExpanded ? "64px" : "48px",
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
