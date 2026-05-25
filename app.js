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

// ============= I18N (English / Chinese) =============
const I18N = {
  en: {
    appTitle: '🧩 XX Puzzle Party',
    total: 'Total',
    share: '📤 Share',
    label_picture: '1. Picture',
    upload: 'Upload Image',
    label_pieces: '2. Pieces',
    label_diff: '3. Difficulty',
    diff_easy: '1 - Easy',
    diff_hard: '5 - Hard',
    start: '▶ Start Game',
    label_time: 'Time · Solved',
    pause: '⏸ Pause',
    resume: '▶ Resume',
    preview_label: '🖼️ Original',
    preview_empty: 'Pick a picture to see preview',
    library: '🖼️ Image Library',
    library_count: 'saved',
    library_clear: 'Clear All',
    library_empty: "No saved images yet — upload one above and it'll be saved here for next time.",
    history: '📜 History',
    history_clear: 'Clear',
    history_empty: 'No games yet — finish one to see it here!',
    history_pts: 'pts',
    history_diff: 'diff',
    settings_title: '⚙️ Settings',
    settings_desc: 'Customize how the game behaves.',
    settings_lang: '🌐 Language',
    settings_lang_desc: 'Choose your preferred language.',
    settings_focus: '🌙 Focus Mode',
    settings_focus_desc: 'Dim everything except the puzzle board for a cleaner view',
    settings_max: '🔍 Maximize on Start',
    settings_max_desc: 'Auto-expand the board and fade other panels when a game begins',
    settings_offline: '📥 Save for Offline Use',
    settings_offline_desc: 'Download a single HTML file you can play anywhere — no internet needed. Share it via WeChat or AirDrop.',
    download: 'Download',
    downloading: 'Building...',
    done: 'Done',
    close: 'Close',
    share_title: '📤 Share with friends',
    share_desc: 'Copy this link and send it via Message, WeChat, or any chat app:',
    copy: 'Copy',
    share_system: '📱 System Share',
    share_wechat: '💬 WeChat Tip',
    share_sms: '💌 Message / SMS',
    share_email: '✉️ Email',
    wechat_tip: '<b style="color:#07c160">WeChat sharing:</b><br>1. Tap <b>Copy</b> above<br>2. Open WeChat → choose a chat<br>3. Long-press the input box → <b>Paste</b><br>4. Send — friends tap the link to play',
    win_title: 'Puzzle Solved!',
    win_time: 'Time',
    win_score: 'Score',
    win_again: '▶ Play Again',
    drop_hint_uploaded: '✓ Cropped & saved · click to change',
    drop_hint_library: '📚 From library · click to change',
    delete_btn: 'Delete',
    toast_copied: '✅ Link copied!',
    toast_copy_unsupported: 'Copy not supported — please select and copy manually',
    toast_solved: '🎉 Solved! {score} pts',
    toast_lib_loaded: '✅ Loaded from library',
    toast_lib_cleared: 'Library cleared',
    toast_history_cleared: 'History cleared',
    toast_focus_on: '🌙 Focus mode on',
    toast_focus_off: '☀️ Focus mode off',
    toast_max_on: '🔍 Will maximize on start',
    toast_max_off: '📐 Normal layout on start',
    toast_download_ok: '✅ Downloaded — share this file with friends!',
    toast_download_fail: 'Download failed: {err}',
    toast_image_only: 'Please choose an image file',
    toast_process_fail: 'Could not process image — try another',
    toast_storage_full: 'Could not save history (storage full?)',
    toast_share_unsupported: 'System share not supported here — use Copy',
    confirm_delete_image: 'Delete this image?',
    confirm_clear_library: 'Delete all {n} saved images?',
    confirm_clear_history: 'Clear all history?',
    win_info: '{n}×{n} · Difficulty {d}',
    history_row: '{score} pts · {n}×{n} · diff {d} · {time}',
    share_text: "Let's play puzzles!",
    levels: '🏀 Levels',
    levels_subtitle: '— Slam Dunk Campaign',
    level_completed: 'Completed',
    level_total_score: 'Total',
    reset_progress: 'Reset',
    confirm_reset_levels: 'Reset all level progress? You will lose all unlocks and scores.',
    toast_level_locked: '🔒 Complete the previous level first',
    toast_level_unlocked: '🎉 Level {n} unlocked!',
    toast_level_complete: '⭐ Level {n} complete · {score} pts',
    level_lock_msg: 'Locked',
  },
  zh: {
    appTitle: '🧩 XX 拼图派对',
    total: '总分',
    share: '📤 分享',
    label_picture: '1. 图片',
    upload: '上传图片',
    label_pieces: '2. 拼块',
    label_diff: '3. 难度',
    diff_easy: '1 - 简单',
    diff_hard: '5 - 困难',
    start: '▶ 开始游戏',
    label_time: '用时 · 完成',
    pause: '⏸ 暂停',
    resume: '▶ 继续',
    preview_label: '🖼️ 原图',
    preview_empty: '选择图片以查看预览',
    library: '🖼️ 图片库',
    library_count: '张已保存',
    library_clear: '全部清除',
    library_empty: '暂无保存的图片 — 上传一张图片后会自动保存到这里。',
    history: '📜 历史记录',
    history_clear: '清除',
    history_empty: '暂无游戏 — 完成一局后会显示在这里！',
    history_pts: '分',
    history_diff: '难度',
    settings_title: '⚙️ 设置',
    settings_desc: '自定义游戏行为。',
    settings_lang: '🌐 语言',
    settings_lang_desc: '选择你偏好的语言。',
    settings_focus: '🌙 专注模式',
    settings_focus_desc: '游戏过程中调暗除拼图区域外的其他界面',
    settings_max: '🔍 开始时最大化',
    settings_max_desc: '游戏开始时自动放大拼图区域并淡化其他面板',
    settings_offline: '📥 保存为离线版',
    settings_offline_desc: '下载一个完整的 HTML 文件，无需联网即可游玩。可通过微信或 AirDrop 分享。',
    download: '下载',
    downloading: '生成中…',
    done: '完成',
    close: '关闭',
    share_title: '📤 分享给朋友',
    share_desc: '复制下方链接，通过短信、微信或聊天应用发送：',
    copy: '复制',
    share_system: '📱 系统分享',
    share_wechat: '💬 微信',
    share_sms: '💌 短信',
    share_email: '✉️ 邮件',
    wechat_tip: '<b style="color:#07c160">微信分享：</b><br>1. 点击上方<b>复制</b><br>2. 打开微信 → 选择聊天<br>3. 长按输入框 → <b>粘贴</b><br>4. 发送 — 好友点击链接即可游玩',
    win_title: '拼图完成！',
    win_time: '用时',
    win_score: '得分',
    win_again: '▶ 再玩一次',
    drop_hint_uploaded: '✓ 已裁剪并保存 · 点击更换',
    drop_hint_library: '📚 来自图片库 · 点击更换',
    delete_btn: '删除',
    toast_copied: '✅ 链接已复制！',
    toast_copy_unsupported: '此设备不支持自动复制 — 请手动选中复制',
    toast_solved: '🎉 拼图完成！{score} 分',
    toast_lib_loaded: '✅ 已从图片库加载',
    toast_lib_cleared: '图片库已清空',
    toast_history_cleared: '历史记录已清空',
    toast_focus_on: '🌙 专注模式已开启',
    toast_focus_off: '☀️ 专注模式已关闭',
    toast_max_on: '🔍 开始时会自动最大化',
    toast_max_off: '📐 开始时保持正常布局',
    toast_download_ok: '✅ 下载完成 — 把文件分享给朋友吧！',
    toast_download_fail: '下载失败：{err}',
    toast_image_only: '请选择图片文件',
    toast_process_fail: '图片处理失败 — 请换一张试试',
    toast_storage_full: '无法保存历史记录（存储已满？）',
    toast_share_unsupported: '此设备不支持系统分享 — 请使用复制',
    confirm_delete_image: '删除这张图片？',
    confirm_clear_library: '删除全部 {n} 张已保存的图片？',
    confirm_clear_history: '清空全部历史记录？',
    win_info: '{n}×{n} · 难度 {d}',
    history_row: '{score} 分 · {n}×{n} · 难度 {d} · {time}',
    share_text: '一起来玩拼图吧！',
    levels: '🏀 关卡',
    levels_subtitle: '— 灌篮高手系列',
    level_completed: '已完成',
    level_total_score: '总得分',
    reset_progress: '重置',
    confirm_reset_levels: '重置全部关卡进度？将清除所有解锁和得分。',
    toast_level_locked: '🔒 请先完成上一关',
    toast_level_unlocked: '🎉 第 {n} 关已解锁！',
    toast_level_complete: '⭐ 第 {n} 关完成 · {score} 分',
    level_lock_msg: '未解锁',
  },
};

let currentLang = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem('puzzle_settings_v1') || '{}');
    if (saved.lang) return saved.lang;
  } catch(_){}
  return (navigator.language || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en';
})();

function t(key, vars) {
  let s = (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

function applyLanguage() {
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
  document.title = t('appTitle');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  // Update language toggle active state
  document.querySelectorAll('#langToggle .lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  // Re-render dynamic content with new strings
  if (typeof renderHistory === 'function') renderHistory();
  if (typeof renderLibrary === 'function') renderLibrary();
  // Pause button might be showing "Pause" or "Resume"
  if ($('pauseBtn') && !$('pauseBtn').disabled) {
    $('pauseBtn').textContent = state && state.paused ? t('resume') : t('pause');
  }
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
  catch(e) { showToast(t('toast_storage_full')); }
};
function renderHistory() {
  const h = loadHistory();
  $('totalScore').textContent = h.reduce((s,g) => s + (g.score||0), 0);
  if (!h.length) {
    $('history').innerHTML = `<div class="empty">${t('history_empty')}</div>`;
    return;
  }
  $('history').innerHTML = h.slice().reverse().map(g => {
    const meta = t('history_row', {score:g.score, n:g.gridN, d:g.diff, time:g.timeStr});
    return `
    <div class="game-row">
      <img src="${g.thumb}" alt="">
      <div class="meta">
        <div>${meta}</div>
        <div>${new Date(g.date).toLocaleString()}</div>
      </div>
    </div>`;
  }).join('');
}
$('clearBtn').onclick = () => {
  if (!loadHistory().length) return;
  if (confirm(t('confirm_clear_history'))) {
    saveHistory([]);
    renderHistory();
    showToast(t('toast_history_cleared'));
  }
};
renderHistory();

// ============= SETTINGS (Focus Mode + Maximize on Start) =============
const SETTINGS_KEY = 'puzzle_settings_v1';
const defaultSettings = { focus: false, maximize: true };
function loadSettings() {
  try { return { ...defaultSettings, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') }; }
  catch(e) { return { ...defaultSettings }; }
}
function saveSettings(s) { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }
const settings = loadSettings();

function applyFocus() {
  document.body.classList.toggle('focus-mode', !!settings.focus);
}
applyFocus();

// Settings modal wiring
$('settingsBtn').onclick = () => {
  $('setFocus').checked = !!settings.focus;
  $('setMaximize').checked = !!settings.maximize;
  $('settingsModal').classList.add('show');
};
$('closeSettingsBtn').onclick = () => $('settingsModal').classList.remove('show');
$('settingsModal').addEventListener('click', e => {
  if (e.target === $('settingsModal')) $('settingsModal').classList.remove('show');
});
$('setFocus').addEventListener('change', e => {
  settings.focus = e.target.checked;
  saveSettings(settings);
  applyFocus();
  showToast(settings.focus ? t('toast_focus_on') : t('toast_focus_off'));
});
$('setMaximize').addEventListener('change', e => {
  settings.maximize = e.target.checked;
  saveSettings(settings);
  showToast(settings.maximize ? t('toast_max_on') : t('toast_max_off'));
});

// Language toggle (Settings → 🌐 Language)
document.querySelectorAll('#langToggle .lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const newLang = btn.dataset.lang;
    if (newLang === currentLang) return;
    currentLang = newLang;
    settings.lang = newLang;
    saveSettings(settings);
    applyLanguage();
  });
});

// Download a single self-contained HTML file (everything inlined)
$('downloadOfflineBtn').addEventListener('click', async () => {
  const btn = $('downloadOfflineBtn');
  btn.disabled = true;
  btn.textContent = t('downloading');
  try {
    // Fetch the current HTML and JS source
    const [htmlRes, jsRes] = await Promise.all([
      fetch('index.html'),
      fetch(document.querySelector('script[src*="app.js"]').src),
    ]);
    let html = await htmlRes.text();
    const js = await jsRes.text();
    // Inline the script (replace <script src="app.js?v=..."></script> with inline)
    html = html.replace(/<script\s+src="app\.js[^"]*"[^>]*><\/script>/,
      '<script>\n' + js + '\n</script>');
    // Remove manifest + service worker references (offline file can't use them)
    html = html.replace(/<link\s+rel="manifest"[^>]*>/g, '');
    // Trigger download
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'XX-Puzzle-Party-offline.html';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    showToast(t('toast_download_ok'));
  } catch (e) {
    console.error(e);
    showToast(t('toast_download_fail', {err: e.message}));
  } finally {
    btn.disabled = false;
    btn.textContent = t('download');
  }
});

// Register service worker for offline support (only on https or localhost)
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.warn('Service Worker registration failed:', err);
    });
  });
}

// ============= IMAGE LIBRARY (IndexedDB) =============
const DB_NAME = 'puzzle-party-db';
const STORE = 'images';
let dbPromise = null;
function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}
async function dbCall(mode, fn) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const store = tx.objectStore(STORE);
    let result;
    fn(store, v => result = v, reject);
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
  });
}
const lib = {
  add: rec => dbCall('readwrite', (s, ok) => { const r = s.add(rec); r.onsuccess = () => ok(r.result); }),
  list: () => dbCall('readonly', (s, ok) => { const r = s.getAll(); r.onsuccess = () => ok(r.result); }),
  get: id => dbCall('readonly', (s, ok) => { const r = s.get(id); r.onsuccess = () => ok(r.result); }),
  del: id => dbCall('readwrite', s => s.delete(id)),
  clear: () => dbCall('readwrite', s => s.clear()),
};

let currentLibId = null; // which library item is currently selected (highlighted)
async function renderLibrary() {
  let items;
  try { items = await lib.list(); }
  catch(e) { console.error('Library list failed', e); return; }
  items.sort((a,b) => b.addedAt - a.addedAt); // newest first
  const wrap = $('library');
  $('libCount').textContent = items.length ? `· ${items.length} ${t('library_count')}` : '';
  if (!items.length) {
    wrap.innerHTML = `<div class="lib-empty">${t('library_empty')}</div>`;
    return;
  }
  wrap.innerHTML = '';
  items.forEach(rec => {
    const div = document.createElement('div');
    div.className = 'lib-item' + (rec.id === currentLibId ? ' active' : '');
    div.title = rec.name + ' · ' + new Date(rec.addedAt).toLocaleString();
    div.innerHTML = `<img src="${rec.thumb}" alt=""><button class="lib-del" title="${t('delete_btn')}">✕</button>`;
    div.onclick = e => {
      if (e.target.classList.contains('lib-del')) {
        e.stopPropagation();
        if (confirm(t('confirm_delete_image'))) {
          lib.del(rec.id).then(renderLibrary);
        }
        return;
      }
      useLibraryImage(rec);
    };
    wrap.appendChild(div);
  });
}
async function useLibraryImage(rec) {
  if (state.imgURL) URL.revokeObjectURL(state.imgURL);
  state.imgURL = URL.createObjectURL(rec.blob);
  state.imgFile = null;
  state.activeLevelIdx = null;
  currentLibId = rec.id;
  showSelectedFile(rec.name, rec.thumb, t('drop_hint_library'));
  // Preview
  $('previewImg').src = state.imgURL;
  $('previewImg').style.display = 'block';
  $('previewEmpty').style.display = 'none';
  $('startBtn').disabled = false;
  renderLibrary(); // re-render to show "active" highlight
  showToast(t('toast_lib_loaded'));
}
$('clearLibBtn').onclick = async () => {
  const items = await lib.list();
  if (!items.length) return;
  if (confirm(t('confirm_clear_library', {n:items.length}))) {
    await lib.clear();
    currentLibId = null;
    renderLibrary();
    showToast(t('toast_lib_cleared'));
  }
};
renderLibrary();

// ============= LEVELS (Slam Dunk Campaign) =============
const LEVELS_KEY = 'puzzle_levels_v1';
const loadLevelProgress = () => {
  try { return JSON.parse(localStorage.getItem(LEVELS_KEY) || '{}'); }
  catch(_) { return {}; }
};
const saveLevelProgress = p => localStorage.setItem(LEVELS_KEY, JSON.stringify(p));
function isLevelUnlocked(idx) {
  if (idx === 0) return true;
  const p = loadLevelProgress();
  return !!(p[idx] && p[idx].completed) || !!(p[idx - 1] && p[idx - 1].completed);
}
function levelStats() {
  const p = loadLevelProgress();
  let done = 0, total = 0;
  Object.values(p).forEach(v => { if (v.completed) { done++; total += v.score || 0; } });
  return { done, total };
}
function renderLevels() {
  if (!window.SLAM_DUNK_LEVELS) return;
  const wrap = $('levels');
  const p = loadLevelProgress();
  const { done, total } = levelStats();
  $('levelDone').textContent = done;
  $('levelTotal').textContent = total;
  wrap.innerHTML = '';
  SLAM_DUNK_LEVELS.forEach((lvl, i) => {
    const unlocked = isLevelUnlocked(i);
    const rec = p[i];
    const completed = !!(rec && rec.completed);
    const isCurrent = unlocked && !completed && (i === 0 || (p[i-1] && p[i-1].completed));
    const card = document.createElement('div');
    card.className = 'level-card' + (completed ? ' completed' : '') +
      (!unlocked ? ' locked' : '') + (isCurrent ? ' current' : '');
    card.title = `Level ${i+1}: ${lvl.name}` + (completed ? ` (✓ ${rec.score} pts)` : '');
    card.innerHTML = `
      <img src="${lvl.image}" alt="">
      <div class="level-overlay">
        <div class="level-name">${lvl.name}</div>
      </div>
      <div class="level-num">LV ${i+1}</div>
      ${completed ? `<div class="level-score-badge">${rec.score}</div>` : ''}
      ${!unlocked ? `<div class="level-lock">🔒</div>` : ''}
    `;
    card.addEventListener('click', () => {
      if (!unlocked) { showToast(t('toast_level_locked')); return; }
      startLevel(i);
    });
    wrap.appendChild(card);
  });
}
function startLevel(idx) {
  const lvl = SLAM_DUNK_LEVELS[idx];
  if (!lvl) return;
  state.gridN = 10;
  state.diff = 5;
  state.imgURL = lvl.image;
  state.imgFile = null;
  state.activeLevelIdx = idx;
  $('previewImg').src = state.imgURL;
  $('previewImg').style.display = 'block';
  $('previewEmpty').style.display = 'none';
  showSelectedFile(`LV ${idx+1} · ${lvl.name}`, state.imgURL, lvl.subtitle);
  $('startBtn').disabled = false;
  buildPuzzle();
}
$('resetLevelsBtn').onclick = () => {
  if (levelStats().done === 0) return;
  if (confirm(t('confirm_reset_levels'))) {
    saveLevelProgress({});
    renderLevels();
  }
};
renderLevels();

// ============= FILE UPLOAD =============
const dropEl = $('drop');
const fileInput = $('file');

// Center-crop an image file into a square. Returns { blob, thumbDataURL }.
function cropToSquare(file) {
  return new Promise((resolve, reject) => {
    const objURL = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      const side = Math.min(im.naturalWidth, im.naturalHeight);
      const sx = Math.floor((im.naturalWidth - side) / 2);
      const sy = Math.floor((im.naturalHeight - side) / 2);
      const out = Math.min(side, 1600);
      const c = document.createElement('canvas');
      c.width = c.height = out;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(im, sx, sy, side, side, 0, 0, out, out);
      // Thumbnail (120x120)
      const tc = document.createElement('canvas');
      tc.width = tc.height = 120;
      tc.getContext('2d').drawImage(c, 0, 0, 120, 120);
      const thumbDataURL = tc.toDataURL('image/jpeg', 0.7);
      c.toBlob(b => {
        URL.revokeObjectURL(objURL);
        if (!b) return reject(new Error('toBlob failed'));
        resolve({ blob: b, thumbDataURL });
      }, 'image/jpeg', 0.92);
    };
    im.onerror = () => { URL.revokeObjectURL(objURL); reject(new Error('Image load failed')); };
    im.src = objURL;
  });
}

async function handleFile(f) {
  if (!f) return;
  if (!f.type.startsWith('image/')) {
    showToast(t('toast_image_only'));
    return;
  }
  $('startBtn').disabled = true;
  let cropped;
  try {
    cropped = await cropToSquare(f);
  } catch (e) {
    console.error(e);
    showToast(t('toast_process_fail'));
    return;
  }
  if (state.imgURL) URL.revokeObjectURL(state.imgURL);
  state.imgURL = URL.createObjectURL(cropped.blob);
  state.imgFile = f;
  state.activeLevelIdx = null;
  showSelectedFile(f.name, state.imgURL, t('drop_hint_uploaded'));
  $('startBtn').disabled = false;
  // Update side-preview
  $('previewImg').src = state.imgURL;
  $('previewImg').style.display = 'block';
  $('previewEmpty').style.display = 'none';
  // Save to library
  try {
    const newId = await lib.add({
      name: f.name,
      blob: cropped.blob,
      thumb: cropped.thumbDataURL,
      addedAt: Date.now(),
    });
    currentLibId = newId;
    renderLibrary();
  } catch(e) { console.error('Library save failed', e); }
}

// Helper: update the upload-info panel to show what's selected
function showSelectedFile(name, thumbURL, hint) {
  dropEl.style.display = 'flex';
  dropEl.classList.remove('upload-info-empty');
  dropEl.innerHTML = '';
  if (thumbURL) {
    const im = document.createElement('img');
    im.className = 'thumb'; im.src = thumbURL; im.alt = '';
    dropEl.appendChild(im);
  }
  const span = document.createElement('span');
  const shortName = name.length > 22 ? name.slice(0,20)+'…' : name;
  span.innerHTML = `<b>${shortName}</b><br><span style="font-size:11px;color:var(--muted)">${hint}</span>`;
  dropEl.appendChild(span);
}

dropEl.addEventListener('click', e => {
  if (e.target !== fileInput) fileInput.click();
});
$('uploadBtn').addEventListener('click', () => fileInput.click());
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
  $('pauseBtn').textContent = t('pause');
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
    $('pauseBtn').textContent = t('pause');
    board.style.filter = '';
    board.style.pointerEvents = '';
  } else {
    state.paused = true;
    state.elapsedBeforePause += Date.now() - state.startTime;
    $('pauseBtn').textContent = t('resume');
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
  // Maximize board + fade everything else (only if user enabled this in Settings)
  if (settings.maximize) {
    document.body.classList.add('playing');
    setTimeout(() => board.scrollIntoView({behavior:'smooth', block:'center'}), 100);
  }
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
  // Compute elapsed BEFORE flipping running flag (currentElapsed() depends on it)
  const elapsed = stopTimer();
  state.running = false;
  state.pieces.forEach(p => p.classList.add('locked'));
  const score = computeScore(elapsed);
  document.body.classList.remove('playing'); // restore normal layout on win
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
  // If this was a level, mark it complete and unlock the next
  if (typeof state.activeLevelIdx === 'number') {
    const idx = state.activeLevelIdx;
    const progress = loadLevelProgress();
    const prev = progress[idx] || {};
    // Keep the best score
    const best = Math.max(prev.score || 0, score);
    progress[idx] = {
      completed: true,
      score: best,
      bestTimeMs: prev.bestTimeMs ? Math.min(prev.bestTimeMs, elapsed) : elapsed,
      lastPlayed: Date.now(),
    };
    const wasNewlyUnlocked = idx + 1 < SLAM_DUNK_LEVELS.length && !(progress[idx+1] && progress[idx+1].completed);
    saveLevelProgress(progress);
    renderLevels();
    showToast(t('toast_level_complete', {n: idx+1, score: best}));
    if (wasNewlyUnlocked) {
      setTimeout(() => showToast(t('toast_level_unlocked', {n: idx+2})), 2700);
    }
    state.activeLevelIdx = null; // clear so a replay doesn't re-fire level logic until startLevel is called again
  }
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
  $('winInfo').textContent = t('win_info', {n: state.gridN, d: state.diff});
  m.classList.add('show');
  board.animate(
    [{filter:'brightness(1)'}, {filter:'brightness(1.4)'}, {filter:'brightness(1)'}],
    {duration: 800, iterations: 2}
  );
  showToast(t('toast_solved', {score: score}));
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
    showToast(t('toast_copied'));
  } catch(e) {
    $('shareLink').select();
    $('shareLink').setSelectionRange(0, 9999);
    try { document.execCommand('copy'); showToast(t('toast_copied')); }
    catch(_) { showToast(t('toast_copy_unsupported')); }
  }
};

$('sysShareBtn').onclick = async () => {
  const url = getShareURL();
  if (navigator.share) {
    try { await navigator.share({title: t('appTitle'), text: t('share_text'), url}); }
    catch(_) {}
  } else {
    showToast(t('toast_share_unsupported'));
  }
};
$('wechatBtn').onclick = () => {
  $('wechatHelp').style.display = 'block';
};
$('smsBtn').onclick = () => {
  const url = getShareURL();
  location.href = `sms:?&body=${encodeURIComponent(t('share_text') + ' ' + url)}`;
};
$('mailBtn').onclick = () => {
  const url = getShareURL();
  location.href = `mailto:?subject=${encodeURIComponent(t('appTitle'))}&body=${encodeURIComponent(t('share_text') + '\n\n' + url)}`;
};

window.addEventListener('error', e => {
  console.error('Puzzle error:', e.message);
});

// Apply saved language on page load (after all elements are wired up)
applyLanguage();
