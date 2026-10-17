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
    diagram = `<div style="margin:12px 0;text-align:center;"><svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:400px;background:#1a1e26;border-radius:8px;">
  <style>
    .pushrod { animation: push 2.5s ease-in-out infinite; }
    .piston-rear { animation: moveRear 2.5s ease-in-out infinite; }
    .piston-front { animation: moveFront 2.5s ease-in-out infinite; }
    .fluid-rear { animation: flow 2.5s ease-in-out infinite; }
    .fluid-front { animation: flow 2.5s ease-in-out infinite 0.1s; }
    @keyframes push {
      0%, 100% { transform: translateX(0); }
      40%, 60% { transform: translateX(18px); }
    }
    @keyframes moveRear {
      0%, 100% { transform: translateX(0); }
      40%, 60% { transform: translateX(12px); }
    }
    @keyframes moveFront {
      0%, 100% { transform: translateX(0); }
      45%, 65% { transform: translateX(10px); }
    }
    @keyframes flow {
      0%, 30% { opacity: 0.2; }
      50%, 70% { opacity: 1; }
      100% { opacity: 0.2; }
    }
  </style>
  <rect x="50" y="80" width="280" height="50" rx="8" fill="#555" stroke="#888" stroke-width="2"/>
  <rect x="150" y="30" width="80" height="42" rx="4" fill="#88ccff" opacity="0.65" stroke="#aaddff"/>
  <text x="190" y="56" text-anchor="middle" fill="#fff" font-size="11">Reservoir</text>
  <g class="pushrod">
    <rect x="8" y="96" width="42" height="18" fill="#888" rx="2"/>
  </g>
  <text x="30" y="130" text-anchor="middle" fill="#ccc" font-size="10">Pushrod</text>
  <g class="piston-rear">
    <rect x="70" y="90" width="36" height="30" fill="#aaa" stroke="#ccc" rx="2"/>
    <text x="88" y="110" text-anchor="middle" fill="#fff" font-size="9">Rear</text>
  </g>
  <g class="piston-front">
    <rect x="190" y="90" width="36" height="30" fill="#aaa" stroke="#ccc" rx="2"/>
    <text x="208" y="110" text-anchor="middle" fill="#fff" font-size="9">Front</text>
  </g>
  <circle class="fluid-rear" cx="100" cy="105" r="5" fill="#c45c26"/>
  <circle class="fluid-front" cx="220" cy="105" r="5" fill="#c45c26"/>
  <text x="100" y="155" text-anchor="middle" fill="#c45c26" font-size="10">Rear circuit</text>
  <text x="220" y="155" text-anchor="middle" fill="#c45c26" font-size="10">Front circuit</text>
  <text x="200" y="190" text-anchor="middle" fill="#9bb0d0" font-size="12">Dual-Circuit Master Cylinder</text>
  <text x="200" y="210" text-anchor="middle" fill="#8b95a5" font-size="10">Pushrod moves both pistons → pressure out both circuits</text>
  <text x="200" y="226" text-anchor="middle" fill="#8b95a5" font-size="9">Leak in one circuit still leaves the other working</text>
</svg></div>`;
  }
  panelContent.innerHTML = diagram + `
    <p>${sys.description}</p>
    <h3>How it works</h3>
    <p>${sys.howItWorks}</p>
    <h3>Common issues</h3>
    <ul>${sys.commonIssues.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>Key parts</h3>

    <h3>Further reading</h3>
    <ul>
      <li><a href="https://www.jbugs.com/single-vs-dual-circuit-master-cylinder-classic-vw.html" target="_blank" style="color:#7eb8ff">JBugs: Single vs Dual Circuit Master Cylinders</a> — clear explanation of Type 1 dual-circuit systems (1967+)</li>
      <li><a href="https://thesamba.com/vw/archives/manuals/ghia.php" target="_blank" style="color:#7eb8ff">TheSamba Ghia Manuals Archive</a> — owner’s manuals, parts books, wiring diagrams</li>
      <li><a href="https://www.californianclassics.co.uk/karmann-ghia-wiring-diagrams/" target="_blank" style="color:#7eb8ff">Californian Classics Wiring Diagrams</a> — year-specific Ghia wiring</li>
    </ul>

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
