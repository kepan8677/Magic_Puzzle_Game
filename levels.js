// XX Puzzle Party — Pre-installed Levels (30 Slam Dunk-themed)
//
// Each level has a name, team colors, jersey number, and a signature move.
// The thumbnail is generated as a richly detailed multi-color SVG so that
// every 8x8 = 64 puzzle piece has unique visual content (no big flat areas).
//
// To replace with REAL images later: just set lvl.image = 'path/to/image.jpg'
// (square images work best; user uploads are auto-cropped, but level images aren't).

const SLAM_DUNK_LEVELS = [
  // Shohoku (red & black)
  { name:'Sakuragi',  subtitle:'#10 SHOHOKU',   number:10, colors:['#ef4444','#7f1d1d'], accent:'#fbbf24', move:'DUNK',        moveIcon:'💥' },
  { name:'Rukawa',    subtitle:'#11 SHOHOKU',   number:11, colors:['#dc2626','#450a0a'], accent:'#06b6d4', move:'JUMPSHOT',    moveIcon:'🎯' },
  { name:'Akagi',     subtitle:"#4 GORI",       number:4,  colors:['#b91c1c','#1f2937'], accent:'#f59e0b', move:'REBOUND',     moveIcon:'💪' },
  { name:'Mitsui',    subtitle:'#14 3-PT KING', number:14, colors:['#f87171','#7c2d12'], accent:'#22c55e', move:'3-POINTER',   moveIcon:'🎯' },
  { name:'Miyagi',    subtitle:'#7 RYOTA',      number:7,  colors:['#fb923c','#7c2d12'], accent:'#a855f7', move:'STEAL',       moveIcon:'⚡' },
  { name:'Kogure',    subtitle:'#5 MEGANE',     number:5,  colors:['#fbbf24','#92400e'], accent:'#3b82f6', move:'ASSIST',      moveIcon:'🤝' },
  { name:'Anzai',     subtitle:'COACH',         number:0,  colors:['#fafafa','#525252'], accent:'#dc2626', move:'STRATEGY',    moveIcon:'🏆' },

  // Ryonan (navy blue)
  { name:'Sendoh',    subtitle:'#7 ACE',        number:7,  colors:['#1e40af','#0c4a6e'], accent:'#fbbf24', move:'PASS',        moveIcon:'🤝' },
  { name:'Uozumi',    subtitle:'#4 CAPTAIN',    number:4,  colors:['#1d4ed8','#1e3a8a'], accent:'#facc15', move:'BLOCK',       moveIcon:'🛡️' },
  { name:'Fukuda',    subtitle:'#13 INSIDE',    number:13, colors:['#2563eb','#1e3a8a'], accent:'#f59e0b', move:'DUNK',        moveIcon:'💥' },
  { name:'Hikoichi',  subtitle:'#15 ROOKIE',    number:15, colors:['#3b82f6','#1e40af'], accent:'#fbbf24', move:'DRIBBLE',     moveIcon:'🏀' },
  { name:'Koshino',   subtitle:'#6 G',          number:6,  colors:['#60a5fa','#1d4ed8'], accent:'#facc15', move:'DEFENSE',     moveIcon:'🛡️' },

  // Kainan (yellow)
  { name:'Maki',      subtitle:'#4 KING',       number:4,  colors:['#facc15','#854d0e'], accent:'#dc2626', move:'DRIBBLE',     moveIcon:'🏀' },
  { name:'Jin',       subtitle:'#5 SHOOTER',    number:5,  colors:['#fde047','#a16207'], accent:'#7c3aed', move:'3-POINTER',   moveIcon:'🎯' },
  { name:'Kiyota',    subtitle:'#7 WILD CAT',   number:7,  colors:['#fbbf24','#713f12'], accent:'#dc2626', move:'DUNK',        moveIcon:'💥' },
  { name:'Takasago',  subtitle:'#6 C',          number:6,  colors:['#eab308','#78350f'], accent:'#7c3aed', move:'REBOUND',     moveIcon:'💪' },
  { name:'Muto',      subtitle:'#9 POWER',      number:9,  colors:['#facc15','#92400e'], accent:'#16a34a', move:'POST',        moveIcon:'🔥' },

  // Shoyo (green)
  { name:'Fujima',    subtitle:'#4 PLAYING C',  number:4,  colors:['#16a34a','#14532d'], accent:'#facc15', move:'PASS',        moveIcon:'🤝' },
  { name:'Hanagata',  subtitle:'#5 GLASSES C',  number:5,  colors:['#22c55e','#15803d'], accent:'#f59e0b', move:'JUMPSHOT',    moveIcon:'🎯' },
  { name:'Hasegawa',  subtitle:'#11 FOR',       number:11, colors:['#4ade80','#166534'], accent:'#dc2626', move:'LAYUP',       moveIcon:'🌟' },
  { name:'Nagano',    subtitle:'#6 G',          number:6,  colors:['#86efac','#15803d'], accent:'#7c3aed', move:'DRIBBLE',     moveIcon:'🏀' },
  { name:'Ito',       subtitle:'#8 ASSIST',     number:8,  colors:['#34d399','#064e3b'], accent:'#fbbf24', move:'PASS',        moveIcon:'🤝' },

  // Sannoh (purple)
  { name:'Sawakita',  subtitle:'#9 ACE',        number:9,  colors:['#a855f7','#3b0764'], accent:'#fbbf24', move:'DUNK',        moveIcon:'💥' },
  { name:'Kawata',    subtitle:'#5 BIG MAN',    number:5,  colors:['#9333ea','#581c87'], accent:'#22c55e', move:'REBOUND',     moveIcon:'💪' },
  { name:'Mikio',     subtitle:'#11 BROTHER',   number:11, colors:['#7c3aed','#4c1d95'], accent:'#facc15', move:'BLOCK',       moveIcon:'🛡️' },
  { name:'Nobe',      subtitle:'#6 G',          number:6,  colors:['#8b5cf6','#3b0764'], accent:'#06b6d4', move:'DRIBBLE',     moveIcon:'🏀' },
  { name:'Matsumoto', subtitle:'#7 SHOOTER',    number:7,  colors:['#a78bfa','#4c1d95'], accent:'#22c55e', move:'3-POINTER',   moveIcon:'🎯' },

  // Special / iconic
  { name:'Haruko',    subtitle:'MANAGER',       number:0,  colors:['#f9a8d4','#9d174d'], accent:'#fbbf24', move:'CHEER',       moveIcon:'💖' },
  { name:'Ayako',     subtitle:'MANAGER',       number:0,  colors:['#f472b6','#831843'], accent:'#22c55e', move:'WHISTLE',     moveIcon:'📋' },
  { name:'SLAM DUNK', subtitle:'CHAMPIONS',     number:1,  colors:['#fbbf24','#7f1d1d'], accent:'#06b6d4', move:'CHAMPIONS',   moveIcon:'🏆' },
];

// Generates a richly colorful SVG. Every 8x8 piece (100×100) ends up with multiple
// distinct visual elements — no big flat regions, so the puzzle stays solvable.
function generateLevelSVG(level, index) {
  const [c1, c2] = level.colors;
  const accent = level.accent;
  const num = index + 1;
  const teamNum = level.number;
  const move = level.move;
  const moveIcon = level.moveIcon;

  // Seeded RNG for consistent layout per level
  let r = index * 9301 + 49297;
  const rand = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };

  // Pool of bright accent colors used for confetti / decorations
  const palette = ['#fbbf24','#06b6d4','#ec4899','#22c55e','#a855f7','#f97316','#facc15','#0ea5e9','#84cc16'];

  // 60 colorful dots scattered across the canvas (lots of variety)
  let dots = '';
  for (let i = 0; i < 60; i++) {
    const cx = rand() * 800;
    const cy = rand() * 800;
    const radius = 5 + rand() * 24;
    const col = palette[Math.floor(rand() * palette.length)];
    const op = 0.35 + rand() * 0.45;
    dots += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${radius.toFixed(0)}" fill="${col}" opacity="${op.toFixed(2)}"/>`;
  }

  // 8 stars scattered
  let stars = '';
  for (let i = 0; i < 8; i++) {
    const x = rand() * 760 + 20;
    const y = rand() * 720 + 60;
    const sz = 36 + rand() * 24;
    stars += `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" font-size="${sz.toFixed(0)}" opacity="${(0.55 + rand()*0.4).toFixed(2)}">⭐</text>`;
  }

  // 5 mini basketballs scattered
  let balls = '';
  for (let i = 0; i < 5; i++) {
    const x = rand() * 760 + 20;
    const y = rand() * 720 + 60;
    const sz = 38 + rand() * 24;
    balls += `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" font-size="${sz.toFixed(0)}" opacity="${(0.55 + rand()*0.4).toFixed(2)}">🏀</text>`;
  }

  // Speed/action lines radiating from center (motion effect)
  let lines = '';
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 + rand() * 18) * Math.PI / 180;
    const r1 = 220 + rand() * 50;
    const r2 = 480 + rand() * 60;
    const x1 = 400 + Math.cos(a) * r1;
    const y1 = 400 + Math.sin(a) * r1;
    const x2 = 400 + Math.cos(a) * r2;
    const y2 = 400 + Math.sin(a) * r2;
    lines += `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="${accent}" stroke-width="${(6 + rand()*8).toFixed(0)}" stroke-linecap="round" opacity="${(0.45 + rand()*0.3).toFixed(2)}"/>`;
  }

  // Diagonal stripes for texture
  let stripes = '';
  for (let i = 0; i < 5; i++) {
    const x = -100 + i * 200 + rand() * 60;
    const col = palette[Math.floor(rand() * palette.length)];
    stripes += `<rect x="${x.toFixed(0)}" y="-100" width="${(40 + rand()*60).toFixed(0)}" height="1100" fill="${col}" opacity="0.18" transform="rotate(${(15 + rand()*20).toFixed(0)} 400 400)"/>`;
  }

  // Mini "+" sparkles
  let sparkles = '';
  for (let i = 0; i < 14; i++) {
    const x = rand() * 760 + 20;
    const y = rand() * 760 + 20;
    const col = palette[Math.floor(rand() * palette.length)];
    sparkles += `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" font-size="${(28 + rand()*12).toFixed(0)}" fill="${col}" font-weight="900" opacity="0.85">+</text>`;
  }

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
<defs>
  <linearGradient id="bg${index}" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <radialGradient id="rg${index}" cx="50%" cy="50%" r="60%">
    <stop offset="0%" stop-color="${accent}" stop-opacity="0.45"/>
    <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>
</defs>
<!-- 4 quadrant base colors for visual variety -->
<rect x="0"   y="0"   width="400" height="400" fill="${c1}"/>
<rect x="400" y="0"   width="400" height="400" fill="${c2}"/>
<rect x="0"   y="400" width="400" height="400" fill="${c2}"/>
<rect x="400" y="400" width="400" height="400" fill="${c1}"/>
<!-- Soft diagonal overlay -->
<rect width="800" height="800" fill="url(#bg${index})" opacity="0.55"/>
<!-- Glow at center -->
<rect width="800" height="800" fill="url(#rg${index})"/>
<!-- Diagonal accent stripes -->
${stripes}
<!-- Court arcs -->
<circle cx="400" cy="400" r="160" fill="none" stroke="${accent}" stroke-width="6" opacity="0.45"/>
<circle cx="400" cy="400" r="80"  fill="none" stroke="#fff"     stroke-width="4" opacity="0.55"/>
<line x1="0" y1="400" x2="800" y2="400" stroke="#fff" stroke-width="3" opacity="0.25"/>
<!-- Speed lines -->
${lines}
<!-- Confetti dots -->
${dots}
<!-- Sparkles -->
${sparkles}
<!-- Mini basketballs and stars -->
${balls}
${stars}
<!-- Big move icon at top center -->
<text x="400" y="320" text-anchor="middle" font-size="180" opacity="0.96"
  style="paint-order:stroke;stroke:rgba(0,0,0,.35);stroke-width:8">${moveIcon}</text>
<!-- Move name pill -->
<rect x="220" y="350" width="360" height="64" rx="32" fill="${accent}" opacity="0.95"/>
<text x="400" y="395" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif"
  font-size="36" font-weight="900" fill="#1f2937" style="letter-spacing:4px">${move}</text>
<!-- Player name banner -->
<rect x="40" y="500" width="720" height="100" rx="20" fill="#fff" opacity="0.96"/>
<text x="400" y="570" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif"
  font-size="64" font-weight="900" fill="${c2}" style="letter-spacing:4px">${level.name.toUpperCase()}</text>
<!-- Subtitle with team color -->
<rect x="60" y="620" width="680" height="56" rx="28" fill="${c2}" opacity="0.95"/>
<text x="400" y="660" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif"
  font-size="28" font-weight="800" fill="#fff" style="letter-spacing:5px">${level.subtitle}</text>
<!-- Level badge top-left -->
<circle cx="100" cy="100" r="64" fill="${accent}" stroke="#fff" stroke-width="6"/>
<text x="100" y="92" text-anchor="middle" font-size="22" font-weight="800" fill="#1f2937">LEVEL</text>
<text x="100" y="125" text-anchor="middle" font-size="38" font-weight="900" fill="#1f2937">${num}</text>
<!-- Jersey number top-right -->
${teamNum ? `<circle cx="700" cy="100" r="64" fill="#fff" stroke="${accent}" stroke-width="6"/>
<text x="700" y="125" text-anchor="middle" font-size="62" font-weight="900" fill="${c2}">${teamNum}</text>` : ''}
<!-- Bottom corner ribbon -->
<polygon points="0,720 0,800 200,800 280,720" fill="${accent}" opacity="0.9"/>
<polygon points="800,720 800,800 600,800 520,720" fill="${accent}" opacity="0.9"/>
<text x="105" y="775" font-size="22" font-weight="900" fill="#1f2937" letter-spacing="2">SHOHOKU</text>
<text x="600" y="775" font-size="22" font-weight="900" fill="#1f2937" letter-spacing="2">${num.toString().padStart(2,'0')}/30</text>
</svg>`);
}

// Hydrate each level with its image data URL
SLAM_DUNK_LEVELS.forEach((lvl, i) => {
  lvl.id = i + 1;
  lvl.image = generateLevelSVG(lvl, i);
});

window.SLAM_DUNK_LEVELS = SLAM_DUNK_LEVELS;
