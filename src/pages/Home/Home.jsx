import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import CropData from "../ExampleOfCrop/CropData.js";
import "./Home.css";

const TAILS = [
  "What are we growing today?",
  "Your field has been waiting.",
  "Let's read the soil.",
];

function greetWord(hours) {
  if (hours < 12) return "Good morning";
  if (hours < 17) return "Good afternoon";
  return "Good evening";
}

function seasonKey(month) {
  if (month >= 6 && month <= 10) return "Kharif";
  if (month >= 11 || month <= 3) return "Rabi";
  return "Zaid";
}

const CAT_LABEL = {
  cereal: "Cereal",
  pulse: "Pulse",
  fruit: "Fruit",
  cash: "Cash crop",
};

const Home = () => {
  const { user } = useUser();
  const firstName = user?.firstName || user?.username || "farmer";

  const now = new Date();
  const season = seasonKey(now.getMonth() + 1);
  const dateChip = `${now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })} · ${season} season`;
  const tail = TAILS[now.getDate() % TAILS.length];

  const seasonal = CropData.filter((c) => c.season.includes(season));
  const pool = seasonal.length ? seasonal : CropData;
  const spotlight = pool[(now.getDate() - 1) % pool.length];

  return (
    <div className="home-dash">
      <header className="greeting">
        <div className="wrap greet-grid">
          <div>
            <span className="eyebrow">{dateChip}</span>
            <h1>
              {greetWord(now.getHours())}, {firstName}. <em>{tail}</em>
            </h1>
            <p className="greet-sub">
              Your field tools are ready. Run a soil test for a fresh
              recommendation, or check on your tomato crop in seconds.
            </p>
          </div>

          <aside className="spotlight" aria-label={`Crop in season: ${spotlight.name}`}>
            <div className="spot-head">
              <h2>In season now</h2>
              <span className="spot-tag">{season} crop</span>
            </div>
            <div className="spot-body">
              <span className="spot-emoji" aria-hidden="true">{spotlight.emoji}</span>
              <div className="spot-id">
                <h3>{spotlight.name}</h3>
                <div className="spot-meta">
                  <span className="spot-chip">{CAT_LABEL[spotlight.cat] || spotlight.cat}</span>
                  <span className="spot-chip">{spotlight.season}</span>
                </div>
              </div>
              <p className="spot-note">{spotlight.note}</p>
            </div>
            <div className="spot-foot">
              <span>Spotlight · changes daily</span>
              <Link className="spot-link" to="/ExampleCrop">
                Browse all 22 →
              </Link>
            </div>
          </aside>
        </div>
      </header>

      <div className="tools-row">
        <div className="wrap tools-grid">
          <Link
            className="tool-card tool-dark"
            to="/form"
            aria-label="Open crop recommendation"
          >
            <span className="tool-glyph">🌾</span>
            <p className="kicker">Soil in · Crop out</p>
            <h3>Find your next crop</h3>
            <p>
              Enter your soil's seven readings and the model matches them
              against 22 crop signatures.
            </p>
            <div className="meta-chips">
              <span className="meta-chip">7 parameters</span>
              <span className="meta-chip">22 crops</span>
              <span className="meta-chip">~2 seconds</span>
            </div>
            <span className="tool-cta cta-wheat">
              Run a soil test <span className="arr">→</span>
            </span>
          </Link>

          <Link
            className="tool-card tool-light"
            to="/ImageUpload"
            aria-label="Open tomato leaf disease check"
          >
            <span className="tool-glyph">🍅</span>
            <p className="kicker">Leaf check</p>
            <h3>Check a tomato leaf</h3>
            <p>
              Upload a photo of a leaf and the AlexNet model flags diseases
              before they spread to the row.
            </p>
            <div className="meta-chips">
              <span className="meta-chip">10 classes</span>
              <span className="meta-chip">photo upload</span>
              <span className="meta-chip">confidence score</span>
            </div>
            <span className="tool-cta cta-loam">
              Upload a leaf photo <span className="arr">→</span>
            </span>
          </Link>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">More from your toolkit</p>
              <h2 className="title">Around the farm</h2>
            </div>
          </div>
          <div className="toolkit-grid">
            <Link className="kit" to="/ExampleCrop">
              <span className="glyph">🌱</span>
              <span className="go">→</span>
              <h3>Browse the 22 crops</h3>
              <p>
                See examples and growing notes for every crop the model can
                recommend.
              </p>
              <div className="kit-chips">
                <span className="kit-chip">🌾 Rice</span>
                <span className="kit-chip">🌽 Maize</span>
                <span className="kit-chip">🥭 Mango</span>
                <span className="kit-chip">☕ Coffee</span>
                <span className="kit-chip">+18 more</span>
              </div>
            </Link>
            <Link className="kit" to="/Weather">
              <span className="glyph">⛅</span>
              <span className="go">→</span>
              <h3>Live district weather</h3>
              <p>
                Search any city for current temperature, humidity and
                conditions before you plan field work.
              </p>
              <div className="kit-chips">
                <span className="kit-chip">OpenWeather</span>
                <span className="kit-chip">any district</span>
              </div>
            </Link>
            <Link className="kit" to="/faq">
              <span className="glyph">❓</span>
              <span className="go">→</span>
              <h3>FAQs &amp; help</h3>
              <p>
                How the models work, what the readings mean, and where the
                data comes from.
              </p>
              <div className="kit-chips">
                <span className="kit-chip">soil health card</span>
                <span className="kit-chip">model details</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <footer className="hd-footer">
        <div className="wrap foot-inner">
          <span>
            © {new Date().getFullYear()} CropForesight · Built for farmers, by
            people who code
          </span>
          <ul className="foot-links">
            <li>
              <Link to="/contributors">Contributors</Link>
            </li>
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
};

export default Home;
