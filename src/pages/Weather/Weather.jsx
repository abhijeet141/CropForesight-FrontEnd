import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Weather.css";

const CHIPS = ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Pune"];

const condEmoji = (main) =>
  ({
    Clear: "☀️",
    Clouds: "⛅",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "🌫️",
    Haze: "🌫️",
    Fog: "🌫️",
    Dust: "🌫️",
    Sand: "🌫️",
    Ash: "🌫️",
    Squall: "🌪️",
    Tornado: "🌪️",
  }[main] || "🌤️");

// total expected precipitation (mm) across the 5-day / 3-hour forecast blocks
function sumRain(forecast) {
  const list = forecast?.list;
  if (!Array.isArray(list) || !list.length) return null;
  const total = list.reduce((sum, b) => sum + (b.rain?.["3h"] || 0), 0);
  return Math.round(total);
}

function mapData(d) {
  return {
    place: `${d.name}${d.sys?.country ? ", " + d.sys.country : ""}`,
    emoji: condEmoji(d.weather?.[0]?.main),
    desc: d.weather?.[0]?.description || "",
    temp: Math.round(d.main.temp),
    feels: Math.round(d.main.feels_like),
    humid: d.main.humidity,
    wind: Math.round((d.wind?.speed || 0) * 3.6),
    press: d.main.pressure,
    min: Math.round(d.main.temp_min),
    max: Math.round(d.main.temp_max),
    cloud: d.clouds?.all ?? 0,
    vis: d.visibility != null ? Math.round(d.visibility / 1000) : null,
  };
}

export const Weather = () => {
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | result
  const [data, setData] = useState(null);
  const [errorText, setErrorText] = useState("");

  const cardRef = useRef(null);
  const frameRef = useRef(0);

  const KEY = import.meta.env.VITE_OPENWEATHER_KEY;
  const BASE = "https://api.openweathermap.org/data/2.5";

  const fetchWeather = async (query, label) => {
    setStatus("loading");
    const tail = `${query}&units=metric&appid=${KEY}`;
    try {
      // current conditions are required; the forecast (for rainfall) is best-effort
      const [cur, fc] = await Promise.allSettled([
        axios.get(`${BASE}/weather?${tail}`),
        axios.get(`${BASE}/forecast?${tail}`),
      ]);
      if (cur.status === "rejected") throw cur.reason;
      const rain = fc.status === "fulfilled" ? sumRain(fc.value.data) : null;
      setData({ ...mapData(cur.value.data), rain });
      setStatus("result");
    } catch (err) {
      setErrorText(
        err?.response?.status === 404
          ? `We couldn't find "${label}". Try a major city or district name.`
          : "Couldn't fetch weather just now. Check your connection and try again."
      );
      setStatus("error");
    }
  };

  const lookup = (q) => {
    const name = (q ?? city).trim();
    if (!name) return;
    fetchWeather(`q=${encodeURIComponent(name)}`, name);
  };

  const lookupGeo = () => {
    if (!navigator.geolocation) {
      setErrorText("Location isn't available on this device. Search by city instead.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        fetchWeather(`lat=${coords.latitude}&lon=${coords.longitude}`, "your location"),
      () => {
        setErrorText("Couldn't get your location. Allow location access or search by city.");
        setStatus("error");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    lookup();
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
      el.style.transform = `rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
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

  const now = new Date().toLocaleString("en-IN", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="weather-page">
      <div className="wrap">
        <header className="head">
          <Link className="back-link" to="/">← Back to dashboard</Link>
          <span className="eyebrow">Live weather</span>
          <h1>Weather for your <em>district</em></h1>
          <p className="head-sub">
            Look up current conditions before you plan field work. Temperature,
            humidity and rainfall here are the same readings the crop model uses.
          </p>
        </header>

        <form className="search-row" onSubmit={onSubmit}>
          <div className="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search by city or district…"
              aria-label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Get weather</button>
          <button type="button" className="btn btn-soft" onClick={lookupGeo}>
            📍 Use my location
          </button>
        </form>
        <div className="chips">
          {CHIPS.map((c) => (
            <button
              key={c}
              className="chip"
              onClick={() => {
                setCity(c);
                lookup(c);
              }}
            >
              📍 {c}
            </button>
          ))}
        </div>

        <div className="grid">
          <div className="scene">
            <div
              className="weather-card"
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              {status === "idle" && (
                <div className="empty">
                  <span className="big">⛅</span>
                  <p>Search a city to see current conditions, or pick one above.</p>
                </div>
              )}

              {status === "loading" && (
                <div className="loading">
                  <svg viewBox="0 0 50 50">
                    <circle className="spin-ring" cx="25" cy="25" r="20" fill="none" stroke="#E0A226" strokeWidth="4" strokeLinecap="round" strokeDasharray="80 50" />
                  </svg>
                  <p>Fetching conditions…</p>
                </div>
              )}

              {status === "error" && (
                <div className="error">
                  <span className="big">🧭</span>
                  <p>{errorText}</p>
                </div>
              )}

              {status === "result" && data && (
                <div className="result">
                  <div className="wc-top">
                    <div>
                      <div className="wc-place">{data.place}</div>
                      <div className="wc-time">{now}</div>
                    </div>
                    <div className="wc-cond">
                      <span className="wc-emoji">{data.emoji}</span>
                      <span className="wc-desc">{data.desc}</span>
                    </div>
                  </div>
                  <div className="wc-temp">{data.temp}°</div>
                  <div className="wc-feels">Feels like {data.feels}°C</div>
                  {data.rain != null && (
                    <div className="wc-rain">
                      <span className="wcr-ico" aria-hidden="true">🌧️</span>
                      <span className="wcr-val">{data.rain} mm</span>
                      <span className="wcr-lbl">expected rain · next 5 days</span>
                    </div>
                  )}
                  <div className="wc-metrics">
                    <div className="metric key"><div className="m-ico">🌡️</div><div className="m-val">{data.temp}°C</div><div className="m-lbl">Temp</div></div>
                    <div className="metric key"><div className="m-ico">💧</div><div className="m-val">{data.humid}%</div><div className="m-lbl">Humidity</div></div>
                    <div className="metric"><div className="m-ico">💨</div><div className="m-val">{data.wind} km/h</div><div className="m-lbl">Wind</div></div>
                    <div className="metric"><div className="m-ico">📊</div><div className="m-val">{data.press}</div><div className="m-lbl">Pressure</div></div>
                    <div className="metric"><div className="m-ico">🔻</div><div className="m-val">{data.min}°</div><div className="m-lbl">Min</div></div>
                    <div className="metric"><div className="m-ico">🔺</div><div className="m-val">{data.max}°</div><div className="m-lbl">Max</div></div>
                    <div className="metric"><div className="m-ico">☁️</div><div className="m-val">{data.cloud}%</div><div className="m-lbl">Cloud</div></div>
                    <div className="metric"><div className="m-ico">👁️</div><div className="m-val">{data.vis != null ? `${data.vis} km` : "—"}</div><div className="m-lbl">Visibility</div></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="side">
            <div className="plan-card">
              <p className="k">Put it to work</p>
              <h3>Plan your planting</h3>
              <p>
                {status === "result" && data
                  ? "Carry these live readings straight into a soil test — temperature and humidity are two of the model's seven inputs."
                  : "Temperature and humidity here are two of the seven values the crop model reads. Look one up, then carry them into a soil test."}
              </p>
              {status === "result" && data && (
                <div className="plan-carry">
                  <span>🌡️ {data.temp}°C</span>
                  <span>💧 {data.humid}%</span>
                </div>
              )}
              <Link
                className="plan-btn"
                to="/form"
                state={
                  status === "result" && data
                    ? { prefill: { temperature: data.temp, humidity: data.humid } }
                    : undefined
                }
              >
                {status === "result" && data ? (
                  <>Use these readings <span className="arr">→</span></>
                ) : (
                  <>Run a soil test <span className="arr">→</span></>
                )}
              </Link>
            </div>
            <div className="fact">
              <p className="k">Why it matters</p>
              <p>
                Humidity and temperature shape which crops thrive. Pairing live
                weather with your soil readings makes the recommendation more
                realistic.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Weather;
