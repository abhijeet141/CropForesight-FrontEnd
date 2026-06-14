import { useState } from "react";
import { SignInButton } from "@clerk/clerk-react";
import SoilCard from "./SoilCard.jsx";
import "./Landing.css";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#tools", label: "Tools" },
];

const HERO = {
  soil: {
    eyebrow: "Soil in · Crop out",
    title: (
      <>
        Know your crop <em>before</em> you sow.
      </>
    ),
    sub: "CropForesight reads seven things your field already knows — nitrogen, phosphorus, potassium, pH, rainfall, humidity and temperature — and recommends the crop most likely to thrive on it.",
    note: "Try the sample soil card →",
  },
  leaf: {
    eyebrow: "Leaf in · Diagnosis out",
    title: (
      <>
        Catch disease <em>before</em> it spreads.
      </>
    ),
    sub: "Photograph a tomato leaf and CropForesight's deep-learning model flags early blight, leaf mold and septoria leaf spot in seconds — so you can act before trouble takes the whole field.",
    note: "Try the sample leaf check →",
  },
};

const HOW = {
  soil: {
    title: "From soil test to sowing decision in three steps",
    sub: "No agronomy degree needed. If you have a soil health card or basic field readings, you have everything the model needs.",
    steps: [
      {
        glyph: "🧪",
        title: "Enter your field's readings",
        text: "Type in N, P, K, pH, rainfall, humidity and temperature — straight from your soil health card or local weather data.",
      },
      {
        glyph: "⚙️",
        title: "The model does the matching",
        text: "A machine-learning model trained on thousands of field samples compares your soil profile against 22 crop signatures.",
      },
      {
        glyph: "🌱",
        title: "Sow with confidence",
        text: "Get the crop best matched to your land — and check live weather for your district before you plant.",
      },
    ],
  },
  leaf: {
    title: "From leaf photo to diagnosis in three steps",
    sub: "No plant pathologist needed. If you can snap a photo of a tomato leaf, you have everything the model needs.",
    steps: [
      {
        glyph: "📷",
        title: "Photograph the leaf",
        text: "Snap or upload a clear, front-lit photo of a tomato leaf that fills most of the frame.",
      },
      {
        glyph: "🔬",
        title: "The model scans it",
        text: "A deep-learning model compares the leaf against thousands of healthy and diseased samples.",
      },
      {
        glyph: "🌿",
        title: "Treat with confidence",
        text: "Get the likely disease and a confidence score in seconds — so you can act before it spreads.",
      },
    ],
  },
};

const COVERAGE = {
  soil: {
    title: "22 crops the model knows well",
    items: [
      "🌾 Rice", "🌽 Maize", "🫘 Chickpea", "🫘 Kidney beans", "🌱 Pigeon peas",
      "🌱 Moth beans", "🌱 Mung bean", "🌱 Black gram", "🌱 Lentil", "🍌 Banana",
      "🥭 Mango", "🍇 Grapes", "🍉 Watermelon", "🍈 Muskmelon", "🍎 Apple",
      "🍊 Orange", "🥥 Coconut", "🌳 Papaya", "🫛 Pomegranate", "🧶 Cotton",
      "🪢 Jute", "☕ Coffee",
    ],
  },
  leaf: {
    title: "10 tomato leaf conditions the model knows well",
    items: [
      "🍃 Healthy", "🦠 Bacterial spot", "🍂 Early blight", "🍁 Late blight",
      "🍄 Leaf mold", "🟤 Septoria spot", "🕷️ Spider mites", "🎯 Target spot",
      "🧬 Mosaic virus", "🟡 Yellow leaf curl",
    ],
  },
};

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoTab, setDemoTab] = useState("soil");
  const hero = HERO[demoTab];
  const how = HOW[demoTab];
  const coverage = COVERAGE[demoTab];
  return (
    <div className="landing">
      <nav className="ld-nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">🌾</span>CropForesight
          </a>
          <div className="nav-actions">
            <ul className="nav-links">
              {NAV.map(({ href, label }) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
              <li>
                <SignInButton mode="modal">
                  <button className="btn btn-primary btn-sm">Sign in</button>
                </SignInButton>
              </li>
            </ul>
            <button
              className="ld-nav-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="ld-nav-mobile">
            {NAV.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-copy" key={demoTab}>
              <span className="eyebrow">{hero.eyebrow}</span>
              <h1>{hero.title}</h1>
              <p className="hero-sub">{hero.sub}</p>
            </div>
            <div className="hero-ctas">
              <SignInButton mode="modal">
                <button className="btn btn-primary">Get your recommendation</button>
              </SignInButton>
              <a className="btn btn-ghost" href="#how">See how it works</a>
            </div>
            <p className="hero-note">
              Free to use · Works on any device ·{" "}
              <strong>{hero.note}</strong>
            </p>
          </div>

          <SoilCard tab={demoTab} onTabChange={setDemoTab} />
        </div>
      </header>

      <section id="how">
        <div className="wrap">
          <div className="how-copy" key={demoTab}>
            <div className="section-head">
              <p className="kicker">How it works</p>
              <h2 className="title">{how.title}</h2>
              <p className="section-sub">{how.sub}</p>
            </div>
            <div className="steps">
              {how.steps.map(({ glyph, title, text }, i) => (
                <div className="step" key={title}>
                  <span className="glyph">{glyph}</span>
                  <span className="step-num">Step {i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="tools">
        <div className="tools">
          <div className="wrap">
            <p className="kicker">Two tools, one goal</p>
            <h2 className="title">Decide what to grow. Protect what's growing.</h2>
            <div className="tools-grid">
              <div className="tool">
                <div className="tool-icon">🌾</div>
                <h3>Crop recommendation</h3>
                <p>
                  Seven soil and climate parameters in, one best-fit crop out.
                  Built for the realities of Indian fields.
                </p>
                <ul>
                  <li>Trained on real soil–crop outcome data</li>
                  <li>Covers cereals, pulses, fruits and cash crops</li>
                  <li>Results in seconds, free of charge</li>
                </ul>
              </div>
              <div className="tool">
                <div className="tool-icon">🍅</div>
                <h3>Tomato disease detection</h3>
                <p>
                  Photograph a tomato leaf, upload it, and a deep-learning
                  model flags diseases before they spread.
                </p>
                <ul>
                  <li>Detects common blights, spots and mold</li>
                  <li>Works from a simple phone photo</li>
                  <li>Catch problems early, act in time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="crops">
        <div className="wrap">
          <div className="cov-copy" key={demoTab}>
            <div className="section-head">
              <p className="kicker">Coverage</p>
              <h2 className="title">{coverage.title}</h2>
            </div>
            <div className="crops-strip">
              {coverage.items.map((item) => (
                <span className="crop-chip" key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="cta">
          <h2>Your field already has the answer.</h2>
          <p>
            Sign in free to run the full model on all seven parameters, upload
            leaf photos for disease checks, and get live weather for your
            district.
          </p>
          <SignInButton mode="modal">
            <button className="btn btn-primary">Sign in to get started</button>
          </SignInButton>
        </div>
      </section>

      <footer className="ld-footer">
        <div className="wrap foot-inner">
          <span>© {new Date().getFullYear()} CropForesight · Built for farmers, by people who code</span>
          <ul className="foot-links">
            <li><a href="#how">How it works</a></li>
            <li><a href="#tools">Tools</a></li>
            <li>
              <a
                href="https://github.com/abhijeet141/CropForesight"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
