const data = {
  appName: 'Resource Root',
  years: [
    { id: 'year1', label: '1st Year', subjects: ['Anatomy', 'Physiology', 'Biochemistry'] },
    { id: 'year2', label: '2nd Year', subjects: ['Pharmacology', 'Pathology', 'Microbiology'] },
    { id: 'year3', label: '3rd Year', subjects: ['Community Medicine', 'ENT', 'Ophthalmology'] },
    { id: 'year4', label: '4th Year', subjects: ['Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Obstetrics & Gynecology'] }
  ]
};
const subjectLinks = {
  Microbiology: 'https://drive.google.com/drive/folders/1Qn2Mld6rXPYzjlNZxpKWLBE4M3A9nuVk',
  Pathology: 'https://drive.google.com/drive/folders/1eat7kdaVT9m1DyGYyjfqHbC0CUOTaKQr',
  Pharmacology: 'https://drive.google.com/drive/folders/1K0eSdKrp6DfacWllbSG_eZrRqKpkVwsc'
};

const hint = document.getElementById('hint');
const treeCanvas = document.getElementById('treeCanvas');
const nodeLayer = document.getElementById('nodeLayer');
const linkLayer = document.getElementById('linkLayer');
const ns = 'http://www.w3.org/2000/svg';
const ROOT_NODE_ID = 'graph-root';
const CHILD_NODE_CLASS = 'graph-child';
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
  linkLayer.innerHTML = '';
}

function addNode({ id, label, x, y, type, logoOnly = false, icon = false, onClick, asRoot = false, asChild = false }) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `node ${type}${logoOnly ? ' logo-only' : ''}`;
  el.style.left = `${x}%`;
  el.style.top = `${y}%`;
  el.dataset.id = id;

  if (asRoot) {
    el.id = ROOT_NODE_ID;
  }
  if (asChild) {
    el.classList.add(CHILD_NODE_CLASS);
  }

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

  if (type === 'year' || type === 'subject') {
    applyAdaptiveNodeSize(el);
  }

  return el;
}

function applyAdaptiveNodeSize(node) {
  const label = node.querySelector('.label');
  if (!label) return;

  const labelRect = label.getBoundingClientRect();
  const style = window.getComputedStyle(node);
  const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  const contentSize = Math.max(labelRect.width + paddingX, labelRect.height + paddingY);

  const minSize = node.classList.contains('year') ? 90 : 78;
  const size = Math.ceil(Math.max(minSize, contentSize));
  node.style.width = `${size}px`;
  node.style.height = `${size}px`;
}

function nodeCenter(nodeRect, containerRect) {
  return {
    x: nodeRect.left - containerRect.left + nodeRect.width / 2,
    y: nodeRect.top - containerRect.top + nodeRect.height / 2
  };
}

function drawConnections() {
  linkLayer.innerHTML = '';

  const rootNode = nodeLayer.querySelector(`#${ROOT_NODE_ID}`);
  const childNodes = nodeLayer.querySelectorAll(`.${CHILD_NODE_CLASS}`);

  if (!rootNode || !childNodes.length) return;

  const containerRect = treeCanvas.getBoundingClientRect();
  const rootRect = rootNode.getBoundingClientRect();
  const rootCenter = nodeCenter(rootRect, containerRect);
  const rootRadius = Math.min(rootRect.width, rootRect.height) / 2;

  linkLayer.setAttribute('width', String(containerRect.width));
  linkLayer.setAttribute('height', String(containerRect.height));
  linkLayer.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);

  const defs = document.createElementNS(ns, 'defs');
  const gradient = document.createElementNS(ns, 'linearGradient');
  gradient.setAttribute('id', 'branchGradient');
  gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
  gradient.setAttribute('x1', '0');
  gradient.setAttribute('y1', '0');
  gradient.setAttribute('x2', String(containerRect.width));
  gradient.setAttribute('y2', String(containerRect.height));

  const stopA = document.createElementNS(ns, 'stop');
  stopA.setAttribute('offset', '0%');
  stopA.setAttribute('stop-color', 'rgba(45,212,191,0.78)');

  const stopB = document.createElementNS(ns, 'stop');
  stopB.setAttribute('offset', '100%');
  stopB.setAttribute('stop-color', 'rgba(59,130,246,0.62)');

  gradient.appendChild(stopA);
  gradient.appendChild(stopB);
  defs.appendChild(gradient);
  linkLayer.appendChild(defs);

  childNodes.forEach((child) => {
    const childRect = child.getBoundingClientRect();
    const childCenter = nodeCenter(childRect, containerRect);
    const childRadius = Math.min(childRect.width, childRect.height) / 2;
    const dx = childCenter.x - rootCenter.x;
    const dy = childCenter.y - rootCenter.y;
    const distance = Math.hypot(dx, dy) || 1;
    const ux = dx / distance;
    const uy = dy / distance;
    const startX = rootCenter.x + ux * rootRadius;
    const startY = rootCenter.y + uy * rootRadius;
    const endX = childCenter.x - ux * childRadius;
    const endY = childCenter.y - uy * childRadius;

    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', String(startX));
    line.setAttribute('y1', String(startY));
    line.setAttribute('x2', String(endX));
    line.setAttribute('y2', String(endY));
    line.setAttribute('stroke', 'url(#branchGradient)');
    line.setAttribute('stroke-width', '1.6');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '0.95');
    line.setAttribute('vector-effect', 'non-scaling-stroke');
    line.setAttribute('shape-rendering', 'geometricPrecision');
    linkLayer.appendChild(line);
  });
}

function renderHome() {
  clearTree();
  hint.textContent = 'Choose a year to explore subjects.';

  addNode({ id: 'app-root', label: data.appName, x: 50, y: 50, type: 'root', logoOnly: true, icon: true, asRoot: true });

  data.years.forEach((year, i) => {
    const p = yearLayout()[i];
    addNode({
      id: year.id,
      label: year.label,
      x: p.x,
      y: p.y,
      type: 'year',
      asChild: true,
      onClick: () => {
        selectedYearId = year.id;
        render();
      }
    });
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

  addNode({
    id: 'app-root-top',
    label: data.appName,
    x: 50,
    y: variant === 'mobile' ? 16 : 12,
    type: 'root top',
    logoOnly: true,
    icon: true,
    onClick: () => {
      selectedYearId = null;
      render();
    }
  });

  addNode({
    id: 'selected-year',
    label: year.label,
    x: 50,
    y: variant === 'mobile' ? 44 : variant === 'tablet' ? 50 : 54,
    type: 'root',
    asRoot: true,
    onClick: () => {
      selectedYearId = null;
      render();
    }
  });

  const layout = subjectLayouts[year.subjects.length][variant];

  year.subjects.forEach((subject, i) => {
    const p = layout[i];
    const link = subjectLinks[subject];
    addNode({
      id: `${year.id}-${i}`,
      label: subject,
      x: p.x,
      y: p.y,
      type: 'subject',
      asChild: true,
      onClick: link ? () => window.open(link, '_blank', 'noopener,noreferrer') : undefined
    });
  });
}

function render() {
  if (selectedYearId) {
    renderYear();
  } else {
    renderHome();
  }
  requestAnimationFrame(drawConnections);
}

const observer = new MutationObserver(() => {
  requestAnimationFrame(drawConnections);
});

observer.observe(nodeLayer, { childList: true, subtree: true });
window.addEventListener('resize', drawConnections);
window.addEventListener('orientationchange', drawConnections);
window.addEventListener('load', drawConnections);

render();
