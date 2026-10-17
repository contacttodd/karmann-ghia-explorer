// Karmann Ghia Explorer — main app
let scene, camera, renderer, controls;
let currentSystem = null;
let systemGroups = {};
let animationId;
let engineRunning = false;

const viewer = document.getElementById('viewer');
const nav = document.getElementById('nav');
const panel = document.getElementById('panel');
const panelTitle = document.getElementById('panel-title');
const panelContent = document.getElementById('panel-content');
const panelClose = document.getElementById('panel-close');
const notesBtn = document.getElementById('notes-btn');

function initThree() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c0e12);
  scene.fog = new THREE.Fog(0x0c0e12, 12, 28);

  camera = new THREE.PerspectiveCamera(50, viewer.clientWidth / viewer.clientHeight, 0.1, 100);
  camera.position.set(4.5, 2.2, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  viewer.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minDistance = 2.5;
  controls.maxDistance = 14;
  controls.target.set(0, 0.4, 0);

  // Lights
  const ambient = new THREE.AmbientLight(0x404860, 0.6);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 1.1);
  dir.position.set(6, 8, 4);
  dir.castShadow = true;
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0x8899bb, 0.4);
  fill.position.set(-4, 3, -3);
  scene.add(fill);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(10, 32),
    new THREE.MeshStandardMaterial({ color: 0x1a1e26, roughness: 0.9 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  buildCar();
  buildSystems();

  window.addEventListener('resize', onResize);
  animate();
}

function buildCar() {
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'body';

  // Stylized Ghia body (simplified coupe shape)
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x8b1e3f, roughness: 0.35, metalness: 0.4 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.8, roughness: 0.2 });

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 3.6), bodyMat);
  body.position.y = 0.45;
  body.castShadow = true;
  bodyGroup.add(body);

  // Hood / cabin slope
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 1.6), bodyMat);
  cabin.position.set(0, 0.85, -0.3);
  cabin.castShadow = true;
  bodyGroup.add(cabin);

  // Roof
  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.15, 1.2), bodyMat);
  roof.position.set(0, 1.1, -0.2);
  bodyGroup.add(roof);

  // Rear deck (engine area)
  const rear = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 1.0), bodyMat);
  rear.position.set(0, 0.55, 1.4);
  bodyGroup.add(rear);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.18, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.7 });
  [[-0.95, 0.32, 1.1], [0.95, 0.32, 1.1], [-0.95, 0.32, -1.1], [0.95, 0.32, -1.1]].forEach(pos => {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(...pos);
    w.castShadow = true;
    bodyGroup.add(w);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.2, 12), rimMat);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(...pos);
    bodyGroup.add(rim);
  });

  // Front bumper
  const bumper = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 0.12), chromeMat);
  bumper.position.set(0, 0.28, -1.85);
  bodyGroup.add(bumper);

  scene.add(bodyGroup);
}

function buildSystems() {
  // Engine group (rear)
  const eng = new THREE.Group();
  eng.position.set(0, 0.55, 1.5);
  eng.visible = false;

  // Crankcase
  const caseMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.35, 0.9),
    new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.3 })
  );
  caseMesh.position.y = 0.1;
  eng.add(caseMesh);

  // Cylinders (boxer)
  const cylGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.45, 12);
  const cylMat = new THREE.MeshStandardMaterial({ color: 0xc45c26 });
  [-0.35, 0.35].forEach(x => {
    const left = new THREE.Mesh(cylGeo, cylMat);
    left.rotation.z = Math.PI / 2;
    left.position.set(x, 0.15, -0.15);
    eng.add(left);
    const right = new THREE.Mesh(cylGeo, cylMat);
    right.rotation.z = Math.PI / 2;
    right.position.set(x, 0.15, 0.15);
    eng.add(right);
  });

  // Fan housing
  const fanHousing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.28, 0.12, 16),
    new THREE.MeshStandardMaterial({ color: 0x555555 })
  );
  fanHousing.rotation.x = Math.PI / 2;
  fanHousing.position.set(0, 0.35, -0.1);
  eng.add(fanHousing);

  // Simple pistons for animation
  eng.userData.pistons = [];
  [-0.35, 0.35].forEach((x, i) => {
    const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0xeeeeee }));
    p1.position.set(x, 0.15, -0.15);
    eng.add(p1);
    const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0xeeeeee }));
    p2.position.set(x, 0.15, 0.15);
    eng.add(p2);
    eng.userData.pistons.push(p1, p2);
  });

  scene.add(eng);
  systemGroups.engine = eng;

  // Suspension markers
  const susp = new THREE.Group();
  susp.visible = false;
  [[-0.9, 0.3, 1.1], [0.9, 0.3, 1.1], [-0.9, 0.3, -1.1], [0.9, 0.3, -1.1]].forEach(pos => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0x4a6fa5, emissive: 0x1a3050 })
    );
    m.position.set(...pos);
    susp.add(m);
  });
  scene.add(susp);
  systemGroups.suspension = susp;

  // Electrical (simple glowing points)
  const elec = new THREE.Group();
  elec.visible = false;
  const points = [
    { pos: [0, 0.7, 1.6], color: 0xf0c040 },
    { pos: [0.4, 0.5, -1.2], color: 0xf0c040 },
  ];
  points.forEach(p => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshStandardMaterial({ color: p.color, emissive: p.color, emissiveIntensity: 0.6 })
    );
    m.position.set(...p.pos);
    elec.add(m);
  });
  scene.add(elec);
  systemGroups.electrical = elec;

  // Brakes — enhanced master cylinder visualization
  const brakes = new THREE.Group();
  brakes.visible = false;

  // Wheel markers (discs/drums)
  [[-0.95, 0.32, 1.1], [0.95, 0.32, 1.1], [-0.95, 0.32, -1.1], [0.95, 0.32, -1.1]].forEach(pos => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.04, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0xb83232 })
    );
    m.rotation.y = Math.PI / 2;
    m.position.set(...pos);
    brakes.add(m);
  });

  // Master cylinder assembly (front of car, firewall area)
  const mcGroup = new THREE.Group();
  mcGroup.position.set(0.15, 0.55, -1.35);

  // Main body (cast iron cylinder)
  const mcBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 0.38, 16),
    new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.6, roughness: 0.4 })
  );
  mcBody.rotation.z = Math.PI / 2;
  mcGroup.add(mcBody);

  // Dual reservoir on top
  const reservoir = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.12, 0.14),
    new THREE.MeshStandardMaterial({ color: 0x88ccff, transparent: true, opacity: 0.65, roughness: 0.2 })
  );
  reservoir.position.set(0, 0.14, 0);
  mcGroup.add(reservoir);

  // Reservoir cap
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.03, 12),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  cap.position.set(0, 0.215, 0);
  mcGroup.add(cap);

  // Outlet ports
  const portMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8 });
  [[0.12, 0.02, 0.04], [0.12, -0.02, -0.04], [-0.05, 0.02, 0.06]].forEach(p => {
    const port = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.06, 8), portMat);
    port.rotation.z = Math.PI / 2;
    port.position.set(...p);
    mcGroup.add(port);
  });

  // Pushrod (coming from pedal side)
  const pushrod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.22, 8),
    new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  pushrod.rotation.z = Math.PI / 2;
  pushrod.position.set(-0.28, 0, 0);
  mcGroup.add(pushrod);

  brakes.add(mcGroup);
  brakes.userData.master = mcGroup;

  scene.add(brakes);
  systemGroups.brakes = brakes;

  // Cooling
  const cool = new THREE.Group();
  cool.visible = false;
  const fan = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 0.05, 16),
    new THREE.MeshStandardMaterial({ color: 0x5cb85c, emissive: 0x1a4a1a })
  );
  fan.position.set(0, 0.85, 1.5);
  fan.rotation.x = Math.PI / 2;
  cool.add(fan);
  cool.userData.fan = fan;
  scene.add(cool);
  systemGroups.cooling = cool;
}

function showSystem(id) {
  Object.values(systemGroups).forEach(g => g.visible = false);
  if (systemGroups[id]) systemGroups[id].visible = true;
  currentSystem = id;
  engineRunning = (id === 'engine' || id === 'cooling');

  document.querySelectorAll('#nav button').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`#nav button[data-id="${id}"]`);
  if (btn) btn.classList.add('active');

  openPanel(id);
}

function openPanel(id) {
  const sys = SYSTEMS[id];
  if (!sys) return;
  panelTitle.textContent = sys.name;
  panelContent.innerHTML = `
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

function showTroubleshooting() {
  panelTitle.textContent = 'Troubleshooting';
  panelContent.innerHTML = TROUBLESHOOTING.map(t => `
    <div class="trouble-card" data-id="${t.id}">
      <h4>${t.title}</h4>
      <p>${t.symptoms}</p>
    </div>
  `).join('');
  panelContent.querySelectorAll('.trouble-card').forEach(card => {
    card.addEventListener('click', () => showTroubleDetail(card.dataset.id));
  });
  panel.classList.add('open');
  document.querySelectorAll('#nav button').forEach(b => b.classList.remove('active'));
  document.querySelector('#nav button[data-id="trouble"]').classList.add('active');
}

function showTroubleDetail(id) {
  const t = TROUBLESHOOTING.find(x => x.id === id);
  if (!t) return;
  panelTitle.textContent = t.title;
  panelContent.innerHTML = `
    <p><em>${t.symptoms}</em></p>
    <h3>Steps to check</h3>
    <ol>${t.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    <p style="margin-top:12px;font-size:0.8rem;color:#8b95a5">Related systems: ${t.related.join(', ')}</p>
    <button id="back-trouble" style="margin-top:12px;background:#2a3140;color:#ccc;border:none;border-radius:8px;padding:8px 14px;">← Back</button>
  `;
  document.getElementById('back-trouble').onclick = showTroubleshooting;
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

function buildNav() {
  Object.values(SYSTEMS).forEach(sys => {
    const btn = document.createElement('button');
    btn.textContent = sys.short;
    btn.dataset.id = sys.id;
    btn.onclick = () => showSystem(sys.id);
    nav.appendChild(btn);
  });
  const trouble = document.createElement('button');
  trouble.textContent = 'Troubleshoot';
  trouble.className = 'trouble';
  trouble.dataset.id = 'trouble';
  trouble.onclick = showTroubleshooting;
  nav.appendChild(trouble);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  const t = performance.now() * 0.001;

  if (engineRunning && systemGroups.engine) {
    const pistons = systemGroups.engine.userData.pistons;
    if (pistons) {
      pistons.forEach((p, i) => {
        const phase = i * Math.PI / 2;
        p.position.z += Math.sin(t * 8 + phase) * 0.002;
      });
    }
  }
  if (engineRunning && systemGroups.cooling && systemGroups.cooling.userData.fan) {
    systemGroups.cooling.userData.fan.rotation.z += 0.15;
  }

  controls.update();
  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = viewer.clientWidth / viewer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
}

panelClose.onclick = () => panel.classList.remove('open');
notesBtn.onclick = showNotes;

// Init
buildNav();
initThree();
showSystem('engine');
