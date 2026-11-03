// Mini robot face for the assistant button (pure SVG, no image file).
export default function Robot({ size = 40 }) {
  return (
    <svg className="robot" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs><linearGradient id="rbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#FCE7B0" /></linearGradient></defs>
      <line x1="32" y1="9" x2="32" y2="16" stroke="#6B3B0C" strokeWidth="3" strokeLinecap="round" />
      <circle className="rb-bulb" cx="32" cy="7" r="4.2" fill="#E8A317" stroke="#6B3B0C" strokeWidth="2" />
      <rect x="4" y="28" width="6" height="14" rx="3" fill="#6B3B0C" />
      <rect x="54" y="28" width="6" height="14" rx="3" fill="#6B3B0C" />
      <rect x="9" y="16" width="46" height="40" rx="14" fill="url(#rbg)" stroke="#6B3B0C" strokeWidth="3" />
      <rect x="15" y="25" width="34" height="20" rx="9" fill="#2A1608" />
      <g className="rb-eyes"><ellipse cx="25" cy="34" rx="4.2" ry="5" fill="#FFC53D" /><ellipse cx="39" cy="34" rx="4.2" ry="5" fill="#FFC53D" />
        <circle cx="26.3" cy="32.2" r="1.3" fill="#fff" /><circle cx="40.3" cy="32.2" r="1.3" fill="#fff" /></g>
      <path d="M27 49.5q5 3.5 10 0" fill="none" stroke="#6B3B0C" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
