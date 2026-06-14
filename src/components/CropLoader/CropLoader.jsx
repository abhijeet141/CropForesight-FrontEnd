import "./CropLoader.css";

export default function CropLoader({ size = 110, label = "Preparing your field…", fullPage = false }) {
  return (
    <div
      className={`crop-loader ${fullPage ? "crop-loader--fullpage" : ""}`}
      role="status"
      aria-live="polite"
    >
      <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
        <path
          d="M30 97 Q60 88 90 97"
          fill="none"
          stroke="#8A5A33"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          className="crop-loader__stem"
          d="M60 96 C60 82 57 72 60 52"
          fill="none"
          stroke="#2E6B46"
          strokeWidth="3.5"
          strokeLinecap="round"
          pathLength="1"
        />
        <path
          className="crop-loader__leaf1"
          d="M59 78 C50 76 43 69 43 60 C52 61 58 68 59 75 Z"
          fill="#2E6B46"
        />
        <path
          className="crop-loader__leaf2"
          d="M60 64 C69 62 76 55 76 46 C67 47 61 54 60 61 Z"
          fill="#1C3829"
        />
        <circle className="crop-loader__bud" cx="60" cy="50" r="4.5" fill="#E0A226" />
      </svg>
      {label && <div className="crop-loader__label">{label}</div>}
    </div>
  );
}
