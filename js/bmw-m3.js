// BMW M3 G80 - Detailed Three.js Model
function buildBMWM3(color) {
  color = color || 0x003399;
  const g = new THREE.Group();

  const M = (c, opts) => new THREE.MeshLambertMaterial({ color: c, ...opts });
  const Ms = (c, metal, rough) => new THREE.MeshStandardMaterial({ color: c, metalness: metal||0.3, roughness: rough||0.4 });

  const bodyColor = color;
  const carbonColor = 0x111111;
  const darkGray = 0x1a1a1a;
  const glassColor = 0x223344;

  // ── MAIN BODY ──────────────────────────────
  // Lower body (wider at bottom)
  const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 4.6), Ms(bodyColor, 0.5, 0.2));
  lowerBody.position.set(0, 0.45, 0); lowerBody.castShadow = true; g.add(lowerBody);

  // Upper body
  const upperBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 4.4), Ms(bodyColor, 0.5, 0.2));
  upperBody.position.set(0, 0.82, 0); upperBody.castShadow = true; g.add(upperBody);

  // Hood (slightly angled)
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.08, 1.6), Ms(bodyColor, 0.5, 0.15));
  hood.position.set(0, 1.0, 1.5); hood.rotation.x = 0.06; hood.castShadow = true; g.add(hood);

  // Trunk lid
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.07, 1.3), Ms(bodyColor, 0.5, 0.15));
  trunk.position.set(0, 1.0, -1.4); trunk.rotation.x = -0.05; g.add(trunk);

  // ── CABIN ──────────────────────────────────
  // Carbon roof
  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.08, 2.0), Ms(carbonColor, 0.6, 0.3));
  roof.position.set(0, 1.55, -0.1); g.add(roof);

  // A-pillar left
  const apL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 0.08), Ms(darkGray));
  apL.position.set(-0.95, 1.28, 0.85); apL.rotation.z = 0.25; g.add(apL);
  // A-pillar right
  const apR = apL.clone(); apR.position.set(0.95, 1.28, 0.85); apR.rotation.z = -0.25; g.add(apR);

  // C-pillar left
  const cpL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 0.08), Ms(darkGray));
  cpL.position.set(-0.95, 1.28, -0.95); cpL.rotation.z = -0.2; g.add(cpL);
  const cpR = cpL.clone(); cpR.position.set(0.95, 1.28, -0.95); cpR.rotation.z = 0.2; g.add(cpR);

  // Windshield
  const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.7),
    new THREE.MeshBasicMaterial({ color: glassColor, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
  windshield.position.set(0, 1.32, 0.82); windshield.rotation.x = -1.1; g.add(windshield);

  // Rear window
  const rearWin = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.55),
    new THREE.MeshBasicMaterial({ color: glassColor, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
  rearWin.position.set(0, 1.3, -0.98); rearWin.rotation.x = 1.15; g.add(rearWin);

  // Side windows x2 each side
  [-1.0, 1.0].forEach(sx => {
    [0.35, -0.35].forEach(sz => {
      const sw = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.35),
        new THREE.MeshBasicMaterial({ color: glassColor, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
      sw.position.set(sx, 1.32, sz); sw.rotation.y = Math.PI / 2; g.add(sw);
    });
    // Mirror
    const mir = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.22), Ms(darkGray));
    mir.position.set(sx * 1.08, 1.18, 0.78); g.add(mir);
  });

  // ── FRONT END ──────────────────────────────
  // Front bumper
  const fBumper = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.32, 0.18), Ms(bodyColor, 0.4, 0.3));
  fBumper.position.set(0, 0.42, 2.35); g.add(fBumper);

  // Front splitter (carbon)
  const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 0.28), Ms(carbonColor, 0.7, 0.2));
  splitter.position.set(0, 0.26, 2.38); g.add(splitter);

  // LEFT kidney grille
  const grillL = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.42, 0.1), Ms(0x0a0a0a, 0.8, 0.3));
  grillL.position.set(-0.45, 0.82, 2.34); g.add(grillL);
  // Grille frame left
  const grillFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.48, 0.06), Ms(darkGray, 0.9, 0.2));
  grillFrameL.position.set(-0.45, 0.82, 2.32); g.add(grillFrameL);

  // RIGHT kidney grille
  const grillR = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.42, 0.1), Ms(0x0a0a0a, 0.8, 0.3));
  grillR.position.set(0.45, 0.82, 2.34); g.add(grillR);
  const grillFrameR = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.48, 0.06), Ms(darkGray, 0.9, 0.2));
  grillFrameR.position.set(0.45, 0.82, 2.32); g.add(grillFrameR);

  // Grille bridge (center bar between kidneys)
  const grillBridge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.48, 0.1), Ms(bodyColor, 0.5, 0.2));
  grillBridge.position.set(0, 0.82, 2.33); g.add(grillBridge);

  // Headlights (slim angular)
  [-1.0, 1.0].forEach(sx => {
    // Main light unit
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.14, 0.1),
      new THREE.MeshBasicMaterial({ color: 0xeeeeff }));
    hl.position.set(sx * 0.82, 1.05, 2.3); g.add(hl);
    // DRL strip
    const drl = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xffffff }));
    drl.position.set(sx * 0.82, 1.0, 2.32); g.add(drl);
    // Headlight point light
    const hpl = new THREE.PointLight(0xfff5cc, 1.5, 18);
    hpl.position.set(sx * 0.82, 1.0, 2.5); g.add(hpl);
  });

  // Front lower vents (3 slots)
  [-0.7, 0, 0.7].forEach(vx => {
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.08), Ms(0x080808));
    vent.position.set(vx, 0.3, 2.36); g.add(vent);
  });

  // Side vents (behind front wheels)
  [-1.1, 1.1].forEach(sx => {
    const sv = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.35), Ms(carbonColor));
    sv.position.set(sx, 0.7, 1.2); g.add(sv);
  });

  // ── REAR END ───────────────────────────────
  // Rear bumper
  const rBumper = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.35, 0.18), Ms(bodyColor, 0.4, 0.3));
  rBumper.position.set(0, 0.42, -2.35); g.add(rBumper);

  // Diffuser (carbon, large)
  const diffuser = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.18, 0.35), Ms(carbonColor, 0.7, 0.3));
  diffuser.position.set(0, 0.28, -2.42); g.add(diffuser);
  // Diffuser fins
  for(let i = -3; i <= 3; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.3), Ms(0x222222));
    fin.position.set(i * 0.28, 0.28, -2.44); g.add(fin);
  }

  // Quad exhausts (2 each side)
  [[-0.65,-0.35],[0.35,0.65]].forEach(([x1,x2]) => {
    [x1, x2].forEach(ex => {
      const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.12, 12),
        Ms(0x888888, 0.9, 0.1));
      exhaust.rotation.x = Math.PI / 2;
      exhaust.position.set(ex, 0.32, -2.5); g.add(exhaust);
      // Dark inside
      const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 12),
        Ms(0x050505));
      inner.rotation.x = Math.PI / 2;
      inner.position.set(ex, 0.32, -2.53); g.add(inner);
    });
  });

  // L-shaped taillights
  [-1.0, 1.0].forEach(sx => {
    // Horizontal part
    const tlH = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xcc0000 }));
    tlH.position.set(sx * 0.78, 0.92, -2.34); g.add(tlH);
    // Vertical part
    const tlV = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.3, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xcc0000 }));
    tlV.position.set(sx * 1.04, 0.85, -2.34); g.add(tlV);
    // Brake light glow
    const tpl = new THREE.PointLight(0xff0000, 0.8, 8);
    tpl.position.set(sx * 0.85, 0.9, -2.4); g.add(tpl);
  });

  // Trunk spoiler (lip)
  const spoiler = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 0.22), Ms(carbonColor, 0.7, 0.2));
  spoiler.position.set(0, 1.08, -1.95); g.add(spoiler);

  // License plate
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.04),
    new THREE.MeshBasicMaterial({ color: 0xffee00 }));
  plate.position.set(0, 0.58, -2.44); g.add(plate);

  // ── WHEELS ─────────────────────────────────
  function buildWheel(x, z) {
    const wg = new THREE.Group();

    // Tire
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.28, 20),
      Ms(0x111111, 0.1, 0.9));
    tire.rotation.z = Math.PI / 2; wg.add(tire);

    // Rim (multi-spoke dark)
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.3, 20),
      Ms(0x222222, 0.9, 0.15));
    rim.rotation.z = Math.PI / 2; wg.add(rim);

    // Spokes (10)
    for(let s = 0; s < 10; s++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.04), Ms(0x1a1a1a, 0.8, 0.2));
      spoke.rotation.x = (s / 10) * Math.PI * 2; wg.add(spoke);
    }

    // Red brake caliper
    const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.15),
      Ms(0xcc0000, 0.3, 0.5));
    caliper.position.set(0, -0.18, 0.05); wg.add(caliper);

    wg.position.set(x, 0.38, z);
    return wg;
  }

  g.userData.wheels = [];
  [[-1.2, 1.45],[1.2, 1.45],[-1.2, -1.45],[1.2, -1.45]].forEach(([wx, wz]) => {
    const w = buildWheel(wx, wz);
    g.add(w); g.userData.wheels.push(w);
  });

  g.userData.carDef = { name: 'BMW M3', id: 'bmw' };
  return g;
}
