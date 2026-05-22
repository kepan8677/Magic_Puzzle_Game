"use strict";

// ============= UTILITIES =============
const $ = id => document.getElementById(id);
const board = $('board');

function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2500);
}

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0');
}

// ============= STATE =============
const state = {
  imgURL: null,
  imgFile: null,
  pieces: [],
  gridN: 4,
  diff: 3,
  startTime: 0,
  elapsedBeforePause: 0,
  timerInt: null,
  running: false,
  paused: false,
  drag: null,
};

// ============= POPULATE GRID OPTIONS =============
(() => {
  const sel = $('grid');
  for (let i = 2; i <= 20; i++) {
    const o = document.createElement('option');
    o.value = i; o.textContent = i + '×' + i;
    if (i === 4) o.selected = true;
    sel.appendChild(o);
  }
})();

// ============= HISTORY =============
const HKEY = 'puzzle_history_v2';
const loadHistory = () => {
  try { return JSON.parse(localStorage.getItem(HKEY) || '[]'); }
  catch(e) { return []; }
};
const saveHistory = h => {
  try { localStorage.setItem(HKEY, JSON.stringify(h)); }
  catch(e) { showToast('Could not save history (storage full?)'); }
};
function renderHistory() {
  const h = loadHistory();
  $('totalScore').textContent = h.reduce((s,g) => s + (g.score||0), 0);
  if (!h.length) {
    $('history').innerHTML = '<div class="empty">No games yet — finish one to see it here!</div>';
    return;
  }
  $('history').innerHTML = h.slice().reverse().map(g => `
    <div class="game-row">
      <img src="${g.thumb}" alt="">
      <div class="meta">
        <div><b>${g.score}</b> pts · ${g.gridN}×${g.gridN} · diff ${g.diff} · ${g.timeStr}</div>
        <div>${new Date(g.date).toLocaleString()}</div>
      </div>
    </div>`).join('');
}
$('clearBtn').onclick = () => {
  if (!loadHistory().length) return;
  if (confirm('Clear all history?')) {
    saveHistory([]);
    renderHistory();
    showToast('History cleared');
  }
};
renderHistory();

// ============= THEME TOGGLE (Normal vs Focus Mode) =============
const THEME_KEY = 'puzzle_theme_v1';
function applyTheme(mode) {
  if (mode === 'focus') {
    document.body.classList.add('focus-mode');
    $('themeBtn').textContent = '☀️';
    $('themeBtn').title = 'Switch to Normal mode';
  } else {
    document.body.classList.remove('focus-mode');
    $('themeBtn').textContent = '🌙';
    $('themeBtn').title = 'Switch to Focus mode (dim everything except the board)';
  }
}
applyTheme(localStorage.getItem(THEME_KEY) || 'normal');
$('themeBtn').onclick = () => {
  const next = document.body.classList.contains('focus-mode') ? 'normal' : 'focus';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
  showToast(next === 'focus' ? '🌙 Focus mode' : '☀️ Normal mode');
};

// ============= FILE UPLOAD =============
const dropEl = $('drop');
const fileInput = $('file');

// Center-crop an image file into a square (returns a Blob URL of a square JPEG).
// Max output side is capped at 1600 to keep memory/perf reasonable.
function cropToSquareURL(file) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => {
      const side = Math.min(im.naturalWidth, im.naturalHeight);
      const sx = Math.floor((im.naturalWidth - side) / 2);
      const sy = Math.floor((im.naturalHeight - side) / 2);
      const out = Math.min(side, 1600); // cap output size
      const c = document.createElement('canvas');
      c.width = c.height = out;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(im, sx, sy, side, side, 0, 0, out, out);
      c.toBlob(b => b ? resolve(URL.createObjectURL(b)) : reject(new Error('toBlob failed')),
        'image/jpeg', 0.92);
    };
    im.onerror = () => reject(new Error('Image load failed'));
    im.src = URL.createObjectURL(file);
  });
}

async function handleFile(f) {
  if (!f) return;
  if (!f.type.startsWith('image/')) {
    showToast('Please choose an image file');
    return;
  }
  $('startBtn').disabled = true;
  let croppedURL;
  try {
    croppedURL = await cropToSquareURL(f);
  } catch (e) {
    console.error(e);
    showToast('Could not process image — try another');
    return;
  }
  if (state.imgURL) URL.revokeObjectURL(state.imgURL);
  state.imgURL = croppedURL;
  state.imgFile = f;
  dropEl.textContent = '';
  const im = document.createElement('img');
  im.className = 'thumb'; im.src = state.imgURL; im.alt = '';
  const span = document.createElement('span');
  span.innerHTML = `<b>${f.name.length > 24 ? f.name.slice(0,22)+'…' : f.name}</b><br><span style="font-size:12px;color:var(--muted)">Auto-cropped to square · click to change</span>`;
  dropEl.append(im, span, fileInput);
  $('startBtn').disabled = false;
  // Update side-preview
  const pImg = $('previewImg'), pEmpty = $('previewEmpty');
  pImg.src = state.imgURL;
  pImg.style.display = 'block';
  pEmpty.style.display = 'none';
}

dropEl.addEventListener('click', e => {
  if (e.target !== fileInput) fileInput.click();
});
fileInput.addEventListener('change', e => handleFile(e.target.files[0]));

['dragenter','dragover'].forEach(ev =>
  dropEl.addEventListener(ev, e => { e.preventDefault(); dropEl.classList.add('over'); }));
['dragleave','drop'].forEach(ev =>
  dropEl.addEventListener(ev, e => { e.preventDefault(); dropEl.classList.remove('over'); }));
dropEl.addEventListener('drop', e => {
  if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});

// ============= TIMER =============
function currentElapsed() {
  if (!state.running) return 0;
  if (state.paused) return state.elapsedBeforePause;
  return state.elapsedBeforePause + (Date.now() - state.startTime);
}
function startTimer() {
  state.elapsedBeforePause = 0;
  state.paused = false;
  state.startTime = Date.now();
  state.timerInt = setInterval(() => {
    const t = $('timer');
    const prog = $('progress').outerHTML;
    t.innerHTML = fmtTime(currentElapsed()) + ' · ' + prog;
  }, 250);
  $('pauseBtn').disabled = false;
  $('pauseBtn').textContent = '⏸ Pause';
}
function stopTimer() {
  const elapsed = currentElapsed();
  clearInterval(state.timerInt);
  state.timerInt = null;
  $('pauseBtn').disabled = true;
  return elapsed;
}

function updateProgress() {
  const N = state.pieces.length;
  if (!N) { $('progress').textContent = '0/0'; return 0; }
  const correct = state.pieces.reduce((s,p) =>
    s + (+p.dataset.slotIdx === +p.dataset.correctIdx ? 1 : 0), 0);
  $('progress').textContent = correct + '/' + N;
  $('progress').style.color = (correct === N) ? '#22c55e' : 'var(--accent)';
  return correct;
}
$('pauseBtn').onclick = () => {
  if (!state.running) return;
  if (state.paused) {
    state.paused = false;
    state.startTime = Date.now();
    $('pauseBtn').textContent = '⏸ Pause';
    board.style.filter = '';
    board.style.pointerEvents = '';
  } else {
    state.paused = true;
    state.elapsedBeforePause += Date.now() - state.startTime;
    $('pauseBtn').textContent = '▶ Resume';
    board.style.filter = 'blur(10px) brightness(.5)';
    board.style.pointerEvents = 'none';
  }
};

// ============= BUILD PUZZLE =============
$('startBtn').onclick = () => {
  if (!state.imgURL) return;
  state.gridN = +$('grid').value;
  state.diff = +$('diff').value;
  buildPuzzle();
};

function buildPuzzle() {
  if (state.timerInt) clearInterval(state.timerInt);
  board.innerHTML = '';
  state.pieces = [];
  state.running = true;
  state.paused = false;
  state.drag = null;
  board.style.filter = '';
  board.style.pointerEvents = '';

  const W = board.clientWidth;
  const N = state.gridN * state.gridN;
  const cell = W / state.gridN;

  const order = Array.from({length:N}, (_,i) => i);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const correctRatio = (5 - state.diff) * 0.15;
  const numCorrect = Math.floor(N * correctRatio);
  for (let k = 0; k < numCorrect; k++) {
    const target = Math.floor(Math.random() * N);
    const idx = order.indexOf(target);
    if (idx !== target) [order[idx], order[target]] = [order[target], order[idx]];
  }
  if (order.every((v,i) => v === i)) [order[0], order[1]] = [order[1], order[0]];

  for (let i = 0; i < N; i++) {
    const correctIdx = order[i];
    const cr = Math.floor(correctIdx / state.gridN);
    const cc = correctIdx % state.gridN;
    const sr = Math.floor(i / state.gridN);
    const sc = i % state.gridN;
    const p = document.createElement('div');
    p.className = 'piece';
    p.style.width = p.style.height = cell + 'px';
    p.style.backgroundImage = `url("${state.imgURL}")`;
    p.style.backgroundSize = `${W}px ${W}px`;
    p.style.backgroundPosition = `-${cc*cell}px -${cr*cell}px`;
    p.dataset.correctIdx = correctIdx;
    p.dataset.slotIdx = i;
    p.style.left = sc * cell + 'px';
    p.style.top = sr * cell + 'px';
    if (correctIdx === i) p.classList.add('locked');
    p.addEventListener('pointerdown', onPieceDown);
    board.appendChild(p);
    state.pieces.push(p);
  }
  startTimer();
  updateProgress();
}

// ============= DRAG (Pointer Events) =============
function onPieceDown(e) {
  const p = e.currentTarget;
  if (p.classList.contains('locked') || state.paused || !state.running) return;
  const r = p.getBoundingClientRect();
  p.classList.add('dragging');
  try { p.setPointerCapture(e.pointerId); } catch(_) {}
  state.drag = {
    piece: p,
    pointerId: e.pointerId,
    ox: e.clientX - r.left,
    oy: e.clientY - r.top,
    origX: parseFloat(p.style.left) || 0,
    origY: parseFloat(p.style.top) || 0,
    cell: board.clientWidth / state.gridN,
  };
  e.preventDefault();
}

window.addEventListener('pointermove', e => {
  const d = state.drag;
  if (!d || e.pointerId !== d.pointerId) return;
  const br = board.getBoundingClientRect();
  d.piece.style.left = (e.clientX - br.left - d.ox) + 'px';
  d.piece.style.top  = (e.clientY - br.top  - d.oy) + 'px';
});

function endDrag(e) {
  const d = state.drag;
  if (!d) return;
  if (e && e.pointerId !== undefined && e.pointerId !== d.pointerId) return;
  state.drag = null;
  const p = d.piece;
  p.classList.remove('dragging');
  const cell = d.cell;
  const x = parseFloat(p.style.left), y = parseFloat(p.style.top);
  let tCol = Math.round(x / cell);
  let tRow = Math.round(y / cell);
  tCol = Math.max(0, Math.min(state.gridN - 1, tCol));
  tRow = Math.max(0, Math.min(state.gridN - 1, tRow));
  const targetSlot = tRow * state.gridN + tCol;
  const mySlot = +p.dataset.slotIdx;

  if (targetSlot === mySlot) {
    p.style.left = d.origX + 'px';
    p.style.top  = d.origY + 'px';
  } else {
    const other = state.pieces.find(q => +q.dataset.slotIdx === targetSlot);
    if (other && !other.classList.contains('locked')) {
      other.dataset.slotIdx = mySlot;
      other.style.left = d.origX + 'px';
      other.style.top  = d.origY + 'px';
      p.dataset.slotIdx = targetSlot;
      p.style.left = tCol * cell + 'px';
      p.style.top  = tRow * cell + 'px';
      [p, other].forEach(pc => {
        if (+pc.dataset.slotIdx === +pc.dataset.correctIdx) pc.classList.add('locked');
        else pc.classList.remove('locked');
      });
    } else {
      p.style.left = d.origX + 'px';
      p.style.top  = d.origY + 'px';
    }
  }
  checkWin();
}
window.addEventListener('pointerup', endDrag);
window.addEventListener('pointercancel', endDrag);

// Win modal handlers
$('winCloseBtn').onclick = () => $('winModal').classList.remove('show');
$('winAgainBtn').onclick = () => {
  $('winModal').classList.remove('show');
  if (state.imgURL) buildPuzzle();
};

function checkWin() {
  if (!state.running) return;
  const correct = updateProgress();
  const N = state.pieces.length;
  if (correct !== N) return;
  state.running = false;
  state.pieces.forEach(p => p.classList.add('locked'));
  const elapsed = stopTimer();
  const score = computeScore(elapsed);
  finishGame(elapsed, score);
}

function computeScore(ms) {
  const N = state.gridN * state.gridN;
  const expected = N * 3000 * (0.6 + state.diff * 0.2);
  const ratio = expected / Math.max(1, ms);
  let score = Math.round(100 * Math.min(1, ratio) * (0.5 + state.diff * 0.1));
  return Math.max(10, Math.min(100, score));
}

function finishGame(elapsed, score) {
  showWinCelebration(elapsed, score);
  setTimeout(() => {
    try {
      const c = document.createElement('canvas');
      c.width = c.height = 80;
      const im = new Image();
      im.onload = () => {
        try { c.getContext('2d').drawImage(im, 0, 0, 80, 80); } catch(_) {}
        let thumb = '';
        try { thumb = c.toDataURL('image/jpeg', 0.6); } catch(_) {}
        const h = loadHistory();
        h.push({
          date: Date.now(),
          gridN: state.gridN, diff: state.diff,
          timeMs: elapsed, timeStr: fmtTime(elapsed),
          score, thumb
        });
        saveHistory(h);
        renderHistory();
      };
      im.onerror = im.onload;
      im.src = state.imgURL;
    } catch(e) { console.error('Save failed', e); }
  }, 50);
}

function showWinCelebration(elapsed, score) {
  const m = $('winModal');
  $('winTime').textContent = fmtTime(elapsed);
  $('winScore').textContent = score;
  $('winInfo').textContent = `${state.gridN}×${state.gridN} · Difficulty ${state.diff}`;
  m.classList.add('show');
  board.animate(
    [{filter:'brightness(1)'}, {filter:'brightness(1.4)'}, {filter:'brightness(1)'}],
    {duration: 800, iterations: 2}
  );
  showToast(`🎉 Solved! ${score} pts`);
}

// ============= SHARE =============
const modal = $('shareModal');
function getShareURL() {
  return location.protocol === 'file:' ? '' : location.origin + location.pathname;
}
function openShareModal() {
  const url = getShareURL();
  if (!url) {
    alert('To share with friends, host this game online (e.g., GitHub Pages, Cloudflare Pages, or Tencent Cloud).\n\n' +
      'Or send the puzzle.html file directly via WeChat/AirDrop/Email.');
    return;
  }
  $('shareLink').value = url;
  $('wechatHelp').style.display = 'none';
  modal.classList.add('show');
}
$('shareBtn').onclick = openShareModal;
$('closeShareBtn').onclick = () => modal.classList.remove('show');
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });

$('copyBtn').onclick = async () => {
  const url = $('shareLink').value;
  try {
    await navigator.clipboard.writeText(url);
    showToast('✅ Link copied!');
  } catch(e) {
    $('shareLink').select();
    $('shareLink').setSelectionRange(0, 9999);
    try { document.execCommand('copy'); showToast('✅ Link copied!'); }
    catch(_) { showToast('Copy not supported — please select and copy manually'); }
  }
};

$('sysShareBtn').onclick = async () => {
  const url = getShareURL();
  if (navigator.share) {
    try { await navigator.share({title:'🧩 XX Puzzle Party', text:"Let's play puzzles!", url}); }
    catch(_) {}
  } else {
    showToast('System share not supported here — use Copy');
  }
};
$('wechatBtn').onclick = () => {
  $('wechatHelp').style.display = 'block';
};
$('smsBtn').onclick = () => {
  const url = getShareURL();
  location.href = `sms:?&body=${encodeURIComponent("Let's play puzzles! " + url)}`;
};
$('mailBtn').onclick = () => {
  const url = getShareURL();
  location.href = `mailto:?subject=${encodeURIComponent('🧩 XX Puzzle Party')}&body=${encodeURIComponent("Let's play puzzles!\n\n" + url)}`;
};

window.addEventListener('error', e => {
  console.error('Puzzle error:', e.message);
});
