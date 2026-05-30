const data = {
  appName: 'Resource Root',
  years: [
    { id: 'year1', label: '1st Year', subjects: ['Anatomy', 'Physiology', 'Biochemistry'] },
    { id: 'year2', label: '2nd Year', subjects: ['Pharmacology', 'Pathology', 'Microbiology', 'Forensic Medicine'] },
    { id: 'year3', label: '3rd Year', subjects: ['Community Medicine', 'ENT', 'Ophthalmology'] },
    { id: 'year4', label: '4th Year', subjects: ['Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Obstetrics & Gynecology'] }
  ]
};

const hint = document.getElementById('hint');
const nodeLayer = document.getElementById('nodeLayer');
const linkLayer = document.getElementById('linkLayer');
const ns = 'http://www.w3.org/2000/svg';
let selectedYearId = null;

const subjectLayouts = {
  3: {
    mobile: [{ x: 22, y: 70 }, { x: 50, y: 82 }, { x: 78, y: 70 }],
    tablet: [{ x: 28, y: 66 }, { x: 50, y: 78 }, { x: 72, y: 66 }],
    desktop: [{ x: 28, y: 64 }, { x: 50, y: 76 }, { x: 72, y: 64 }]
  },
  4: {
    mobile: [{ x: 16, y: 70 }, { x: 39, y: 82 }, { x: 61, y: 82 }, { x: 84, y: 70 }],
    tablet: [{ x: 20, y: 68 }, { x: 40, y: 80 }, { x: 60, y: 80 }, { x: 80, y: 68 }],
    desktop: [{ x: 20, y: 66 }, { x: 40, y: 78 }, { x: 60, y: 78 }, { x: 80, y: 66 }]
  },
  5: {
    mobile: [{ x: 12, y: 70 }, { x: 31, y: 80 }, { x: 50, y: 86 }, { x: 69, y: 80 }, { x: 88, y: 70 }],
    tablet: [{ x: 14, y: 68 }, { x: 32, y: 80 }, { x: 50, y: 86 }, { x: 68, y: 80 }, { x: 86, y: 68 }],
    desktop: [{ x: 14, y: 66 }, { x: 32, y: 78 }, { x: 50, y: 84 }, { x: 68, y: 78 }, { x: 86, y: 66 }]
  }
};

function isMobile() {
  return window.matchMedia('(max-width: 640px)').matches;
}
function isTablet() {
  return window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches;
}
function screenVariant() {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
}
function yearLayout() {
  const variant = screenVariant();
  if (variant === 'mobile') {
    return [
      { x: 20, y: 34 },
      { x: 80, y: 34 },
      { x: 20, y: 70 },
      { x: 80, y: 70 }
    ];
  }
  if (variant === 'tablet') {
    return [
      { x: 23, y: 34 },
      { x: 77, y: 34 },
      { x: 23, y: 69 },
      { x: 77, y: 69 }
    ];
  }
  return [
    { x: 24, y: 34 },
    { x: 76, y: 34 },
    { x: 24, y: 68 },
    { x: 76, y: 68 }
  ];
}

function clearTree() {
  nodeLayer.innerHTML = '';
  linkLayer.innerHTML = '<defs><linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="rgba(45,212,191,0.78)" /><stop offset="100%" stop-color="rgba(59,130,246,0.62)" /></linearGradient></defs>';
}

function addNode({ id, label, x, y, type, logoOnly = false, icon = false, onClick }) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `node ${type}${logoOnly ? ' logo-only' : ''}`;
  el.style.left = `${x}%`;
  el.style.top = `${y}%`;
  el.dataset.id = id;

  if (icon) {
    const img = document.createElement('img');
    img.src = 'public/icons/icon_root.png';
    img.alt = 'App logo';
    img.className = 'logo';
    el.appendChild(img);
  }

  const span = document.createElement('span');
  span.className = 'label';
  span.textContent = label;
  el.appendChild(span);

  if (type === 'root top') el.classList.add('top');

  if (onClick) el.addEventListener('click', onClick);
  nodeLayer.appendChild(el);
  return el;
}

function drawConnector(from, to, sourceRadius = 9, targetRadius = 8) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const sx = from.x + ux * sourceRadius;
  const sy = from.y + uy * sourceRadius;
  const ex = to.x - ux * targetRadius;
  const ey = to.y - uy * targetRadius;
  const line = document.createElementNS(ns, 'line');
  line.setAttribute('x1', sx.toString());
  line.setAttribute('y1', sy.toString());
  line.setAttribute('x2', ex.toString());
  line.setAttribute('y2', ey.toString());
  line.setAttribute('stroke', 'url(#branchGradient)');
  line.setAttribute('stroke-width', '1.1');
  line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('opacity', '0.95');
  linkLayer.appendChild(line);
}

function renderHome() {
  clearTree();
  hint.textContent = 'Choose a year to explore subjects.';

  const root = { x: 50, y: 50 };
  addNode({ id: 'app-root', label: data.appName, x: root.x, y: root.y, type: 'root', logoOnly: true, icon: true });

  data.years.forEach((year, i) => {
    const p = yearLayout()[i];
    addNode({
      id: year.id,
      label: year.label,
      x: p.x,
      y: p.y,
      type: 'year',
      onClick: () => {
        selectedYearId = year.id;
        render();
      }
    });
    drawConnector(root, p, 10, 8);
  });
}

function renderYear() {
  clearTree();
  const year = data.years.find((y) => y.id === selectedYearId);
  if (!year) {
    renderHome();
    return;
  }

  hint.textContent = 'Tap top logo to go back.';
  const variant = screenVariant();
  const topRoot = { x: 50, y: variant === 'mobile' ? 16 : 12 };
  const centerYear = { x: 50, y: variant === 'mobile' ? 44 : variant === 'tablet' ? 50 : 54 };

  addNode({
    id: 'app-root-top',
    label: data.appName,
    x: topRoot.x,
    y: topRoot.y,
    type: 'root top',
    logoOnly: true,
    icon: true,
    onClick: () => {
      selectedYearId = null;
      render();
    }
  });

  addNode({ id: 'selected-year', label: year.label, x: centerYear.x, y: centerYear.y, type: 'root' });
  drawConnector(topRoot, centerYear, 8, 10);

  const layout = subjectLayouts[year.subjects.length][variant];

  year.subjects.forEach((subject, i) => {
    const p = layout[i];
    addNode({ id: `${year.id}-${i}`, label: subject, x: p.x, y: p.y, type: 'subject' });
    drawConnector(centerYear, p, 9, 7);
  });
}

function render() {
  if (selectedYearId) {
    renderYear();
  } else {
    renderHome();
  }
}

window.addEventListener('resize', () => render());
render();
