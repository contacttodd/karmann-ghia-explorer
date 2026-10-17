// Karmann Ghia Explorer — cascading selectors
const panel = document.getElementById('panel');
const panelTitle = document.getElementById('panel-title');
const panelContent = document.getElementById('panel-content');
const panelClose = document.getElementById('panel-close');
const notesBtn = document.getElementById('notes-btn');
const areaSelect = document.getElementById('area-select');
const partSelect = document.getElementById('part-select');

function openPanel(id) {
  const sys = SYSTEMS[id];
  if (!sys) return;
  panelTitle.textContent = sys.name;
  let diagram = '';
  if (id === 'brakes') {
    diagram = `<div style="margin:12px 0;text-align:center;"><svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:400px;background:#1a1e26;border-radius:8px;">
  <rect x="40" y="70" width="280" height="50" rx="8" fill="#666" stroke="#999" stroke-width="2"/>
  <rect x="140" y="25" width="80" height="40" rx="4" fill="#88ccff" opacity="0.7" stroke="#aaddff"/>
  <text x="180" y="50" text-anchor="middle" fill="#fff" font-size="11">Reservoir</text>
  <rect x="70" y="80" width="40" height="30" fill="#aaa" stroke="#ccc"/>
  <rect x="180" y="80" width="40" height="30" fill="#aaa" stroke="#ccc"/>
  <text x="90" y="100" text-anchor="middle" fill="#fff" font-size="10">Rear</text>
  <text x="200" y="100" text-anchor="middle" fill="#fff" font-size="10">Front</text>
  <rect x="10" y="88" width="30" height="14" fill="#888"/>
  <text x="25" y="115" text-anchor="middle" fill="#ccc" font-size="10">Pushrod</text>
  <circle cx="100" cy="95" r="4" fill="#c45c26"/>
  <circle cx="210" cy="95" r="4" fill="#c45c26"/>
  <text x="100" y="140" text-anchor="middle" fill="#c45c26" font-size="10">Rear circuit</text>
  <text x="210" y="140" text-anchor="middle" fill="#c45c26" font-size="10">Front circuit</text>
  <text x="200" y="190" text-anchor="middle" fill="#9bb0d0" font-size="13">Dual-Circuit Master Cylinder (1972 Ghia)</text>
  <text x="200" y="208" text-anchor="middle" fill="#8b95a5" font-size="10">Separate front & rear chambers — leak in one still leaves the other</text>
</svg></div>`;
  }
  panelContent.innerHTML = diagram + `
    <p>${sys.description}</p>
    <h3>How it works</h3>
    <p>${sys.howItWorks}</p>
    <h3>Common issues</h3>
    <ul>${sys.commonIssues.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>Key parts</h3>
    <div class="part-list">
      ${sys.parts.map(p => `<div class="part-item"><strong>${p.name}</strong><br><span style="color:#9aa3b2;font-size:0.8rem">${p.desc}</span></div>`).join('')}
    </div>
  `;
  panel.classList.add('open');
}

function showNotes() {
  const saved = localStorage.getItem(NOTES_KEY) || '';
  panelTitle.textContent = 'My Notes';
  panelContent.innerHTML = `
    <p style="font-size:0.85rem;color:#9aa3b2;margin-top:0">Personal notes for your car. Saved locally on this device.</p>
    <textarea id="notes-area" placeholder="Add observations, torque values you measured, parts replaced, etc.">${saved}</textarea>
    <button id="save-notes">Save Notes</button>
  `;
  document.getElementById('save-notes').onclick = () => {
    localStorage.setItem(NOTES_KEY, document.getElementById('notes-area').value);
    alert('Notes saved on this device.');
  };
  panel.classList.add('open');
}

function populateParts(areaId) {
  partSelect.innerHTML = '<option value="">Select part…</option>';
  if (!areaId || !AREAS[areaId]) {
    partSelect.disabled = true;
    return;
  }
  AREAS[areaId].parts.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    partSelect.appendChild(opt);
  });
  partSelect.disabled = false;
}

areaSelect.addEventListener('change', () => {
  populateParts(areaSelect.value);
  panel.classList.remove('open');
});

partSelect.addEventListener('change', () => {
  if (partSelect.value) openPanel(partSelect.value);
});

panelClose.onclick = () => panel.classList.remove('open');
notesBtn.onclick = showNotes;

document.getElementById('nav').style.display = 'none';
