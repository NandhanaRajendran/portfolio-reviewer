import { useState, useEffect } from "react";
import "./App.css";
console.log(import.meta.env.VITE_API_URL);
const EXAMPLES = ["brittanychiang.com", "jacekjeznach.com", "caferati.me"];

const features = [
  {
    icon: "👁️",
    label: "First impression",
    desc: "How recruiters see your site in 5 seconds.",
    color: "purple",
  },
  {
    icon: "✍️",
    label: "Content & clarity",
    desc: "Whether your story is clear and compelling.",
    color: "teal",
  },
  {
    icon: "📈",
    label: "Growth tips",
    desc: "Prioritised actions to help you stand out.",
    color: "coral",
  },
];

const stats = [
  { value: "2.4k+", label: "Portfolios analyzed" },
  { value: "98%", label: "Found it helpful" },
  { value: "< 10s", label: "Avg. response time" },
];

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [review, setReview] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyze = async () => {
    try {
      new URL(url);
    } catch {
      alert("Please enter a valid URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const responseText = await response.text();


      const data = JSON.parse(responseText);

      setReview(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAnalyze();
  };

  const handleChip = (ex) => {
    setUrl("https://" + ex);
  };

  return (
    <div className={`app ${mounted ? "app--mounted" : ""}`}>
      {/* Decorative blobs */}
      <div className="blob blob--1" aria-hidden="true" />
      <div className="blob blob--2" aria-hidden="true" />

      <div className="page-inner">
        {/* Nav */}
        <nav className="nav">
          <div className="nav__logo">
            <span className="nav__logo-icon">✦</span>
            PortfolioPilot
          </div>
          <div className="nav__links">
            <a href="#" className="nav__link">
              How it works
            </a>
            <a href="#" className="nav__link">
              Examples
            </a>
            <button className="nav__cta">Try free</button>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero__badge">
            <span className="hero__badge-pulse" />
            AI-powered feedback — free & instant
          </div>

          <h1 className="hero__title">
            Make your portfolio
            <br />
            <span className="hero__title-accent">impossible to ignore</span>
          </h1>

          <p className="hero__subtitle">
            Paste your URL. Get expert-level feedback on design, content,
            <br className="hero__br" /> and how to stand out from the crowd.
          </p>

          {/* Input group */}
          <div className="input-group">
            <div className="input-wrap">
              <span className="input-wrap__icon">🔗</span>
              <input
                type="text"
                className="input-wrap__field"
                placeholder="https://yourportfolio.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Portfolio URL"
              />
            </div>
            <button
              className={`btn-analyze ${loading ? "btn-analyze--loading" : ""}`}
              onClick={handleAnalyze}
              disabled={!url.trim() || loading}
              aria-label="Analyze portfolio"
            >
              {loading ? (
                <span className="btn-analyze__spinner" />
              ) : (
                <>
                  Analyze <span className="btn-analyze__arrow">→</span>
                </>
              )}
            </button>
          </div>

          {/* Example chips */}
          <div className="chips">
            <span className="chips__label">Try:</span>
            {EXAMPLES.map((ex) => (
              <button key={ex} className="chip" onClick={() => handleChip(ex)}>
                {ex}
              </button>
            ))}
          </div>
        </section>

        {/* Stats bar */}
        <div className="stats-bar">
          {stats.map((s) => (
            <div key={s.label} className="stats-bar__item">
              <span className="stats-bar__value">{s.value}</span>
              <span className="stats-bar__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <section className="features">
          {features.map((f) => (
            <div
              key={f.label}
              className={`feature-card feature-card--${f.color}`}
            >
              <div className="feature-card__icon">{f.icon}</div>
              <div className="feature-card__label">{f.label}</div>
              <div className="feature-card__desc">{f.desc}</div>
            </div>
          ))}
        </section>

        {/* Results */}

        {review && (
          <section className="results">
            <h2>Portfolio Review</h2>

            <div className="review-card">
              <h3>Overall Score: {review.score}/10</h3>

              <h4>Strengths</h4>
              <ul>
                {review?.strengths?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h4>Improvements</h4>
              <ul>
                {review?.improvements?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="footer">
          <span>Made with ✦ by PortfolioPilot</span>
          <span className="footer__dot">·</span>
          <a href="#" className="footer__link">
            Privacy
          </a>
          <span className="footer__dot">·</span>
          <a href="#" className="footer__link">
            Terms
          </a>
        </footer>
      </div>
    </div>
  );
}
