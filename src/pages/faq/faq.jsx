import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./faq.css";
import faqs from "./faqData";

const CATS = [
  { id: "all", label: "All" },
  { id: "model", label: "Crop model" },
  { id: "leaf", label: "Leaf check" },
  { id: "data", label: "Your data" },
];
const CAT_LABEL = { model: "Crop model", leaf: "Leaf check", data: "Your data" };

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// split text on the search term so matches can be wrapped in <mark>
function highlight(text, query) {
  const q = query.trim();
  if (!q) return text;
  const lower = text.toLowerCase();
  const ql = q.toLowerCase();
  const parts = [];
  let i = 0;
  let key = 0;
  while (i <= text.length) {
    const found = lower.indexOf(ql, i);
    if (found === -1) {
      parts.push(text.slice(i));
      break;
    }
    if (found > i) parts.push(text.slice(i, found));
    parts.push(<mark key={key++}>{text.slice(found, found + q.length)}</mark>);
    i = found + q.length;
  }
  return parts;
}

const FAQ = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [openIds, setOpenIds] = useState(() => new Set([0]));
  const cardRef = useRef(null);
  const frameRef = useRef(0);

  const items = useMemo(() => faqs.map((f, i) => ({ ...f, id: i })), []);

  const counts = useMemo(() => {
    const c = { all: items.length };
    for (const it of items) c[it.cat] = (c[it.cat] || 0) + 1;
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (f) =>
        (activeCat === "all" || f.cat === activeCat) &&
        (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    );
  }, [items, query, activeCat]);

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allOpen = filtered.length > 0 && filtered.every((f) => openIds.has(f.id));
  const toggleAll = () =>
    setOpenIds(allOpen ? new Set() : new Set(filtered.map((f) => f.id)));

  const handlePointerMove = (e) => {
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
  };
  const handlePointerLeave = () => {
    cancelAnimationFrame(frameRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    el.classList.remove("tilting");
  };

  return (
    <div className="faq-page">
      <div className="wrap">
        <header className="head">
          <Link className="back-link" to="/">← Back to dashboard</Link>
          <span className="eyebrow">Help · FAQs</span>
          <h1>Frequently asked <em>questions</em></h1>
          <p className="head-sub">
            How the models work, what the readings mean, and where the data
            comes from. Search below or browse the list.
          </p>
        </header>

        <div className="grid">
          <div>
            <div className="search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search questions…"
                aria-label="Search questions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              )}
            </div>

            <div className="faq-toolbar">
              <div className="faq-filters">
                {CATS.map((cat) => (
                  <button
                    key={cat.id}
                    className={`faq-filter ${activeCat === cat.id ? "active" : ""}`}
                    onClick={() => setActiveCat(cat.id)}
                  >
                    {cat.label}
                    <span className="ff-count">{counts[cat.id] || 0}</span>
                  </button>
                ))}
              </div>
              {filtered.length > 0 && (
                <button type="button" className="toggle-all" onClick={toggleAll}>
                  {allOpen ? "Collapse all" : "Expand all"}
                </button>
              )}
            </div>

            {filtered.length > 0 ? (
              <div className="accordion">
                {filtered.map((item) => {
                  const open = openIds.has(item.id);
                  return (
                    <div className={`faq-item ${open ? "open" : ""}`} key={item.id}>
                      <button
                        className="faq-q"
                        aria-expanded={open}
                        onClick={() => toggle(item.id)}
                      >
                        <span className="faq-num">
                          {String(item.id + 1).padStart(2, "0")}
                        </span>
                        <span className="faq-text">{highlight(item.q, query)}</span>
                        <span className="faq-tag">{CAT_LABEL[item.cat]}</span>
                        <span className="faq-chevron"><Chevron /></span>
                      </button>
                      <div className="faq-a">
                        <div className="faq-a-inner">
                          <p>{highlight(item.a, query)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-results">
                <span className="nr-icon">🌾</span>
                <p>No questions match that search.</p>
                <button
                  type="button"
                  className="nr-reset"
                  onClick={() => {
                    setQuery("");
                    setActiveCat("all");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <aside className="side">
            <div className="scene">
              <div
                className="help-card"
                ref={cardRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                <div className="help-glyph">🌱</div>
                <h3>Still have questions?</h3>
                <p>
                  The fastest way to understand CropForesight is to try it. Run
                  a soil test or check a leaf in seconds.
                </p>
                <div className="help-actions">
                  <Link className="help-btn hb-wheat" to="/form">
                    Run a soil test <span className="arr">→</span>
                  </Link>
                  <Link className="help-btn hb-soft" to="/ImageUpload">
                    Check a tomato leaf <span className="arr">→</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="fact">
              <p className="kicker">Good to know</p>
              <p>
                CropForesight is free and open source. The recommendation model
                reads seven soil &amp; climate values; the leaf checker uses an
                AlexNet model.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
