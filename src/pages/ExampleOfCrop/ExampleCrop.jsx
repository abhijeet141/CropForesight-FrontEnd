import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./ExampleCrop.css";
import CropData from "./CropData";

const CATS = [
  { id: "all", label: "All" },
  { id: "cereal", label: "Cereals" },
  { id: "pulse", label: "Pulses" },
  { id: "fruit", label: "Fruits" },
  { id: "cash", label: "Cash crops" },
];
const CAT_LABEL = { cereal: "Cereal", pulse: "Pulse", fruit: "Fruit", cash: "Cash crop" };

export function ExampleCrop() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CropData.filter(
      (c) =>
        (activeCat === "all" || c.cat === activeCat) &&
        (!q || c.name.toLowerCase().includes(q) || c.note.toLowerCase().includes(q))
    );
  }, [query, activeCat]);

  return (
    <div className="crop-library">
      <div className="wrap">
        <header className="head">
          <Link className="back-link" to="/">← Back to dashboard</Link>
          <span className="eyebrow">Crop library</span>
          <h1>The 22 crops the model <em>knows well</em></h1>
          <p className="head-sub">
            Every crop CropForesight can recommend, with its family and typical
            growing season. Search by name or filter by type.
          </p>
        </header>

        <div className="controls">
          <div className="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search crops…"
              aria-label="Search crops"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filters">
            {CATS.map((c) => (
              <button
                key={c.id}
                className={`filter ${activeCat === c.id ? "active" : ""}`}
                onClick={() => setActiveCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="count">
          Showing {filtered.length} of {CropData.length} crops
        </div>

        <div className="grid">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <div className="card" key={c.name + c.season}>
                <div className="card-top">
                  <div className="badge" aria-hidden="true">{c.emoji}</div>
                  <div>
                    <div className="card-name">{c.name}</div>
                    <span className={`tag ${c.cat}`}>{CAT_LABEL[c.cat]}</span>
                  </div>
                </div>
                <p className="card-note">{c.note}</p>
                <div className="card-foot">
                  <span className="season">🗓️ {c.season}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">
              <span className="big">🌾</span>
              No crops match that search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
