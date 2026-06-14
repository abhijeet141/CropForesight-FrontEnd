import { useEffect, useRef, useState } from "react";

const SLIDERS = [
  { key: "n", label: "Nitrogen (N)", min: 0, max: 140, format: (v) => `${v} kg/ha` },
  { key: "ph", label: "Soil pH", min: 35, max: 90, format: (v) => (v / 10).toFixed(1) },
  { key: "rain", label: "Rainfall", min: 20, max: 300, format: (v) => `${v} mm` },
  { key: "temp", label: "Temperature", min: 8, max: 44, format: (v) => `${v} °C` },
];

function pickCrop(n, ph, rain, temp) {
  if (rain >= 180 && temp >= 21 && temp <= 30)
    return ["🌾", "Rice", "High rainfall and warm, balanced soil suit paddy."];
  if (rain >= 150 && temp >= 23 && ph < 6.2)
    return ["☕", "Coffee", "Acidic soil with steady rain favours coffee."];
  if (rain < 60 && temp >= 28)
    return ["🧶", "Cotton", "Low rain and high heat point to cotton."];
  if (n < 40 && rain < 100 && ph >= 6.0)
    return ["🫘", "Chickpea", "Low-nitrogen, drier soil is ideal for chickpea."];
  if (temp <= 18)
    return ["🍎", "Apple", "Cool temperatures suit orchard crops like apple."];
  if (n >= 90 && rain >= 100)
    return ["🍌", "Banana", "Rich nitrogen and good moisture favour banana."];
  return ["🌽", "Maize", "Moderate moisture and balanced soil fit maize well."];
}

const LEAVES = [
  { id: "healthy", emoji: "🍃", label: "Healthy" },
  { id: "blight", emoji: "🍂", label: "Early blight" },
  { id: "mold", emoji: "🥬", label: "Leaf mold" },
  { id: "septoria", emoji: "🍁", label: "Septoria spot" },
];

const LEAF_RESULTS = {
  healthy: { e: "✅", name: "Healthy", why: "No disease patterns detected. Confidence 97%.", alert: false },
  blight: { e: "⚠️", name: "Early blight", why: "Concentric ring lesions detected. Confidence 94%. Treat early to stop spread.", alert: true },
  mold: { e: "⚠️", name: "Leaf mold", why: "Pale patches with underside mold detected. Confidence 91%. Improve airflow.", alert: true },
  septoria: { e: "⚠️", name: "Septoria leaf spot", why: "Small dark-edged spots detected. Confidence 93%. Remove affected leaves.", alert: true },
};

export default function SoilCard({ tab = "soil", onTabChange = () => {} }) {
  const [values, setValues] = useState({ n: 80, ph: 65, rain: 200, temp: 25 });
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [scanning, setScanning] = useState(false);

  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const scanTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(scanTimerRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const [cropEmoji, cropName, cropWhy] = pickCrop(
    values.n,
    values.ph / 10,
    values.rain,
    values.temp
  );

  function handlePointerMove(e) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      el.style.transform = `rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`;
      el.classList.add("tilting");
    });
  }

  function handlePointerLeave() {
    cancelAnimationFrame(frameRef.current);
    const el = cardRef.current;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    el.classList.remove("tilting");
  }

  function selectLeaf(id) {
    setSelectedLeaf(id);
    setScanning(true);
    clearTimeout(scanTimerRef.current);
    scanTimerRef.current = setTimeout(() => setScanning(false), 700);
  }

  const leafResult = selectedLeaf ? LEAF_RESULTS[selectedLeaf] : null;
  const showAlert = !scanning && leafResult?.alert;

  return (
    <div className="soil-card-scene">
      <div
        className="soil-card"
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label="Interactive soil sample demo"
      >
        <div className="soil-head">
          <div className="demo-tabs" role="tablist" aria-label="Demo selector">
            <button
              className={`demo-tab ${tab === "soil" ? "active" : ""}`}
              role="tab"
              aria-selected={tab === "soil"}
              onClick={() => onTabChange("soil")}
            >
              🌱 Soil test
            </button>
            <button
              className={`demo-tab ${tab === "leaf" ? "active" : ""}`}
              role="tab"
              aria-selected={tab === "leaf"}
              onClick={() => onTabChange("leaf")}
            >
              🍅 Leaf check
            </button>
          </div>
          <span className="soil-tag">live preview</span>
        </div>

        {tab === "soil" && (
          <div className="soil-body" role="tabpanel">
            {SLIDERS.map(({ key, label, min, max, format }) => {
              const fill = ((values[key] - min) / (max - min)) * 100;
              return (
                <div className="param" key={key}>
                  <div className="param-row">
                    <label htmlFor={`slider-${key}`}>{label}</label>
                    <output>{format(values[key])}</output>
                  </div>
                  <input
                    type="range"
                    id={`slider-${key}`}
                    min={min}
                    max={max}
                    value={values[key]}
                    style={{ "--fill": `${fill}%` }}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [key]: +e.target.value }))
                    }
                  />
                </div>
              );
            })}

            <div className="verdict" aria-live="polite">
              <span className="verdict-crop">{cropEmoji}</span>
              <div>
                <div className="verdict-label">Recommended crop</div>
                <div className="verdict-name">{cropName}</div>
                <div className="verdict-why">{cropWhy}</div>
              </div>
            </div>
          </div>
        )}

        {tab === "leaf" && (
          <div className="soil-body" role="tabpanel">
            <p className="leaf-hint">Pick a sample leaf to run the disease check:</p>
            <div className="leaf-grid">
              {LEAVES.map(({ id, emoji, label }) => (
                <button
                  key={id}
                  className={`leaf-opt ${selectedLeaf === id ? "selected" : ""}`}
                  onClick={() => selectLeaf(id)}
                >
                  {emoji}
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div
              className={`verdict ${scanning ? "scanning" : ""} ${showAlert ? "alert" : ""}`}
              aria-live="polite"
            >
              <span className="verdict-crop">
                {scanning || !leafResult ? "🔬" : leafResult.e}
              </span>
              <div>
                <div className="verdict-label">
                  {scanning ? "Analyzing" : leafResult ? "Detection result" : "Awaiting sample"}
                </div>
                <div className="verdict-name">
                  {scanning ? "Running AlexNet…" : leafResult ? leafResult.name : "Select a leaf above"}
                </div>
                <div className="verdict-why">
                  {scanning
                    ? "Classifying leaf sample."
                    : leafResult
                      ? leafResult.why
                      : "The AlexNet model will classify it in seconds."}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="soil-foot">
          {tab === "leaf"
            ? "Demo uses sample leaves — sign in to upload photos of your own plants."
            : "Demo uses simplified rules — sign in to run the full ML model on all 7 parameters."}
        </div>
      </div>
    </div>
  );
}
