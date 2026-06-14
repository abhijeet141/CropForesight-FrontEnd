import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./contributor.css";

const REPOS = [
  "abhijeet141/CropForesight",
  "abhijeet141/CropForesight-FrontEnd",
];

const CACHE_KEY = "cf:contributors:v1";
const CACHE_TTL = 60 * 60 * 1000;

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    return Date.now() - ts > CACHE_TTL ? null : data;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    //
  }
};

const mergeContributors = (lists) => {
  const byLogin = new Map();
  for (const list of lists) {
    for (const c of list) {
      if (c.type === "Bot") continue;
      const prev = byLogin.get(c.login);
      if (prev) {
        prev.contributions += c.contributions;
      } else {
        byLogin.set(c.login, {
          id: c.id,
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          contributions: c.contributions,
        });
      }
    }
  }
  return [...byLogin.values()].sort(
    (a, b) => b.contributions - a.contributions || a.login.localeCompare(b.login)
  );
};

function Avatar({ src, login }) {
  const [failed, setFailed] = useState(false);
  const initials = (login || "?").slice(0, 2).toUpperCase();
  return (
    <div className="avatar">
      {failed || !src ? (
        <span className="initials">{initials}</span>
      ) : (
        <img src={src} alt={login} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

const Contributor = () => {
  const [status, setStatus] = useState("loading"); // loading | error | empty | success
  const [contributors, setContributors] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const load = useCallback(async (signal, { fresh = false } = {}) => {
    setStatus("loading");

    if (!fresh) {
      const cached = readCache();
      if (cached) {
        setContributors(cached);
        setStatus(cached.length ? "success" : "empty");
        return;
      }
    }

    const results = await Promise.allSettled(
      REPOS.map((repo) =>
        axios.get(`https://api.github.com/repos/${repo}/contributors?per_page=100`, { signal })
      )
    );
    if (signal?.aborted) return;

    const ok = results.filter((r) => r.status === "fulfilled");
    if (!ok.length) {
      const rateLimited = results.some((r) => r.reason?.response?.status === 403);
      setErrMsg(
        rateLimited
          ? "GitHub's hourly rate limit was reached. Please try again in a little while."
          : "Couldn't load contributors from GitHub. Check your connection and try again."
      );
      setStatus("error");
      return;
    }

    const merged = mergeContributors(ok.map((r) => r.value.data || []));
    writeCache(merged);
    setContributors(merged);
    setStatus(merged.length ? "success" : "empty");
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal);
    return () => ctrl.abort();
  }, [load]);

  return (
    <div className="contributors-page">
      <div className="wrap">
        <header className="head">
          <Link className="back-link" to="/">← Back to dashboard</Link>
          <span className="eyebrow">Open source</span>
          <h1>The people behind <em>CropForesight</em></h1>
          <p className="head-sub">
            CropForesight is free and open source. These are the contributors
            who have shaped it on GitHub, with commits totalled across all of
            its repositories.
          </p>
        </header>

        {status === "loading" && (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="skeleton" key={i}>
                <div className="sk-circle" />
                <div className="sk-line" />
                <div className="sk-line short" />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="state">
            <span className="big">🌧️</span>
            <p>{errMsg}</p>
            <button className="retry" onClick={() => load(undefined, { fresh: true })}>Try again</button>
          </div>
        )}

        {status === "empty" && (
          <div className="state">
            <span className="big">🌱</span>
            <p>No contributors to show yet.</p>
          </div>
        )}

        {status === "success" && (
          <div className="grid">
            {contributors.map((c) => (
              <div className="card" key={c.id}>
                <Avatar src={c.avatar_url} login={c.login} />
                <div className="login">{c.login}</div>
                <div className="commits">
                  {c.contributions} commit{c.contributions === 1 ? "" : "s"}
                </div>
                <a className="view" href={c.html_url} target="_blank" rel="noreferrer">
                  View profile →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contributor;
