import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./FormComponent.css";

const PARAMS = [
  { key: "nitrogen", label: "Nitrogen", sym: "N", unit: "ppm", icon: "🌱", sliderMin: 0, sliderMax: 140, step: 1, def: 80, group: "nutrients", validMin: 0, validMax: 1000 },
  { key: "phosphorus", label: "Phosphorus", sym: "P", unit: "ppm", icon: "🧪", sliderMin: 0, sliderMax: 145, step: 1, def: 45, group: "nutrients", validMin: 0, validMax: 1000 },
  { key: "potassium", label: "Potassium", sym: "K", unit: "ppm", icon: "🪨", sliderMin: 0, sliderMax: 205, step: 1, def: 45, group: "nutrients", validMin: 0, validMax: 1000 },
  { key: "temperature", label: "Temperature", sym: "", unit: "°C", icon: "🌡️", sliderMin: 0, sliderMax: 50, step: 1, def: 25, group: "climate", validMin: -50, validMax: 50 },
  { key: "humidity", label: "Humidity", sym: "", unit: "%", icon: "💧", sliderMin: 0, sliderMax: 100, step: 1, def: 70, group: "climate", validMin: 0, validMax: 100 },
  { key: "rainfall", label: "Rainfall", sym: "", unit: "mm", icon: "🌧️", sliderMin: 0, sliderMax: 300, step: 1, def: 110, group: "climate", validMin: 0, validMax: 1000 },
  { key: "ph", label: "Soil pH", sym: "", unit: "pH", icon: "⚗️", sliderMin: 0, sliderMax: 14, step: 0.1, def: 6.5, group: "chem", validMin: 0, validMax: 14 },
];

const GROUPS = [
  { id: "nutrients", title: "Soil nutrients" },
  { id: "climate", title: "Climate" },
  { id: "chem", title: "Soil chemistry" },
];

const SAMPLE = { nitrogen: 90, phosphorus: 42, potassium: 43, temperature: 21, humidity: 82, ph: 6.5, rainfall: 203 };

const CROPS = {
  rice: { emoji: "🌾", blurb: "Thrives in warm fields with heavy rainfall." },
  maize: { emoji: "🌽", blurb: "Balanced soil and steady moisture suit it well." },
  chickpea: { emoji: "🫘", blurb: "Prefers drier, low-nitrogen ground." },
  kidneybeans: { emoji: "🫘", blurb: "Likes warm soil with moderate rainfall." },
  pigeonpeas: { emoji: "🌱", blurb: "Hardy across semi-arid fields." },
  mothbeans: { emoji: "🌱", blurb: "Drought-tolerant and undemanding." },
  mungbean: { emoji: "🌱", blurb: "Quick-growing in warm conditions." },
  blackgram: { emoji: "🌱", blurb: "Warm, moderately moist soil is ideal." },
  lentil: { emoji: "🫘", blurb: "Cool, dry, well-drained ground suits it." },
  pomegranate: { emoji: "🍎", blurb: "Tolerates dry heat and varied soils." },
  banana: { emoji: "🍌", blurb: "Rich nitrogen and good moisture favour it." },
  mango: { emoji: "🥭", blurb: "Warm climate with a dry spell before flowering." },
  grapes: { emoji: "🍇", blurb: "Warm, dry seasons give the best fruit." },
  watermelon: { emoji: "🍉", blurb: "Warm soil and steady water during growth." },
  muskmelon: { emoji: "🍈", blurb: "Warm, sunny conditions with moderate water." },
  apple: { emoji: "🍎", blurb: "Cool temperatures suit orchard crops like apple." },
  orange: { emoji: "🍊", blurb: "Mild climate with well-drained soil." },
  papaya: { emoji: "🥭", blurb: "Warm, frost-free conditions year round." },
  coconut: { emoji: "🥥", blurb: "Coastal warmth and reliable moisture." },
  cotton: { emoji: "🧶", blurb: "Low rain and high heat point to cotton." },
  jute: { emoji: "🧵", blurb: "Warm, humid conditions with good rainfall." },
  coffee: { emoji: "☕", blurb: "Acidic soil with steady rain favours coffee." },
};

const NOTES = [
  "No soil card? Use ⚡ Sample values to load a realistic field, then tweak from there.",
  "N, P and K are your soil's nitrogen, phosphorus and potassium — straight from a soil health card.",
  "Most crops sit happiest between pH 6.0 and 7.5. Test before you amend.",
  "Rainfall here means the seasonal total your field receives, in millimetres.",
];

function cropInfo(name) {
  const key = String(name).toLowerCase().replace(/[\s_-]/g, "");
  return CROPS[key] || { emoji: "🌾", blurb: "Your strongest match across all seven readings." };
}

const initialValues = () =>
  PARAMS.reduce((acc, p) => ({ ...acc, [p.key]: String(p.def) }), {});

function validate(values) {
  for (const p of PARAMS) {
    const raw = values[p.key];
    if (raw === "" || raw === null) {
      return `*${p.label} is required!`;
    }
    const num = Number(raw);
    if (isNaN(num) || num < p.validMin || num > p.validMax) {
      const unit = p.unit === "pH" ? "" : ` ${p.unit}`;
      return `*Invalid ${p.label} (should be between ${p.validMin} and ${p.validMax}${unit})`;
    }
  }
  return "";
}

export function FormComponent() {
  const location = useLocation();
  // values carried over from the Weather page ("Use these readings")
  const prefill = location.state?.prefill;
  const carriedKeys = prefill
    ? PARAMS.filter((p) => prefill[p.key] != null && prefill[p.key] !== "").map((p) => p.key)
    : [];

  const [values, setValues] = useState(() => {
    const base = initialValues();
    for (const key of carriedKeys) base[key] = String(prefill[key]);
    return base;
  });
  const [status, setStatus] = useState("idle"); // idle | scanning | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [reveal, setReveal] = useState(0); // bump to replay badge animation
  const [showCarry, setShowCarry] = useState(carriedKeys.length > 0);

  const cardRef = useRef(null);
  const frameRef = useRef(0);

  const fillFor = (p) => {
    const v = parseFloat(values[p.key]);
    if (isNaN(v)) return "0%";
    const pct = ((v - p.sliderMin) / (p.sliderMax - p.sliderMin)) * 100;
    return `${Math.max(0, Math.min(100, pct))}%`;
  };

  const setVal = (key, v) => setValues((prev) => ({ ...prev, [key]: v }));

  const loadValues = (src) =>
    setValues(PARAMS.reduce((acc, p) => ({ ...acc, [p.key]: String(src[p.key]) }), {}));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = validate(values);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStatus("scanning");
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_ML}/predict`, {
        nitrogen: Math.round(Number(values.nitrogen)),
        phosphorus: Math.round(Number(values.phosphorus)),
        potassium: Math.round(Number(values.potassium)),
        temperature: Math.round(Number(values.temperature)),
        humidity: Math.round(Number(values.humidity)),
        ph: Math.round(Number(values.ph)),
        rainfall: Math.round(Number(values.rainfall)),
      });
      if (data && data.result) {
        setResult({ name: data.result, ...cropInfo(data.result), readings: { ...values } });
        setReveal((r) => r + 1);
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      el.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
      el.classList.add("tilting");
    });
  };
  const handlePointerLeave = () => {
    cancelAnimationFrame(frameRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    el.classList.remove("tilting");
  };

  return (
    <div className="soil-test">
      <div className="wrap">
        <header className="test-head">
          <Link className="back-link" to="/">← Back to dashboard</Link>
          <div>
            <span className="eyebrow">Soil in · Crop out</span>
          </div>
          <h1>Run a <em>soil test</em></h1>
          <p className="head-sub">
            Dial in your field's seven readings — drag the sliders or type exact
            values from your soil health card. The model matches your soil
            against 22 crop signatures.
          </p>
        </header>

        <div className="test-grid">
          <div className="form-card">
            <div className="form-card-head">
              <h2>Soil sample</h2>
              <div className="form-tools">
                <button type="button" className="chip-btn" onClick={() => loadValues(SAMPLE)}>
                  ⚡ Sample values
                </button>
                <button
                  type="button"
                  className="chip-btn"
                  onClick={() => {
                    loadValues(PARAMS.reduce((a, p) => ({ ...a, [p.key]: p.def }), {}));
                    setStatus("idle");
                    setError("");
                  }}
                >
                  ↺ Reset
                </button>
              </div>
            </div>

            <form className="form-card-body" onSubmit={handleSubmit}>
              {showCarry && carriedKeys.length > 0 && (
                <div className="prefill-note">
                  <span className="pf-ico" aria-hidden="true">🌤️</span>
                  <span className="pf-text">
                    Filled from live weather:{" "}
                    {carriedKeys
                      .map((key) => {
                        const p = PARAMS.find((x) => x.key === key);
                        const unit = p.unit === "pH" ? "" : p.unit;
                        return `${p.label} ${prefill[key]}${unit}`;
                      })
                      .join(" · ")}
                  </span>
                  <button
                    type="button"
                    className="pf-x"
                    aria-label="Dismiss"
                    onClick={() => setShowCarry(false)}
                  >
                    ×
                  </button>
                </div>
              )}
              {error && <div className="form-error">{error}</div>}
              {GROUPS.map((g) => (
                <div className="group" key={g.id}>
                  <div className="group-title">{g.title}</div>
                  <div className="param-grid">
                    {PARAMS.filter((p) => p.group === g.id).map((p) => (
                      <div className={`param ${g.id === "chem" ? "full" : ""}`} key={p.key}>
                        <div className="param-top">
                          <label htmlFor={`r-${p.key}`}>
                            <span className="p-icon" aria-hidden="true">{p.icon}</span>
                            {p.label}
                            {p.sym && <span className="p-sym">{p.sym}</span>}
                            {carriedKeys.includes(p.key) && (
                              <span className="p-wx" title="From live weather" aria-hidden="true">🌤️</span>
                            )}
                          </label>
                          <div className="p-input">
                            <input
                              type="number"
                              aria-label={p.label}
                              min={p.validMin}
                              max={p.validMax}
                              step={p.step}
                              value={values[p.key]}
                              onChange={(e) => setVal(p.key, e.target.value)}
                            />
                            <span className="p-unit">{p.unit}</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          id={`r-${p.key}`}
                          min={p.sliderMin}
                          max={p.sliderMax}
                          step={p.step}
                          value={values[p.key] === "" ? p.sliderMin : values[p.key]}
                          style={{ "--fill": fillFor(p) }}
                          onChange={(e) => setVal(p.key, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </form>

            <div className="form-card-foot">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={status === "scanning"}
              >
                {status === "scanning" ? "Reading your soil…" : (
                  <>Recommend crop <span className="arr">→</span></>
                )}
              </button>
              <span className="foot-hint">Free · runs in ~2 seconds</span>
            </div>
          </div>

          <aside className="test-side">
            <div className="result-scene">
              <div
                className="result-card"
                ref={cardRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                <span className="result-tag">live result</span>

                {status === "idle" && (
                  <div className="result-empty">
                    <span className="empty-seed">🌱</span>
                    <p>Set your readings and hit <strong>Recommend crop</strong> to see your match.</p>
                  </div>
                )}

                {status === "scanning" && (
                  <div className="result-scan">
                    <svg className="scan-sprout" viewBox="0 0 120 120" aria-hidden="true">
                      <path d="M30 97 Q60 88 90 97" fill="none" stroke="#7E9A86" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
                      <path className="scan-stem" d="M60 96 C60 82 57 72 60 52" fill="none" stroke="#E0A226" strokeWidth="3.5" strokeLinecap="round" pathLength="1" />
                    </svg>
                    <p>Reading your soil…</p>
                  </div>
                )}

                {status === "done" && result && (
                  <div className="result-filled">
                    <div className="crop-badge" key={reveal}>
                      <span className="crop-emoji-float">{result.emoji}</span>
                    </div>
                    <div className="result-label">Recommended crop</div>
                    <div className="result-name">{result.name}</div>
                    <div className="result-why">{result.blurb}</div>
                    <div className="result-readings">
                      <span className="reading-chip">N {result.readings.nitrogen}</span>
                      <span className="reading-chip">P {result.readings.phosphorus}</span>
                      <span className="reading-chip">K {result.readings.potassium}</span>
                      <span className="reading-chip">{result.readings.temperature}°C</span>
                      <span className="reading-chip">{result.readings.humidity}%</span>
                      <span className="reading-chip">pH {result.readings.ph}</span>
                      <span className="reading-chip">{result.readings.rainfall}mm</span>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="result-error">
                    <span className="err-icon">🌧️</span>
                    <p>Couldn't reach the model. Check that the backend is running and try again.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="side-note">
              <p className="kicker">Field note</p>
              <p>{NOTES[reveal % NOTES.length]}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
