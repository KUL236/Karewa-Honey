import { Bee } from './Bees';
// A flower beside the FAQ list. A bee flies in, lands on the bloom, sips for a moment, flies off and comes back (pure CSS loop).
const petals = [0, 45, 90, 135, 180, 225, 270, 315];
export default function FlowerBee() {
  return (
    <div className="fb" aria-hidden="true">
      <svg viewBox="0 0 220 420" className="fb-svg" focusable="false">
        <g className="fb-sway">
          <path d="M110 400C108 330 114 270 110 190" stroke="#4f8a3d" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M111 320C80 316 58 296 50 270C80 268 104 288 111 320z" fill="#6aa84f" />
          <path d="M110 275C140 272 162 252 170 226C140 224 116 244 110 275z" fill="#5c9a44" />
          <g transform="translate(110 150)" className="fb-bloom">
            {petals.map(a => <ellipse key={a} cx="0" cy="-46" rx="19" ry="40" fill={a % 90 ? '#ffb3c7' : '#ff8fb0'} stroke="#e96d95" strokeWidth="1.5" transform={`rotate(${a})`} />)}
            <circle r="26" fill="#F4B63B" stroke="#c98a10" strokeWidth="2" />
            {[[-8, -6], [7, -9], [0, 6], [-10, 9], [10, 7]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.6" fill="#a8680a" />)}
          </g>
        </g>
      </svg>
      <span className="fb-bee"><Bee size={54} /></span>
    </div>
  );
}

// Yellow flower with four bees buzzing around it and landing on the bloom (Quality page, below the lab report).
const ypetals = Array.from({ length: 14 }, (_, i) => i * (360 / 14));
export function YellowFlower() {
  return (
    <div className="yf" aria-hidden="true">
      <svg viewBox="0 0 240 300" className="yf-svg" focusable="false">
        <g className="fb-sway" style={{ transformOrigin: '120px 290px' }}>
          <path d="M120 292C118 240 124 200 120 150" stroke="#4f8a3d" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M121 235C90 231 68 211 60 185C90 183 114 203 121 235z" fill="#6aa84f" />
          <path d="M120 200C150 197 172 177 180 151C150 149 126 169 120 200z" fill="#5c9a44" />
          <g transform="translate(120 100)" className="yf-bloom">
            {ypetals.map((a, i) => <ellipse key={a} cx="0" cy="-54" rx="13" ry="34" fill={i % 2 ? '#FFD23F' : '#FFC21A'} stroke="#E0A100" strokeWidth="1.2" transform={`rotate(${a})`} />)}
            <circle r="30" fill="#8a4b10" stroke="#5b2f08" strokeWidth="2" />
            {[[-12, -8], [8, -14], [14, 4], [-4, 10], [-16, 8], [2, -2], [10, 16], [-10, 20]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.4" fill="#d9942b" />)}
          </g>
        </g>
      </svg>
      {[0, 1, 2, 3].map(i => <span key={i} className={'yf-bee yb' + i}><Bee size={i % 2 ? 38 : 46} /></span>)}
    </div>
  );
}
