// XX Puzzle Party — Pre-installed Levels (30 Slam Dunk-themed)
//
// Each level has a name, team colors, and a basketball jersey number.
// The thumbnail is generated as an SVG data URL — colorful and distinct so that
// 10×10 = 100 puzzle pieces are still puzzleable.
//
// To replace with REAL Slam Dunk cartoon images later:
//   - Drop image files into a `levels/` folder
//   - Change `image` field of each level to the file path, e.g. `levels/01-sakuragi.jpg`
//   - Or change `image` to any URL (data URL, https URL of a cartoon you have rights to use)
//
// Note on copyright: Slam Dunk character art is copyrighted by Takehiko Inoue.
// Don't ship real Slam Dunk images publicly without permission.

const SLAM_DUNK_LEVELS = [
  // Shohoku (red & black) — 5 members + manager + coach
  { name:'Sakuragi',   subtitle:'#10 SHOHOKU',  number:10, colors:['#ef4444','#7f1d1d'], emoji:'🏀' },
  { name:'Rukawa',     subtitle:'#11 SHOHOKU',  number:11, colors:['#dc2626','#450a0a'], emoji:'⛹️' },
  { name:'Akagi',      subtitle:"#4 GORI",      number:4,  colors:['#b91c1c','#1f2937'], emoji:'💪' },
  { name:'Mitsui',     subtitle:'#14 3-PT KING',number:14, colors:['#f87171','#7c2d12'], emoji:'🎯' },
  { name:'Miyagi',     subtitle:'#7 RYOTA',     number:7,  colors:['#fb923c','#7c2d12'], emoji:'⚡' },
  { name:'Kogure',     subtitle:'#5 MEGANE',    number:5,  colors:['#fbbf24','#92400e'], emoji:'👓' },
  { name:'Anzai',      subtitle:'COACH',        number:0,  colors:['#fafafa','#525252'], emoji:'🏆' },

  // Ryonan (navy blue & yellow) — 5 members
  { name:'Sendoh',     subtitle:'#7 ACE',       number:7,  colors:['#1e40af','#0c4a6e'], emoji:'🌊' },
  { name:'Uozumi',     subtitle:'#4 CAPTAIN',   number:4,  colors:['#1d4ed8','#1e3a8a'], emoji:'🐟' },
  { name:'Fukuda',     subtitle:'#13 INSIDE',   number:13, colors:['#2563eb','#1e3a8a'], emoji:'🥊' },
  { name:'Hikoichi',   subtitle:'#15 ROOKIE',   number:15, colors:['#3b82f6','#1e40af'], emoji:'📓' },
  { name:'Koshino',    subtitle:'#6 G',         number:6,  colors:['#60a5fa','#1d4ed8'], emoji:'🎽' },

  // Kainan (yellow) — 5 members
  { name:'Maki',       subtitle:'#4 KING',      number:4,  colors:['#facc15','#854d0e'], emoji:'👑' },
  { name:'Jin',        subtitle:'#5 SHOOTER',   number:5,  colors:['#fde047','#a16207'], emoji:'🎯' },
  { name:'Kiyota',     subtitle:'#7 WILD CAT',  number:7,  colors:['#fbbf24','#713f12'], emoji:'🐯' },
  { name:'Takasago',   subtitle:'#6 C',         number:6,  colors:['#eab308','#78350f'], emoji:'🗻' },
  { name:'Muto',       subtitle:'#9 POWER',     number:9,  colors:['#facc15','#92400e'], emoji:'💥' },

  // Shoyo (green & white) — 5 members
  { name:'Fujima',     subtitle:'#4 PLAYING C', number:4,  colors:['#16a34a','#14532d'], emoji:'🧠' },
  { name:'Hanagata',   subtitle:'#5 GLASSES C', number:5,  colors:['#22c55e','#15803d'], emoji:'🌟' },
  { name:'Hasegawa',   subtitle:'#11 FOR',      number:11, colors:['#4ade80','#166534'], emoji:'🌿' },
  { name:'Nagano',     subtitle:'#6 G',         number:6,  colors:['#86efac','#15803d'], emoji:'🍀' },
  { name:'Ito',        subtitle:'#8 ASSIST',    number:8,  colors:['#34d399','#064e3b'], emoji:'🎨' },

  // Sannoh (purple/black) — National champions, 5 members
  { name:'Sawakita',   subtitle:'#9 ACE',       number:9,  colors:['#a855f7','#3b0764'], emoji:'🌪️' },
  { name:'Kawata',     subtitle:'#5 BIG MAN',   number:5,  colors:['#9333ea','#581c87'], emoji:'🔥' },
  { name:'Mikio',      subtitle:'#11 BROTHER',  number:11, colors:['#7c3aed','#4c1d95'], emoji:'🦣' },
  { name:'Nobe',       subtitle:'#6 G',         number:6,  colors:['#8b5cf6','#3b0764'], emoji:'🦅' },
  { name:'Matsumoto',  subtitle:'#7 SHOOTER',   number:7,  colors:['#a78bfa','#4c1d95'], emoji:'🏹' },

  // Special / iconic
  { name:'Haruko',     subtitle:'MANAGER',      number:0,  colors:['#f9a8d4','#9d174d'], emoji:'💖' },
  { name:'Ayako',      subtitle:'MANAGER',      number:0,  colors:['#f472b6','#831843'], emoji:'📋' },
  { name:'SLAM DUNK',  subtitle:'CHAMPIONS',    number:1,  colors:['#fbbf24','#7f1d1d'], emoji:'🏆' },
];

// Generate a colorful SVG thumbnail for a level (shown in the level card AND used as the puzzle image).
// 800×800 — gives plenty of detail for a 10×10 = 80px piece.
function generateLevelSVG(level, index) {
  const [c1, c2] = level.colors;
  const num = index + 1;
  const teamNum = level.number;
  const emoji = level.emoji;
  // Decorative random-looking dots for visual interest (deterministic from index)
  const seed = index * 9301 + 49297;
  let r = seed;
  const rand = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
  const dots = Array.from({length:24}, () => {
    const cx = 40 + rand() * 720;
    const cy = 40 + rand() * 720;
    const radius = 8 + rand() * 22;
    const op = 0.06 + rand() * 0.18;
    return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${radius.toFixed(0)}" fill="#fff" opacity="${op.toFixed(2)}"/>`;
  }).join('');
  // Diagonal stripes for texture
  const stripes = Array.from({length:6}, (_,i) => {
    const x = -200 + i * 200;
    return `<rect x="${x}" y="-100" width="60" height="1100" fill="#fff" opacity="0.04" transform="rotate(15 400 400)"/>`;
  }).join('');
  // Court lines (basketball court hint)
  const courtLines = `
    <circle cx="400" cy="400" r="120" fill="none" stroke="#fff" stroke-width="3" opacity="0.18"/>
    <circle cx="400" cy="400" r="60" fill="none" stroke="#fff" stroke-width="3" opacity="0.12"/>
    <line x1="0" y1="400" x2="800" y2="400" stroke="#fff" stroke-width="2" opacity="0.1"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
<defs>
  <linearGradient id="bg${index}" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <radialGradient id="rg${index}" cx="30%" cy="30%" r="80%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="800" height="800" fill="url(#bg${index})"/>
<rect width="800" height="800" fill="url(#rg${index})"/>
${stripes}
${courtLines}
${dots}
<text x="400" y="200" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif"
  font-size="84" font-weight="900" fill="#fff" opacity="0.95"
  style="paint-order:stroke;stroke:rgba(0,0,0,.3);stroke-width:4;letter-spacing:2px;">LV.${num}</text>
<text x="400" y="430" text-anchor="middle" font-size="220" opacity="0.95">${emoji}</text>
<text x="400" y="600" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif"
  font-size="76" font-weight="900" fill="#fff"
  style="paint-order:stroke;stroke:rgba(0,0,0,.4);stroke-width:5;letter-spacing:3px;">${level.name.toUpperCase()}</text>
<text x="400" y="680" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif"
  font-size="32" font-weight="700" fill="#fff" opacity="0.85" style="letter-spacing:4px;">${level.subtitle}</text>
${teamNum ? `<circle cx="700" cy="100" r="56" fill="#fff" opacity="0.95"/>
  <text x="700" y="125" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif"
    font-size="62" font-weight="900" fill="${c2}">${teamNum}</text>` : ''}
</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// Hydrate each level with its image data URL
SLAM_DUNK_LEVELS.forEach((lvl, i) => {
  lvl.id = i + 1;
  lvl.image = generateLevelSVG(lvl, i);
});

// Expose globally for app.js
window.SLAM_DUNK_LEVELS = SLAM_DUNK_LEVELS;
