import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCtyq8Mb_r7PVj4JQBZBU_EZxS6KmlXkgk',
  authDomain: 'resourceroot-91754.firebaseapp.com',
  projectId: 'resourceroot-91754',
  storageBucket: 'resourceroot-91754.firebasestorage.app',
  messagingSenderId: '163531676541',
  appId: '1:163531676541:web:3153490817d631e6ec8a14',
  measurementId: 'G-DLSYZXP2SG'
};

const firebaseApp = initializeApp(firebaseConfig);
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(firebaseApp);
  }
});

const data = {
  appName: 'Resource Root',
  years: [
    { id: 'year1', label: '1st Year', subjects: ['Anatomy', 'Physiology', 'Biochemistry'] },
    { id: 'year2', label: '2nd Year', subjects: ['Pharmacology', 'Pathology', 'Microbiology'] },
    { id: 'year3', label: '3rd Year', subjects: ['Community Medicine', 'FMT', 'ENT', 'Ophthalmology'] },
    { id: 'year4', label: '4th Year', subjects: ['Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Obstetrics & Gynecology'] }
  ]
};
const subjectLinks = {
  Microbiology: 'https://drive.google.com/drive/folders/1Qn2Mld6rXPYzjlNZxpKWLBE4M3A9nuVk',
  Pathology: 'https://drive.google.com/drive/folders/1eat7kdaVT9m1DyGYyjfqHbC0CUOTaKQr',
  Pharmacology: 'https://drive.google.com/drive/folders/1K0eSdKrp6DfacWllbSG_eZrRqKpkVwsc'
};
const subjectPdfs = {
  Pathology: [
    { title: 'Lange Case Files: Pathology', fileId: '14eEmJBgeQkjuV1_YMAs6MhweSvfcFB6x' },
    { title: 'MedLive Pathology Prof Buster', fileId: '1rrrY_oZrNOg1oec8LaCk_ohqTuWZjDZl' },
    { title: 'Harsh Mohan Pathology', fileId: '1UQe_TS9wlYXbZc9KufjwqjWHnHBhekyp' },
    { title: 'Ramadas Nayak Pathology Exam Prep', fileId: '1RZGMWR-2h6r1qQ7cLoV6xmG9OgO3mj-g' },
    { title: 'Robbins Pathology (11th Edition)', fileId: '1rGzejj30EfzF4DO8VEpOQqP0t32TIVlF' },
    { title: 'Pathology Slides Part 1 (Aaditya)', fileId: '1kUklhn-rym2ubVRk-u0V9UgXcm2rt94g', password: 'aadi@patho' },
    { title: 'Robbins Pathology at a Glance', fileId: '1fgat_sZAX6y-cpUID0mLFzqM_WVHFz1p' },
    { title: 'Pathoma 2021', fileId: '1eZ2lJAqh1bqxSmmItqVvNttBjYoJ9B0M' },
    { title: 'Review of Pathology and Genetics', fileId: '1EmpcrUu7XKjk1E6AiezFEFHXQjv9geZe' }
  ],
  Pharmacology: [
    { title: 'Case Files Pharmacology (3rd Edition)', fileId: '1K_ZNMpx4ab-5MQW6KjFi-r97lAQN4IR-' },
    { title: 'Gobind Rai Pharmacology', fileId: '1v_g4NUUJBT-odwTFMZasD-pndS4rCT8k' },
    { title: 'K.D. Tripathi: Classification of Drugs with Doses and Preparations', fileId: '114OV5arctTal_hN6e8U7JOqYcVnIWvBF' },
    { title: 'Katzung Pharmacology Exam Notes', fileId: '1spnGVdYxv6qBO7-iFfZuH9n1PtN0wyEI' },
    { title: 'MedLive Pharmacology Notes', fileId: '1VjOVzuUG0cBu8ZsPVxa2vJ4ZhmIdBkYy' },
    { title: 'K.D. Tripathi Essentials of Pharmacology', fileId: '1eM1lCvQHZXsH8Ezs4s3Q39zUkOFKzkaH' },
    { title: 'Lippincott Illustrated Reviews Pharmacology', fileId: '10G5PjocSxGo1Tkk0KffHgJTuJ8xIrmQx' },
    { title: 'Padmaja Medical Pharmacology', fileId: '1fWfDaXdRdqmKdAHPE252u55CwF_xWmAd' },
    { title: 'Tara V. Shanbhag Pharmacology', fileId: '1_aP0WWZHib6vmf_SSieraUPt35oQ05TS' },
    { title: 'Review of Pharmacology (GRG-14e)', fileId: '1ggi0Vf4MUKkiVgSBVMEdEcVrwMaaSELS' }
  ],
  Microbiology: [
    { title: 'Toy, Skinner, DeBord: Introductory Microbiology', fileId: '1BcRH4Wk-8YonQs4nWGoKbf9lUTT4fkXZ' },
    { title: 'Microbiology MCQ Compendium', fileId: '1GPGQ9r8FF25XPlESO7TuNtHkRr9TXEYG' },
    { title: "Ananthanarayan & Paniker's Microbiology", fileId: '1eYA2DayOYA2agFRO5doKQ2dhsxuwX_tX' },
    { title: 'Apurba S. Sastry Microbiology', fileId: '1ogtEInlOPfZe3Sah5MTt34o2eQySPFOP' },
    { title: 'Microbiology Preparation Notes', fileId: '176zBTN63xZCBR23UgrrZercvR79lIh4o' }
  ]
};

const hint = document.getElementById('hint');
const installHint = document.getElementById('installHint');
const treeCanvas = document.getElementById('treeCanvas');
const nodeLayer = document.getElementById('nodeLayer');
const linkLayer = document.getElementById('linkLayer');
const ns = 'http://www.w3.org/2000/svg';
const ROOT_NODE_ID = 'graph-root';
const CHILD_NODE_CLASS = 'graph-child';
let selectedYearId = null;
let selectedSubject = null;

function isStandaloneMode() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function getInstallHintText() {
  const ua = window.navigator.userAgent || '';
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  if (isIOS) {
    return 'Tip: Use Share -> Add to Home Screen for an app-like experience.';
  }
  return 'Tip: Add this site to your Home Screen for an app-like experience.';
}

function updateInstallHint(visibleOnHome) {
  if (!installHint) return;
  const show = visibleOnHome && !isStandaloneMode();
  installHint.hidden = !show;
  if (show) {
    installHint.textContent = getInstallHintText();
  }
}

function syncUrlState() {
  const params = new URLSearchParams();
  if (selectedYearId) params.set('year', selectedYearId);
  if (selectedSubject) params.set('subject', selectedSubject);
  const query = params.toString();
  const nextUrl = query ? `index.html?${query}` : 'index.html';
  window.history.replaceState({}, '', nextUrl);
}

function hydrateStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const year = params.get('year');
  const subject = params.get('subject');
  const validYear = data.years.find((y) => y.id === year);
  if (validYear) {
    selectedYearId = validYear.id;
  }
  if (subject) {
    const validSubject = validYear && validYear.subjects.includes(subject);
    if (validSubject) {
      selectedSubject = subject;
    }
  }
}

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

function addNode({ id, label, x, y, type, logoOnly = false, icon = false, onClick, asRoot = false, asChild = false, extraClasses = '', enterDelay = 0 }) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `node ${type}${logoOnly ? ' logo-only' : ''}${extraClasses ? ` ${extraClasses}` : ''}`;
  el.style.left = `${x}%`;
  el.style.top = `${y}%`;
  el.dataset.id = id;
  el.style.setProperty('--enter-delay', `${enterDelay}ms`);

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
    extraClasses: 'enter-pop',
    enterDelay: 70,
    onClick: () => {
      selectedYearId = null;
      render();
    }
  });

  const layout = subjectLayouts[year.subjects.length][variant];

  year.subjects.forEach((subject, i) => {
    const p = layout[i];
    const link = subjectLinks[subject];
    const resources = subjectPdfs[subject] || [];
    addNode({
      id: `${year.id}-${i}`,
      label: subject,
      x: p.x,
      y: p.y,
      type: 'subject',
      asChild: true,
      extraClasses: 'enter-pop',
      enterDelay: 140 + i * 80,
      onClick: () => {
        if (resources.length) {
          selectedSubject = subject;
          render();
          return;
        }
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      }
    });
  });
}

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (typeof text === 'string') el.textContent = text;
  return el;
}

function renderSubjectLibrary() {
  clearTree();
  const year = data.years.find((y) => y.id === selectedYearId);
  const resources = subjectPdfs[selectedSubject] || [];
  hint.textContent = `${selectedSubject} library`;

  const container = createEl('div', 'library-view');
  container.classList.add('enter');
  const header = createEl('div', 'library-head');
  const backYearBtn = createEl('button', 'library-back-btn', '\u2190');
  backYearBtn.setAttribute('aria-label', `Back to ${year ? year.label : 'Year'}`);
  backYearBtn.type = 'button';
  backYearBtn.addEventListener('click', () => {
    selectedSubject = null;
    render();
  });
  const title = createEl('h2', 'library-title', selectedSubject);
  header.append(backYearBtn, title);
  const list = createEl('div', 'book-list');
  resources.forEach((book) => {
    const btn = createEl('button', 'book-item', book.title);
    btn.type = 'button';
    btn.style.setProperty('--list-delay', `${70 + list.children.length * 55}ms`);
    btn.addEventListener('click', () => {
      const titleParam = encodeURIComponent(book.title);
      const yearParam = encodeURIComponent(selectedYearId || '');
      const subjectParam = encodeURIComponent(selectedSubject || '');
      const passwordParam = book.password ? `&password=${encodeURIComponent(book.password)}` : '';
      window.location.href = `viewer.html?fileId=${book.fileId}&title=${titleParam}&year=${yearParam}&subject=${subjectParam}${passwordParam}`;
    });
    list.appendChild(btn);
  });
  container.append(header, list);
  nodeLayer.appendChild(container);
}

function render() {
  const isHome = !selectedYearId && !selectedSubject;
  updateInstallHint(isHome);

  if (selectedSubject) {
    renderSubjectLibrary();
  } else if (selectedYearId) {
    renderYear();
  } else {
    renderHome();
  }
  syncUrlState();
  requestAnimationFrame(drawConnections);
}

const observer = new MutationObserver(() => {
  requestAnimationFrame(drawConnections);
});

observer.observe(nodeLayer, { childList: true, subtree: true });
window.addEventListener('resize', drawConnections);
window.addEventListener('orientationchange', drawConnections);
window.addEventListener('load', drawConnections);

hydrateStateFromUrl();
render();
