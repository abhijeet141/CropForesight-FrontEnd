import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ImageUpload.css";

const DISEASES = {
  "Tomato Healthy": { ok: true, emoji: "✅", advice: "No disease detected. Keep monitoring and maintain good airflow." },
  "Tomato Bacterial Spot": { ok: false, emoji: "⚠️", advice: "Remove affected leaves, avoid overhead watering, and consider a copper-based spray." },
  "Tomato Early Blight": { ok: false, emoji: "⚠️", advice: "Remove lower infected leaves, mulch the soil, and rotate crops next season." },
  "Tomato Late Blight": { ok: false, emoji: "⚠️", advice: "Spreads fast — remove and destroy infected plants and apply fungicide promptly." },
  "Tomato Leaf Mold": { ok: false, emoji: "⚠️", advice: "Improve ventilation and lower humidity; remove affected leaves." },
  "Tomato Septoria Leaf Spot": { ok: false, emoji: "⚠️", advice: "Remove infected foliage, avoid wetting leaves, and apply fungicide." },
  "Tomato Spider Mites": { ok: false, emoji: "⚠️", advice: "Spray leaf undersides with water or insecticidal soap; raise humidity." },
  "Tomato Target Spot": { ok: false, emoji: "⚠️", advice: "Remove infected leaves, improve airflow, and apply fungicide if it spreads." },
  "Tomato Yellow Leaf Curl Virus": { ok: false, emoji: "⚠️", advice: "Whitefly-spread — remove infected plants and control whiteflies." },
  "Tomato Mosaic Virus": { ok: false, emoji: "⚠️", advice: "Remove infected plants, disinfect tools and hands, and control aphids." },
};

function diseaseInfo(name) {
  return DISEASES[name] || { ok: false, emoji: "🍃", advice: "Condition detected. Inspect the plant and remove affected leaves." };
}

export function ImageUpload() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const cardRef = useRef(null);
  const frameRef = useRef(0);

  const [image, setImage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | scanning | done | error
  const [result, setResult] = useState(null);
  const [reveal, setReveal] = useState(0);
  const [barWidth, setBarWidth] = useState("0%");

  useEffect(() => {
    if (!window.cloudinary) return;
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOADPRESET,
        sources: ["local", "camera", "url"],
        multiple: false,
      },
      (error, res) => {
        if (!error && res && res.event === "success") {
          setImage(res.info.secure_url);
          predict(res.info.secure_url);
        }
      }
    );
  }, []);

  const openWidget = () => {
    if (widgetRef.current) widgetRef.current.open();
  };

  const predict = async (imageUrl) => {
    setStatus("scanning");
    setBarWidth("0%");
    try {
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const formData = new FormData();
      formData.append("fileUploadedByUser", imageBlob, "image.jpg");

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_FASTAPI}/predict`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data && data.success && data.predicted_result) {
        const info = diseaseInfo(data.predicted_result);
        const pct = parseFloat(data.confidence);
        setResult({
          raw: data.predicted_result,
          name: data.predicted_result.replace(/^Tomato /, ""),
          confidence: data.confidence,
          pct: isNaN(pct) ? 0 : pct,
          ...info,
        });
        setReveal((r) => r + 1);
        setStatus("done");
        setTimeout(() => setBarWidth(`${isNaN(pct) ? 0 : pct}%`), 60);
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

  const glow =
    status === "done" && result
      ? result.ok
        ? "rgba(46,107,70,.28)"
        : "rgba(216,90,48,.22)"
      : "rgba(224,162,38,.18)";

  return (
    <div className="leaf-check">
      <div className="wrap">
        <header className="head">
          <Link className="back-link" to="/">← Back to dashboard</Link>
          <span className="eyebrow">Leaf check · AlexNet</span>
          <h1>Check a <em>tomato leaf</em></h1>
          <p className="head-sub">
            Upload a clear photo of a single tomato leaf. A deep-learning model
            checks it against 10 conditions — nine common diseases plus healthy
            — and tells you what it sees, with a confidence score.
          </p>
        </header>

        <div className="grid">
          <div className="upload-card">
            <div className="upload-head">
              <h2>Leaf photo</h2>
              <span className="tag">10 classes</span>
            </div>
            <div className="upload-body">
              {!image ? (
                <div
                  className="dropzone"
                  role="button"
                  tabIndex={0}
                  aria-label="Upload a tomato leaf photo"
                  onClick={openWidget}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openWidget();
                    }
                  }}
                >
                  <div className="dz-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 16V4" />
                      <path d="m7 9 5-5 5 5" />
                      <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
                    </svg>
                  </div>
                  <div className="dz-title">Upload a tomato leaf photo</div>
                  <div className="dz-sub">Click to browse or use your camera</div>
                  <span className="dz-formats">JPG · PNG · up to 10 MB</span>
                </div>
              ) : (
                <div className="preview">
                  <div className={`preview-frame ${status === "scanning" ? "scanning" : ""}`}>
                    <img src={image} alt="Uploaded tomato leaf" />
                    <div className="scan-line" />
                  </div>
                  <div className="preview-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => predict(image)}
                      disabled={status === "scanning"}
                    >
                      {status === "scanning" ? "Analyzing…" : "Analyze again"}
                    </button>
                    <button className="btn btn-ghost" onClick={openWidget} disabled={status === "scanning"}>
                      Replace photo
                    </button>
                  </div>
                </div>
              )}

              <div className="tips">
                <span className="tip">🍃 One leaf, filling the frame</span>
                <span className="tip">☀️ Good, even light</span>
                <span className="tip">🔍 Sharp focus</span>
              </div>
            </div>
          </div>

          <aside className="side">
            <div className="scene">
              <div
                className="result-card"
                ref={cardRef}
                style={{ "--glow": glow }}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                <span className="result-tag">diagnosis</span>

                {status === "idle" && (
                  <div className="r-empty">
                    <span className="empty-leaf">🍅</span>
                    <p>Upload a leaf photo to see a diagnosis here.</p>
                  </div>
                )}

                {status === "scanning" && (
                  <div className="r-scan">
                    <svg className="scan-sprout" viewBox="0 0 120 120" aria-hidden="true">
                      <circle cx="60" cy="60" r="34" fill="none" stroke="#3A5446" strokeWidth="3" />
                      <path className="scan-stem" d="M40 78 Q60 30 80 78" fill="none" stroke="#E0A226" strokeWidth="3.5" strokeLinecap="round" pathLength="1" />
                    </svg>
                    <p>Running AlexNet…</p>
                  </div>
                )}

                {status === "done" && result && (
                  <div className="r-filled">
                    <span className={`status-pill ${result.ok ? "ok" : "alert"}`}>
                      {result.ok ? "● Healthy" : "● Needs attention"}
                    </span>
                    <div className={`disease-badge ${result.ok ? "ok" : "alert"}`} key={reveal}>
                      <span className="badge-emoji">{result.emoji}</span>
                    </div>
                    <div className="r-label">Detected condition</div>
                    <div className="r-name">{result.name}</div>
                    <div className="conf-wrap">
                      <div className="conf-top">
                        <span>Confidence</span>
                        <span>{result.confidence}</span>
                      </div>
                      <div className="conf-bar">
                        <div
                          className={`conf-fill ${result.ok ? "ok" : "alert"}`}
                          style={{ width: barWidth }}
                        />
                      </div>
                    </div>
                    <div className="r-advice">{result.advice}</div>
                  </div>
                )}

                {status === "error" && (
                  <div className="r-error">
                    <span className="err-icon">🌧️</span>
                    <p>Couldn't analyze the leaf. Check that the disease-detection backend is running and try again.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="side-note">
              <p className="kicker">Field note</p>
              <p>
                This model is trained on tomato leaves only. For best results,
                photograph a single leaf against a plain background.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
