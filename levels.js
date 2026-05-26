// XX Puzzle Party — 30 Cartoon-style Levels (Hong Kong Night Theme)
//
// Each level has a unique facial expression + hand gesture + neon background
// drawn programmatically with hundreds of distinct visual elements
// (windows, neon signs, stars, street lights) so that every 7x7 = 49 puzzle
// piece has unique content — no flat areas anywhere.
//
// To swap in real cartoon images: just set lvl.image = 'your-image.jpg'.

const EXPRESSIONS = [
  { name:'COOL',        emoji:'😎' }, // 1
  { name:'FOCUSED',     emoji:'🧐' }, // 2
  { name:'SMIRK',       emoji:'😏' }, // 3
  { name:'WINK',        emoji:'😉' }, // 4
  { name:'GRIN',        emoji:'😄' }, // 5
  { name:'CONFIDENT',   emoji:'😌' }, // 6
  { name:'DETERMINED',  emoji:'😤' }, // 7
  { name:'JOYFUL',      emoji:'🤩' }, // 8
  { name:'CALM',        emoji:'🙂' }, // 9
  { name:'PROUD',       emoji:'😎' }, // 10
  { name:'THINKING',    emoji:'🤔' }, // 11
  { name:'SURPRISED',   emoji:'😮' }, // 12
  { name:'EXCITED',     emoji:'🤗' }, // 13
  { name:'LAUGHING',    emoji:'😆' }, // 14
  { name:'CHILL',       emoji:'😎' }, // 15
  { name:'INTENSE',     emoji:'😠' }, // 16
  { name:'AMUSED',      emoji:'😏' }, // 17
  { name:'DREAMY',      emoji:'😌' }, // 18
  { name:'BRAVE',       emoji:'😤' }, // 19
  { name:'PLAYFUL',     emoji:'😜' }, // 20
  { name:'STARRY',      emoji:'🤩' }, // 21
  { name:'CURIOUS',     emoji:'🤨' }, // 22
  { name:'CHEERFUL',    emoji:'😊' }, // 23
  { name:'BOLD',        emoji:'😤' }, // 24
  { name:'TRIUMPHANT',  emoji:'😎' }, // 25
  { name:'MYSTERIOUS',  emoji:'🥸' }, // 26
  { name:'NOSTALGIC',   emoji:'🥹' }, // 27
  { name:'CHARMING',    emoji:'😘' }, // 28
  { name:'ICONIC',      emoji:'🤵' }, // 29
  { name:'CHAMPION',    emoji:'🏆' }, // 30
];

const GESTURES = [
  { name:'PEACE',     emoji:'✌️' },
  { name:'OK',        emoji:'👌' },
  { name:'THUMBS UP', emoji:'👍' },
  { name:'FIST',      emoji:'✊' },
  { name:'WAVE',      emoji:'👋' },
  { name:'CALL ME',   emoji:'🤙' },
  { name:'POINT',     emoji:'👉' },
  { name:'FLEX',      emoji:'💪' },
  { name:'CLAP',      emoji:'👏' },
  { name:'PRAY',      emoji:'🙏' },
  { name:'ROCK',      emoji:'🤘' },
  { name:'CROSSED',   emoji:'🤞' },
  { name:'HEART',     emoji:'🤟' },
  { name:'WRITE',     emoji:'✍️' },
  { name:'PICK',      emoji:'☝️' },
  { name:'OPEN',      emoji:'🖐️' },
  { name:'PINCH',     emoji:'🤌' },
  { name:'SHAKE',     emoji:'🤝' },
  { name:'POINT UP',  emoji:'👆' },
  { name:'POINT DN',  emoji:'👇' },
  { name:'CLINK',     emoji:'🥂' },
  { name:'COFFEE',    emoji:'☕' },
  { name:'KEYS',      emoji:'🔑' },
  { name:'PHONE',     emoji:'📱' },
  { name:'BRIEF',     emoji:'💼' },
  { name:'WATCH',     emoji:'⌚' },
  { name:'GLASSES',   emoji:'🕶️' },
  { name:'STAR',      emoji:'⭐' },
  { name:'CROWN',     emoji:'👑' },
  { name:'TROPHY',    emoji:'🏆' },
];

// Distinct color schemes — each level rotates through varied palettes for visual variety
const PALETTES = [
  { sky1:'#0c1429', sky2:'#1e1b4b', neon:['#ec4899','#06b6d4','#fbbf24','#22c55e'], suit:'#374151' },
  { sky1:'#1e1b4b', sky2:'#581c87', neon:['#f97316','#22d3ee','#facc15','#fb7185'], suit:'#1f2937' },
  { sky1:'#0f172a', sky2:'#0c4a6e', neon:['#a855f7','#fbbf24','#10b981','#ec4899'], suit:'#4b5563' },
  { sky1:'#1e293b', sky2:'#831843', neon:['#06b6d4','#facc15','#84cc16','#f97316'], suit:'#312e81' },
  { sky1:'#0c0a09', sky2:'#7c2d12', neon:['#fbbf24','#22c55e','#ec4899','#0ea5e9'], suit:'#27272a' },
  { sky1:'#082f49', sky2:'#581c87', neon:['#fb7185','#facc15','#22d3ee','#84cc16'], suit:'#1e3a8a' },
];

const SLAM_DUNK_LEVELS = EXPRESSIONS.map((expr, i) => ({
  id: i + 1,
  name: expr.name,
  subtitle: `LV.${i+1} · ${GESTURES[i].name}`,
  expr,
  gesture: GESTURES[i],
  palette: PALETTES[i % PALETTES.length],
}));

function generateLevelSVG(level, index) {
  const { sky1, sky2, neon, suit } = level.palette;
  const num = index + 1;
  const exprEmoji = level.expr.emoji;
  const gestEmoji = level.gesture.emoji;

  // Seeded RNG for deterministic but varied placement
  let r = (index + 1) * 9301 + 49297;
  const rand = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };

  // ---- BACKGROUND BUILDINGS WITH WINDOWS ----
  // 4 building columns at different heights, each with a grid of randomly-lit windows
  let buildings = '';
  let windows = '';
  const buildingX = [0, 200, 400, 600];
  const buildingW = 200;
  const buildingHeights = [];
  for (let b = 0; b < 4; b++) {
    const h = 320 + Math.floor(rand() * 200);
    buildingHeights.push(h);
    const x = buildingX[b];
    const y = 700 - h;
    // Building silhouette (slightly varied gray-blue)
    const shade = 14 + Math.floor(rand() * 18);
    const buildingColor = `rgb(${shade},${shade+8},${shade+22})`;
    buildings += `<rect x="${x}" y="${y}" width="${buildingW}" height="${h+100}" fill="${buildingColor}"/>`;
    // Roof detail
    buildings += `<rect x="${x+20}" y="${y-10}" width="${buildingW-40}" height="14" fill="${buildingColor}"/>`;
    // Window grid
    const cols = 5, rows = Math.floor(h / 24);
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        if (rand() < 0.55) { // ~55% windows lit
          const wx = x + 18 + cx * 34;
          const wy = y + 12 + cy * 24;
          const lit = rand();
          const wcol = lit < 0.55 ? '#fde047' : (lit < 0.8 ? '#fb923c' : '#fff');
          const op = 0.5 + rand() * 0.5;
          windows += `<rect x="${wx}" y="${wy}" width="20" height="14" fill="${wcol}" opacity="${op.toFixed(2)}"/>`;
        }
      }
    }
  }

  // ---- NEON SIGNS scattered on buildings ----
  let neonSigns = '';
  const signs = ['MIDNIGHT','DRAGON','EAST','PHOENIX','GOLD','TIGER','PEARL','JADE','NOIR','ECHO','RUBY','LOTUS'];
  for (let i = 0; i < 5; i++) {
    const sx = 20 + Math.floor(rand() * 700);
    const sy = 100 + Math.floor(rand() * 400);
    const ncol = neon[Math.floor(rand() * neon.length)];
    const text = signs[Math.floor(rand() * signs.length)];
    const w = text.length * 14 + 24;
    neonSigns += `<rect x="${sx}" y="${sy}" width="${w}" height="34" rx="6" fill="${ncol}" opacity="0.75" stroke="${ncol}" stroke-width="2"/>`;
    neonSigns += `<text x="${sx + w/2}" y="${sy + 24}" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="22" font-weight="900" fill="#fff" style="paint-order:stroke;stroke:${ncol};stroke-width:2;letter-spacing:2px">${text}</text>`;
  }

  // ---- STARS in the sky ----
  let stars = '';
  for (let i = 0; i < 30; i++) {
    const sx = rand() * 800;
    const sy = rand() * 250;
    const sz = 1 + rand() * 3;
    stars += `<circle cx="${sx.toFixed(0)}" cy="${sy.toFixed(0)}" r="${sz.toFixed(1)}" fill="#fff" opacity="${(0.4 + rand()*0.6).toFixed(2)}"/>`;
  }

  // ---- STREET LIGHTS (small glow circles) ----
  let streetLights = '';
  for (let i = 0; i < 10; i++) {
    const lx = i * 80 + 30;
    const ly = 720;
    streetLights += `<circle cx="${lx}" cy="${ly}" r="14" fill="#fde047" opacity="0.9"/>`;
    streetLights += `<circle cx="${lx}" cy="${ly}" r="32" fill="#fde047" opacity="0.18"/>`;
  }

  // ---- BUS silhouette (red double-decker hint) ----
  const busX = 30 + Math.floor(rand() * 60);
  const busY = 620;
  const bus = `
    <rect x="${busX}" y="${busY}" width="180" height="100" fill="#dc2626" rx="8"/>
    <rect x="${busX+10}" y="${busY+8}" width="40" height="18" fill="#fde047" opacity="0.9"/>
    <text x="${busX+30}" y="${busY+22}" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="14" font-weight="900" fill="#1f2937">${(num*7%99).toString().padStart(2,'0')}</text>
    <rect x="${busX+10}" y="${busY+34}" width="32" height="22" fill="#fff" opacity="0.85"/>
    <rect x="${busX+50}" y="${busY+34}" width="32" height="22" fill="#fff" opacity="0.85"/>
    <rect x="${busX+90}" y="${busY+34}" width="32" height="22" fill="#fff" opacity="0.85"/>
    <rect x="${busX+130}" y="${busY+34}" width="32" height="22" fill="#fff" opacity="0.85"/>
    <rect x="${busX+10}" y="${busY+62}" width="32" height="22" fill="#fff" opacity="0.7"/>
    <rect x="${busX+50}" y="${busY+62}" width="32" height="22" fill="#fff" opacity="0.7"/>
    <rect x="${busX+90}" y="${busY+62}" width="32" height="22" fill="#fff" opacity="0.7"/>
    <rect x="${busX+130}" y="${busY+62}" width="32" height="22" fill="#fff" opacity="0.7"/>
    <circle cx="${busX+30}" cy="${busY+108}" r="14" fill="#1f2937"/>
    <circle cx="${busX+150}" cy="${busY+108}" r="14" fill="#1f2937"/>`;

  // ---- CHARACTER PORTRAIT in center ----
  // Suit jacket silhouette
  const charBody = `
    <ellipse cx="400" cy="700" rx="220" ry="140" fill="${suit}"/>
    <ellipse cx="400" cy="700" rx="220" ry="140" fill="url(#suitGrad${index})"/>
    <!-- Shirt collar V -->
    <polygon points="350,610 400,700 450,610 430,580 370,580" fill="#fff"/>
    <!-- Tie or no-tie variant — random -->
    ${rand() > 0.5 ? `<polygon points="394,610 406,610 412,680 400,720 388,680" fill="${neon[index%neon.length]}"/>` : ''}
    <!-- Suit lapels -->
    <polygon points="350,610 320,720 380,720 400,690" fill="${suit}" opacity="0.8" stroke="#000" stroke-width="1"/>
    <polygon points="450,610 480,720 420,720 400,690" fill="${suit}" opacity="0.8" stroke="#000" stroke-width="1"/>
    <!-- Pocket square -->
    <rect x="445" y="665" width="20" height="14" fill="${neon[(index+2)%neon.length]}" opacity="0.9"/>`;

  // Round face circle background
  const charHead = `
    <circle cx="400" cy="430" r="160" fill="url(#headGrad${index})"/>
    <circle cx="400" cy="430" r="160" fill="none" stroke="${neon[index%neon.length]}" stroke-width="6" opacity="0.85"/>
    <circle cx="400" cy="430" r="170" fill="none" stroke="#fff" stroke-width="3" opacity="0.5"/>`;

  // Big expression emoji (the "face")
  const charFace = `<text x="400" y="500" text-anchor="middle" font-size="240">${exprEmoji}</text>`;

  // Gesture emoji in lower-right corner of portrait
  const charGesture = `
    <circle cx="630" cy="600" r="58" fill="${neon[(index+1)%neon.length]}"/>
    <circle cx="630" cy="600" r="58" fill="none" stroke="#fff" stroke-width="4"/>
    <text x="630" y="624" text-anchor="middle" font-size="60">${gestEmoji}</text>`;

  // ---- OVERLAYS: Level badge, name banner, gesture name ----
  const badge = `
    <circle cx="100" cy="100" r="56" fill="${neon[index%neon.length]}" stroke="#fff" stroke-width="5"/>
    <text x="100" y="92" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="18" font-weight="800" fill="#0f172a">LEVEL</text>
    <text x="100" y="125" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="34" font-weight="900" fill="#0f172a">${num}</text>`;

  // Bottom bar with expression + gesture text
  const bottomBar = `
    <rect x="0" y="720" width="800" height="80" fill="#0f172a" opacity="0.92"/>
    <text x="40" y="770" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="32" font-weight="900" fill="${neon[index%neon.length]}" letter-spacing="3">${level.expr.name}</text>
    <text x="760" y="770" text-anchor="end" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="22" font-weight="800" fill="#fff" letter-spacing="3">${level.gesture.name}</text>
    <text x="400" y="770" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="20" font-weight="900" fill="${neon[(index+1)%neon.length]}" letter-spacing="2">${num.toString().padStart(2,'0')} / 30</text>`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
<defs>
  <linearGradient id="sky${index}" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${sky1}"/>
    <stop offset="60%" stop-color="${sky2}"/>
    <stop offset="100%" stop-color="${sky1}"/>
  </linearGradient>
  <radialGradient id="headGrad${index}" cx="40%" cy="35%" r="65%">
    <stop offset="0%" stop-color="#fed7aa"/>
    <stop offset="60%" stop-color="#fdba74"/>
    <stop offset="100%" stop-color="#9a3412"/>
  </radialGradient>
  <linearGradient id="suitGrad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="rgba(255,255,255,0.12)"/>
    <stop offset="100%" stop-color="rgba(0,0,0,0.18)"/>
  </linearGradient>
</defs>
<!-- Sky gradient -->
<rect width="800" height="800" fill="url(#sky${index})"/>
<!-- Stars in night sky -->
${stars}
<!-- Building silhouettes -->
${buildings}
<!-- Lit windows (hundreds) -->
${windows}
<!-- Neon signs -->
${neonSigns}
<!-- Street level (sidewalk) -->
<rect x="0" y="700" width="800" height="100" fill="#1c1917"/>
<rect x="0" y="700" width="800" height="6" fill="#facc15" opacity="0.4"/>
<!-- Street lights -->
${streetLights}
<!-- Bus silhouette -->
${bus}
<!-- Character (head + body) -->
${charBody}
${charHead}
${charFace}
${charGesture}
<!-- Level badge -->
${badge}
<!-- Bottom info bar -->
${bottomBar}
</svg>`);
}

SLAM_DUNK_LEVELS.forEach((lvl, i) => {
  lvl.image = generateLevelSVG(lvl, i);
});

window.SLAM_DUNK_LEVELS = SLAM_DUNK_LEVELS;
