import { logAppEvent, trackScreen, warmupAnalytics } from './analytics.js';

const data = {
  appName: 'Resource Root',
  years: [
    { id: 'year1', label: '1st Year', subjects: ['Anatomy', 'Physiology', 'Biochemistry'] },
    { id: 'year2', label: '2nd Year', subjects: ['Pharmacology', 'Pathology', 'Microbiology'] },
    { id: 'year3', label: '3rd Year', subjects: ['Community Medicine', 'FMT', 'ENT', 'Ophthalmology'] },
    { id: 'year4', label: '4th Year', subjects: ['Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Obstetrics & Gynecology'] }
  ]
};

const pyqData = {
  year1: {
    label: 'PYQs',
    subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Combined']
  },
  year2: {
    label: 'PYQs',
    subjects: ['Pharmacology', 'Pathology', 'Microbiology', 'Combined']
  },
  year3: {
    label: 'PYQs',
    subjects: ['Community Medicine', 'FMT', 'ENT', 'Ophthalmology', 'Combined']
  },
  year4: {
    label: 'PYQs',
    subjects: ['Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Obstetrics & Gynecology', 'Combined']
  }
};

const qbankData = {
  year1: {
    label: 'Question Bank',
    subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Combined']
  },
  year2: {
    label: 'Question Bank',
    subjects: ['Pharmacology', 'Pathology', 'Microbiology', 'Combined']
  },
  year3: {
    label: 'Question Bank',
    subjects: ['Community Medicine', 'FMT', 'ENT', 'Ophthalmology', 'Combined']
  },
  year4: {
    label: 'Question Bank',
    subjects: ['Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Obstetrics & Gynecology', 'Combined']
  }
};

const pyqPdfs = {
  year1: {
    Anatomy: [
      { title: 'Anatomy Previous Year Paper', fileId: '1BG3e5JnCc25MlioGibDa5ShhFDEbVAZX' },
      { title: 'Previous Year AKU Anatomy Question Paper', fileId: '1AnEHxH4TwDKh1UjXtBrMYXGCe5_5jD_B' },
      { title: 'Anatomy P1 2k23 Batch Main Paper', fileId: '1IFvK88LkPT_ECFcfcEbd23anGIV_6odR' },
      { title: 'Anatomy P2 2k23 Batch Main Paper', fileId: '1IKMfomWGLNnhLwJSWw3y5VOq2eBOclPt' },
      { title: 'Anatomy 1 Supply 2021 Batch', fileId: '13DgSQffNEFkORCEHG6jjHJW5JMgttbWU' },
      { title: 'Anatomy 2 Supply 21 Batch', fileId: '13IKXNwJ7a7ijDnM677wkBPGLp6WVy_YH' },
      { title: 'Anatomy Paper 2 2k21', fileId: '1Zqb5ipdlR6u3QJI6ia2gVrs5w0m3PgrC' },
      { title: 'Anatomy Paper 1 2k21', fileId: '1ZmsOpKU87rJTepixT_0n8QZy1tL6xR9d' },
      { title: 'Anatomy P2 2k20 Supply', fileId: '1U46gsPdomF0l86k8VJbkQYE-d7IqXgUL' },
      { title: 'Anatomy P1 2k20 Supply', fileId: '1fA7rrSrxwwIOUZRTYIJd-CthMJihpPLl' },
      { title: 'Anatomy 2021 Supply', fileId: '13S36259572FyVbs8eFqxDOkQiDhC9PwU' },
      { title: 'Anatomy P1 2021 Exam', fileId: '1StwUS9bEViL4Bc3Lz8iu0SKIup7VRFEA' },
      { title: 'Anatomy P2 2021 Exam', fileId: '1Q8QJQG62lqEMafUvYXFgPaDNxL6reZSP' }
    ],
    Physiology: [
      { title: 'Physiology University Questions', fileId: '1BE65rSWqubu8cq-VzoiM6fvO7QRAOnDO' },
      { title: 'Physiology Previous Year Paper', fileId: '1AwE8MkFoGedzKeM9FzghWiKNpcxMAHrB' },
      { title: 'Physiology P1 2k23 Batch Main Paper', fileId: '1I8h6FolsaCrLFJBq2XmoVHHsJK_ur6gx' },
      { title: 'Physiology P2 2k23 Batch Main Paper', fileId: '1IAthb_p2WWxszQnvnmgQAQ1vDh8JgOTg' },
      { title: 'Physiology 1 Supply 21 Batch', fileId: '1XEBcHqyQbrfAQ8NpPNnDFErOjCD53vnk' },
      { title: 'Physiology 2 Supply 21 Batch', fileId: '1XD5ZoTvoV9zO-yYV5Rh5r-hm4JbfEtCk' },
      { title: 'Physiology 1 2k21', fileId: '1_MfOx6ZbiBF3NCmHkv2Uf304pz6fCz-U' },
      { title: 'Physiology P2 2k21', fileId: '1_6MtDkhQHi2HZ7kafzvcVmPCDGOoze5M' },
      { title: 'Physiology P1 Supply 2k20 Batch', fileId: '13Y5sWbjHpG5ZkRV6fZJL4by8ptiBmxIR' },
      { title: 'Physiology P2 Supply 2k20', fileId: '1_w22J7JKTVIe5SJOerI61GqdNaz_BOJR' },
      { title: 'Physiology P1 Supply 2021', fileId: '1BFYfLvLbSB-LwxS5TiyM1CJcN5Nyqrkk' },
      { title: 'Physiology P1 2021 Exam', fileId: '1JJpLk7SxwsplXo_BLK71NZcPG2oZw8Zx' },
      { title: 'Physiology P2 2021 Exam', fileId: '1P8D0Nlf-K3CGV1Ad7wFQeV9hZglxToFd' }
    ],
    Biochemistry: [
      { title: 'Biochemistry University Questions', fileId: '1BG4kgTGDCZ6ysn9runFys8pK-zulcn95' },
      { title: 'Biochemistry Previous Year Paper', fileId: '1BE9XKKQLdu50-z99DG6xP0CXXSsnmF2g' },
      { title: 'Biochemistry P1 2k23 Batch Main Paper', fileId: '1ILm8eBkalPywkfQKO6hNS6lVPo0gJ18h' },
      { title: 'Biochemistry P2 2k23 Batch Main Paper', fileId: '1IPjQ8ojvbVTiubF4RAIZrabomzemO-rt' },
      { title: 'Biochemistry 19-20 PYQs', fileId: '13dBes7BhSNKIMCNwSwQthjIkVzm3zzpB' },
      { title: 'Biochemistry PYQs Handwritten', fileId: '13ik2hXQKPmG9oD5x8sH7HlNegadvpni1' },
      { title: 'Biochemistry 2 Supply 21 Batch', fileId: '1Di5-PSf6nb-J-EA7_Vx_iVmOMEFJx6eQ' },
      { title: 'Biochemistry 1 Supply 21 Batch', fileId: '1DitcWmhbXFDWHigbYHtTJq8Mzyk_3joX' },
      { title: 'Biochemistry 1 2k21', fileId: '1_Gn5EjFl-5adwQYRicpBa-IVsjrKUXRS' },
      { title: 'Biochemistry P2 2k21', fileId: '1_DF1pTRJcHbEc9f2R69_WdcZOKtlGkgX' },
      { title: 'Biochemistry P2 2k20 Supply', fileId: '17jurVg0ldk35s5AmPXVOBGvsFTa35Pbi' },
      { title: 'Biochemistry P1 2k20 Supply', fileId: '1AA_ZJBF9-XODh_0f8M96G1IYvzB55nRT' },
      { title: 'Biochemistry 2021 Supply', fileId: '13XlmH1Zhv1Hhm4FR_mDG9rEebEFZb3J7' },
      { title: 'Biochemistry P1 2021 Exam', fileId: '18ZIMkRGQoFIzHhsUc41JpGmODY5q4ipo' },
      { title: 'Biochemistry P2 2021 Exam', fileId: '1akfnEteD5WXR_sawLieq6BKXWQBZ9VcS' }
    ],
    Combined: [
      { title: '1st Prof Questions', fileId: '1BGdlUXUw-1AA0vdW5tH5kV2Uhej6z6W9' },
      { title: 'Previous Year Topic Wise', fileId: '1ApdQSvgAt3TeCi8b6bTFtnXDzqFeNLcA' },
      { title: 'AKU 1st Year MBBS Supply 2020', fileId: '1P984xRxNKRTBGNl5ghns4wER380EhXer' },
      { title: '1st Prof 2020 Paper', fileId: '1Blpg7oOt9OBskZxLR9fTwfHJJl6NQHNP' },
      { title: '1st Prof 2020 Supplementary', fileId: '1BQQ4KcMvtKXDnQ9fmDdd4hkkMCzl8n-t' }
    ]
  },
  year2: {
    Pharmacology: [],
    Pathology: [],
    Microbiology: [],
    Combined: []
  },
  year3: {
    'Community Medicine': [],
    FMT: [],
    ENT: [],
    Ophthalmology: [],
    Combined: []
  },
  year4: {
    Medicine: [],
    Surgery: [],
    Pediatrics: [],
    Orthopedics: [],
    'Obstetrics & Gynecology': [],
    Combined: []
  }
};

const qbankPdfs = {
  year1: {
    Anatomy: [
      { title: 'Anatomy_ed8', fileId: '19ebiE-d8MHj5_ymEnTQyES7HMnuj-G53' },
      { title: 'Anatomy Prepladder Version X Qbank', fileId: '1XCBnksV7lr4ujF944E7W3YRQxfnPyyGh' }
    ],
    Physiology: [
      { title: 'Physiology_ed8', fileId: '13aTzHmskVlUcas1WwxRxPr1OjCb4CIMa' },
      { title: 'Physiology Prepladder Version X Qbank', fileId: '10cR287MYfG_UfTP9b-hzlCA-22U3xm2m' }
    ],
    Biochemistry: [
      { title: 'Biochemistry Prepladder Version X Qbank', fileId: '1GA6aJCxda_N7vaNLpb3b9I2t56gChPk-' },
      { title: 'Biochemistry_ed8', fileId: '1Rjf9XMezhvy4RbBuEkVTx6Tx3GyYW9Xg' }
    ],
    Combined: []
  },
  year2: {
    Pharmacology: [
      { title: 'Pharmacology Prepladder Version X Qbank', fileId: '1JRMeE-wRxb7ZfoU6Qb8ru3n8zgJeN5JX' },
      { title: 'Pharmacology_ed8', fileId: '1SZ5d8Gen5U1eMdWQfp0b7FNkQcZ0y5DP' },
      { title: 'Pharmacology johari notes @medbookeasy', fileId: '14uRv7sqDNi__RiVUX3AWGPtdkLmHcs2L' }
    ],
    Pathology: [
      { title: 'Pathology Prepladder Version X Qbank', fileId: '1LWDD75CQO_ApJv5Z31tdxHU2pKFdJsET' },
      { title: 'Pathology_ed8', fileId: '1y1f-eA6lCyPETAGdLZEVVeiZ06p4gXQH' }
    ],
    Microbiology: [
      { title: 'Microbiology Prepladder Version X Qbank', fileId: '1gJeOcHtsepHqIhscFXBeA6JlKUeFNc1P' },
      { title: 'Microbiology_ed8', fileId: '15Mv27ZN4mtLLt9gkktAWQh3rbl_FW_O_' }
    ],
    Combined: []
  },
  year3: {
    'Community Medicine': [],
    FMT: [],
    ENT: [],
    Ophthalmology: [],
    Combined: []
  },
  year4: {
    Medicine: [],
    Surgery: [],
    Pediatrics: [],
    Orthopedics: [],
    'Obstetrics & Gynecology': [],
    Combined: []
  }
};

const rootLibraries = [];
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
    { title: 'Marrow Pathology', fileId: '1uvLT-XMOp7Ds-c0CiZ5d3pWu41Qiky8X' },
    { title: 'PATHOLOGY PW 3.0', fileId: '1ODh1U4WSeKs-Ar6YiV3Bg9wzBkO2yGvA' },
    { title: 'PATHO - JOHARI PAID NOTES [ @Medpro_official01 ]', fileId: '1MgM3lwUBuKtxygVrpl6j80idJBeDtnM7' },
    { title: 'PrepL Pathology Version X', fileId: '12P-ORk0kciaLEouRJbVqiOA4-zd3K8fo' },
    { title: 'Patterns', fileId: '1xZUmVnks9mPCaPePoK-VxMIW7UNvPhva' },
    { title: 'Robbins Review of Pathology, 4E (2014)', fileId: '1nlGM_FnK-sFdLZcSUUOqeZfYTCMcwW4r' },
    { title: 'Pathology Quick Review and MCQs[Ussama Maqbool] (2)', fileId: '1uSq5KdUqSW1sv9zDu_KmfboaPShhbEcT' },
    { title: 'Robbins Pathology (11th Edition)', fileId: '1rGzejj30EfzF4DO8VEpOQqP0t32TIVlF' },
    { title: 'Pathology Slides Part 1 (Aaditya)', fileId: '1kUklhn-rym2ubVRk-u0V9UgXcm2rt94g', password: 'aadi@patho' },
    { title: 'Pathology at glance by Robbins', fileId: '1fgat_sZAX6y-cpUID0mLFzqM_WVHFz1p' },
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
    { title: 'Pharmacology Marrow E8', fileId: '1xjKiXTWpMN1ADU2evvV6a7d8Q8xxujQa' },
    { title: 'H_L_Sharma,_K_K_Sharma_Principles_of_Pharmacology_2023', fileId: '1_5eER7t8cImzYucbW6cHH4MnDXl80_eA' },
    { title: 'Pharmacology johari notes @medbookeasy', fileId: '1XX0AcNmywBZqBuMW3GqSWVqvG4mEipd6' },
    { title: 'Padmaja Medical Pharmacology', fileId: '1fWfDaXdRdqmKdAHPE252u55CwF_xWmAd' },
    { title: 'Prepladder Pharma Notes', fileId: '1XrYC9e7k6t57DbPxnc7mg9-bkQ0AshU9' },
    { title: 'Pharmacology Revision E6.5 Marrow', fileId: '1XThvGnL9myx4fUVzzwBnawGvJFjE9N3R' },
    { title: 'Tara V. Shanbhag Pharmacology', fileId: '1_aP0WWZHib6vmf_SSieraUPt35oQ05TS' },
    { title: 'Review of Pharmacology (GRG-14e)', fileId: '1ggi0Vf4MUKkiVgSBVMEdEcVrwMaaSELS' }
  ],
  FMT: [
    { title: 'Forensic Medicine Version X', fileId: '1l0vhkpElgN0Jh8q_OTMHOCWvCUqWmRuE' },
    { title: 'FMT ed8 Marrow Notes', fileId: '1JeMpJZKj1J62A0atfZlnzx7h3J9qc4v9' },
    { title: 'FMT Images (all in one)', fileId: '1gPMKP9thdxChejXuE8hlY4-zH9GqsvHR' },
    { title: 'PW MedEd 3.0 Forensic Medicine', fileId: '1ZWsdbTaGEPlH0qkfkVao-tmZLKDOmLC6' },
    { title: 'SPOTTERS IN FORENSIC MEDICINE', fileId: '1zmSxM_Jd_mMMm82InSMWC_IqojtCOibS' }
  ],
  'Community Medicine': [
    { title: 'Arpit PSM file', fileId: '1ECbybChioCQd1dx3cWNVsd8JYODgXKAS' },
    { title: 'Park 27th ed', fileId: '1zAc-YyaCotDEu9ZsDEj3vRUAvLKhaJL5' },
    { title: 'PW Meded Community Medicine FARRE 2.0', fileId: '1mLD6hd-TUvESfv6R-Wk1fDLXpJTdyYoO' },
    { title: 'PSM Marrow E8', fileId: '1PYb-tu1AvLrD461IKeEe3gUZ2u1T8JUx' },
    { title: 'PSM Version X', fileId: '1fehWk1isoI32mfdQr57rGxwoxiUqj1gV' }
  ],
  Microbiology: [
    { title: 'Toy, Skinner, DeBord: Introductory Microbiology', fileId: '1BcRH4Wk-8YonQs4nWGoKbf9lUTT4fkXZ' },
    { title: 'Microbiology MCQ Compendium', fileId: '1GPGQ9r8FF25XPlESO7TuNtHkRr9TXEYG' },
    { title: "Ananthanarayan & Paniker's Microbiology", fileId: '1eYA2DayOYA2agFRO5doKQ2dhsxuwX_tX' },
    { title: 'Apurba S. Sastry Microbiology', fileId: '1ogtEInlOPfZe3Sah5MTt34o2eQySPFOP' },
    { title: 'Medlive Microbiology notes', fileId: '12Z1a0Oy54TvTCwdOq9bfTFfEU84dsQ01' },
    { title: 'Microbiology Preparation Notes', fileId: '176zBTN63xZCBR23UgrrZercvR79lIh4o' }
  ]
};

const hint = document.getElementById('hint');
const installHint = document.getElementById('installHint');
const searchPanel = document.getElementById('searchPanel');
const globalSearch = document.getElementById('globalSearch');
const searchResults = document.getElementById('searchResults');
const treeCanvas = document.getElementById('treeCanvas');
const nodeLayer = document.getElementById('nodeLayer');
const linkLayer = document.getElementById('linkLayer');
const ns = 'http://www.w3.org/2000/svg';
const ROOT_NODE_ID = 'graph-root';
const CHILD_NODE_CLASS = 'graph-child';
let selectedYearId = null;
let selectedSubject = null;
let selectedPyqYear = null;
let selectedQbankYear = null;
let lastTrackedScreen = '';

const subjectYearMap = Object.fromEntries(
  data.years.flatMap((year) => year.subjects.map((subject) => [subject, year]))
);

const allBooks = [
  ...Object.entries(subjectPdfs).flatMap(([subject, books]) => {
    const year = subjectYearMap[subject] || null;
    return books.map((book) => ({
      ...book,
      subject,
      yearId: year ? year.id : '',
      yearLabel: year ? year.label : 'Root Library'
    }));
  }),
  ...Object.entries(pyqPdfs).flatMap(([yearId, subjects]) => {
    const year = data.years.find(y => y.id === yearId);
    const yearLabel = year ? `${year.label} (PYQ)` : 'PYQ';
    return Object.entries(subjects).flatMap(([subject, books]) => {
      return books.map((book) => ({
        ...book,
        subject,
        yearId,
        yearLabel
      }));
    });
  }),
  ...Object.entries(qbankPdfs).flatMap(([yearId, subjects]) => {
    const year = data.years.find(y => y.id === yearId);
    const yearLabel = year ? `${year.label} (Qbank)` : 'Qbank';
    return Object.entries(subjects).flatMap(([subject, books]) => {
      return books.map((book) => ({
        ...book,
        subject,
        yearId,
        yearLabel
      }));
    });
  })
];
const homeItems = [...rootLibraries, ...data.years];

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
    logAppEvent('install_hint_shown', { standalone_mode: isStandaloneMode() });
  }
}

function normalizeSearchValue(value) {
  return value.trim().toLowerCase();
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function openBookViewer(book, source = 'library') {
  logAppEvent('pdf_open_requested', {
    year_id: book.yearId || 'root',
    subject_name: book.subject,
    book_title: book.title,
    file_id: book.fileId,
    has_password: Boolean(book.password),
    source
  });

  const titleParam = encodeURIComponent(book.title);
  const yearParam = encodeURIComponent(book.yearId || '');
  const subjectParam = encodeURIComponent(book.subject || '');
  const passwordParam = book.password ? `&password=${encodeURIComponent(book.password)}` : '';
  window.location.href = `viewer.html?fileId=${book.fileId}&title=${titleParam}&year=${yearParam}&subject=${subjectParam}${passwordParam}`;
}

function renderSearchResults(query) {
  if (!searchResults) return;

  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) {
    searchResults.innerHTML = '';
    return;
  }

  const matches = allBooks.filter((book) => normalizeSearchValue(book.title).includes(normalizedQuery));
  logAppEvent('search_performed', {
    query_length: normalizedQuery.length,
    result_count: matches.length
  });

  if (!matches.length) {
    searchResults.innerHTML = '<div class="search-empty">No books found.</div>';
    return;
  }

  searchResults.innerHTML = '';
  matches.forEach((book, index) => {
    const button = createEl('button', 'search-result');
    button.type = 'button';
    button.innerHTML = `
      <span class="search-result-title">${escapeHtml(book.title)}</span>
      <span class="search-result-meta">${escapeHtml(book.subject)} · ${escapeHtml(book.yearLabel)}</span>
    `;
    button.addEventListener('click', () => {
      logAppEvent('search_result_selected', {
        query_length: normalizedQuery.length,
        result_index: index,
        year_id: book.yearId || 'root',
        subject_name: book.subject,
        book_title: book.title,
        file_id: book.fileId
      });
      openBookViewer(book, 'search');
    });
    searchResults.appendChild(button);
  });
}

function updateSearchVisibility(isHome) {
  if (!searchPanel) return;
  searchPanel.hidden = !isHome;
  if (!isHome && searchResults) {
    searchResults.innerHTML = '';
  }
}

function syncUrlState() {
  const params = new URLSearchParams();
  if (selectedYearId) params.set('year', selectedYearId);
  if (selectedPyqYear) params.set('pyq', selectedPyqYear);
  if (selectedQbankYear) params.set('qbank', selectedQbankYear);
  if (selectedSubject) params.set('subject', selectedSubject);
  const query = params.toString();
  const nextUrl = query ? `index.html?${query}` : 'index.html';
  window.history.replaceState({}, '', nextUrl);
}

function hydrateStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const year = params.get('year');
  const pyq = params.get('pyq');
  const qbank = params.get('qbank');
  const subject = params.get('subject');
  const validYear = data.years.find((y) => y.id === year);
  if (validYear) {
    selectedYearId = validYear.id;
  }
  if (pyq && pyqData[pyq]) {
    selectedPyqYear = pyq;
  }
  if (qbank && qbankData[qbank]) {
    selectedQbankYear = qbank;
  }
  if (subject) {
    if (selectedPyqYear && pyqData[selectedPyqYear] && pyqData[selectedPyqYear].subjects.includes(subject)) {
      selectedSubject = subject;
    } else if (selectedQbankYear && qbankData[selectedQbankYear] && qbankData[selectedQbankYear].subjects.includes(subject)) {
      selectedSubject = subject;
    } else {
      const validSubject = validYear && validYear.subjects.includes(subject);
      const validRootLibrary = rootLibraries.some((library) => library.subject === subject);
      if (validSubject || validRootLibrary) {
        selectedSubject = subject;
      }
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

const yearBranchLayouts = {
  4: {
    mobile: [{ x: 16, y: 70 }, { x: 39, y: 82 }, { x: 61, y: 82 }, { x: 84, y: 70 }],
    tablet: [{ x: 20, y: 68 }, { x: 40, y: 80 }, { x: 60, y: 80 }, { x: 80, y: 68 }],
    desktop: [{ x: 20, y: 66 }, { x: 40, y: 78 }, { x: 60, y: 78 }, { x: 80, y: 66 }]
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
  const count = homeItems.length;
  if (count === 4) {
    if (variant === 'mobile') {
      return [
        { x: 25, y: 25 },
        { x: 75, y: 25 },
        { x: 25, y: 75 },
        { x: 75, y: 75 }
      ];
    }
    if (variant === 'tablet') {
      return [
        { x: 25, y: 25 },
        { x: 75, y: 25 },
        { x: 25, y: 75 },
        { x: 75, y: 75 }
      ];
    }
    return [
      { x: 25, y: 25 },
      { x: 75, y: 25 },
      { x: 25, y: 75 },
      { x: 75, y: 75 }
    ];
  }
  if (variant === 'mobile') {
    return [
      { x: 50, y: 16 },
      { x: 20, y: 34 },
      { x: 80, y: 34 },
      { x: 20, y: 70 },
      { x: 80, y: 70 }
    ];
  }
  if (variant === 'tablet') {
    return [
      { x: 50, y: 18 },
      { x: 23, y: 34 },
      { x: 77, y: 34 },
      { x: 23, y: 69 },
      { x: 77, y: 69 }
    ];
  }
  return [
    { x: 50, y: 18 },
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

function handleHomeItemSelection(item) {
  if ('subject' in item) {
    logAppEvent('root_library_selected', {
      library_name: item.subject,
      entry_point: 'home'
    });
    selectedYearId = null;
    selectedSubject = item.subject;
    render();
    return;
  }

  logAppEvent('year_selected', {
    year_id: item.id,
    year_label: item.label,
    entry_point: 'home'
  });
  selectedYearId = item.id;
  selectedSubject = null;
  render();
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
  stopA.setAttribute('stop-color', getComputedStyle(document.documentElement).getPropertyValue('--line-a').trim());

  const stopB = document.createElementNS(ns, 'stop');
  stopB.setAttribute('offset', '100%');
  stopB.setAttribute('stop-color', getComputedStyle(document.documentElement).getPropertyValue('--line-b').trim());

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
  hint.textContent = 'Choose an academic year.';
  const staticRoot = nodeLayer.querySelector('#graph-root[data-static-home="true"]');
  const staticItems = homeItems.map((item) => nodeLayer.querySelector(`[data-home-item-id="${item.id}"][data-static-home="true"]`));

  if (staticRoot && staticItems.every(Boolean)) {
    staticRoot.dataset.id = 'app-root';
    homeItems.forEach((item, index) => {
      const node = staticItems[index];
      const position = yearLayout()[index];
      node.dataset.id = item.id;
      node.style.left = `${position.x}%`;
      node.style.top = `${position.y}%`;
      applyAdaptiveNodeSize(node);
      if (node.dataset.boundHomeClick === 'true') return;
      node.dataset.boundHomeClick = 'true';
      node.addEventListener('click', () => handleHomeItemSelection(item));
    });
    linkLayer.innerHTML = '';
    return;
  }

  clearTree();
  addNode({ id: 'app-root', label: data.appName, x: 50, y: 50, type: 'root', logoOnly: true, icon: true, asRoot: true });

  homeItems.forEach((item, i) => {
    const p = yearLayout()[i];
    addNode({
      id: item.id,
      label: item.label,
      x: p.x,
      y: p.y,
      type: 'year',
      asChild: true,
      onClick: () => handleHomeItemSelection(item)
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
      logAppEvent('navigation_back', {
        from_view: 'year',
        year_id: year.id,
        year_label: year.label,
        destination: 'home'
      });
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
      logAppEvent('navigation_back', {
        from_view: 'year',
        year_id: year.id,
        year_label: year.label,
        destination: 'home'
      });
      selectedYearId = null;
      render();
    }
  });

  const hasPyq = pyqData[year.id];
  const hasQbank = qbankData[year.id];
  const branchY = variant === 'mobile' ? 26 : variant === 'tablet' ? 24 : 22;

  if (hasPyq) {
    const pyqX = variant === 'mobile' ? 26 : 32;
    addNode({
      id: `${year.id}-pyq`,
      label: pyqData[year.id].label,
      x: pyqX,
      y: branchY,
      type: 'subject',
      asChild: true,
      extraClasses: 'enter-pop pyq-node',
      enterDelay: 140,
      onClick: () => {
        logAppEvent('pyq_branch_selected', {
          year_id: year.id,
          year_label: year.label
        });
        selectedPyqYear = year.id;
        render();
      }
    });
  }

  if (hasQbank) {
    const qbankX = variant === 'mobile' ? 74 : 68;
    addNode({
      id: `${year.id}-qbank`,
      label: qbankData[year.id].label,
      x: qbankX,
      y: branchY,
      type: 'subject',
      asChild: true,
      extraClasses: 'enter-pop qbank-node',
      enterDelay: 180,
      onClick: () => {
        logAppEvent('qbank_branch_selected', {
          year_id: year.id,
          year_label: year.label
        });
        selectedQbankYear = year.id;
        render();
      }
    });
  }

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
            logAppEvent('subject_selected', {
              year_id: year.id,
              year_label: year.label,
              subject_name: subject,
              resource_count: resources.length,
              destination: 'library'
            });
            selectedSubject = subject;
            render();
            return;
          }
          if (link) {
            logAppEvent('subject_folder_opened', {
              year_id: year.id,
              year_label: year.label,
              subject_name: subject,
              destination: 'external_drive'
            });
            window.open(link, '_blank', 'noopener,noreferrer');
          }
        }
      });
  });
}

function renderPyqSubjects() {
  clearTree();
  const pyq = pyqData[selectedPyqYear];
  const year = data.years.find((y) => y.id === selectedPyqYear);
  if (!pyq) {
    selectedPyqYear = null;
    render();
    return;
  }

  hint.textContent = 'Choose a subject for PYQs.';
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
      logAppEvent('navigation_back', {
        from_view: 'pyq',
        year_id: selectedPyqYear,
        destination: 'home'
      });
      selectedPyqYear = null;
      selectedYearId = null;
      render();
    }
  });

  addNode({
    id: 'pyq-root',
    label: pyq.label,
    x: 50,
    y: variant === 'mobile' ? 44 : variant === 'tablet' ? 50 : 54,
    type: 'root',
    asRoot: true,
    extraClasses: 'enter-pop',
    enterDelay: 70,
    onClick: () => {
      logAppEvent('navigation_back', {
        from_view: 'pyq',
        year_id: selectedPyqYear,
        destination: 'year'
      });
      selectedPyqYear = null;
      render();
    }
  });

  const layoutKey = pyq.subjects.length;
  const layout = subjectLayouts[layoutKey]
    ? subjectLayouts[layoutKey][variant]
    : subjectLayouts[4][variant];

  pyq.subjects.forEach((subject, i) => {
    const p = layout[i];
    const resources = (pyqPdfs[selectedPyqYear] && pyqPdfs[selectedPyqYear][subject]) || [];
    addNode({
      id: `pyq-${selectedPyqYear}-${i}`,
      label: subject,
      x: p.x,
      y: p.y,
      type: 'subject',
      asChild: true,
      extraClasses: 'enter-pop',
      enterDelay: 140 + i * 80,
      onClick: () => {
        logAppEvent('pyq_subject_selected', {
          year_id: selectedPyqYear,
          subject_name: subject,
          resource_count: resources.length
        });
        selectedSubject = subject;
        render();
      }
    });
  });
}

function renderQbankSubjects() {
  clearTree();
  const qbank = qbankData[selectedQbankYear];
  const year = data.years.find((y) => y.id === selectedQbankYear);
  if (!qbank) {
    selectedQbankYear = null;
    render();
    return;
  }

  hint.textContent = 'Choose a subject for Question Bank.';
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
      logAppEvent('navigation_back', {
        from_view: 'qbank',
        year_id: selectedQbankYear,
        destination: 'home'
      });
      selectedQbankYear = null;
      selectedYearId = null;
      render();
    }
  });

  addNode({
    id: 'qbank-root',
    label: qbank.label,
    x: 50,
    y: variant === 'mobile' ? 44 : variant === 'tablet' ? 50 : 54,
    type: 'root',
    asRoot: true,
    extraClasses: 'enter-pop',
    enterDelay: 70,
    onClick: () => {
      logAppEvent('navigation_back', {
        from_view: 'qbank',
        year_id: selectedQbankYear,
        destination: 'year'
      });
      selectedQbankYear = null;
      render();
    }
  });

  const layoutKey = qbank.subjects.length;
  const layout = subjectLayouts[layoutKey]
    ? subjectLayouts[layoutKey][variant]
    : subjectLayouts[4][variant];

  qbank.subjects.forEach((subject, i) => {
    const p = layout[i];
    const resources = (qbankPdfs[selectedQbankYear] && qbankPdfs[selectedQbankYear][subject]) || [];
    addNode({
      id: `qbank-${selectedQbankYear}-${i}`,
      label: subject,
      x: p.x,
      y: p.y,
      type: 'subject',
      asChild: true,
      extraClasses: 'enter-pop',
      enterDelay: 140 + i * 80,
      onClick: () => {
        logAppEvent('qbank_subject_selected', {
          year_id: selectedQbankYear,
          subject_name: subject,
          resource_count: resources.length
        });
        selectedSubject = subject;
        render();
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
  const isPyqMode = Boolean(selectedPyqYear);
  const isQbankMode = Boolean(selectedQbankYear);
  const resources = isPyqMode
    ? ((pyqPdfs[selectedPyqYear] && pyqPdfs[selectedPyqYear][selectedSubject]) || [])
    : isQbankMode
    ? ((qbankPdfs[selectedQbankYear] && qbankPdfs[selectedQbankYear][selectedSubject]) || [])
    : (subjectPdfs[selectedSubject] || []);
  const libraryLabel = isPyqMode 
    ? `${selectedSubject} — PYQs` 
    : isQbankMode
    ? `${selectedSubject} — Qbank`
    : selectedSubject;
  hint.textContent = `${libraryLabel} library`;

  const container = createEl('div', 'library-view');
  container.classList.add('enter');
  const header = createEl('div', 'library-head');
  const backLabel = isPyqMode 
    ? pyqData[selectedPyqYear].label 
    : isQbankMode
    ? qbankData[selectedQbankYear].label
    : (year ? year.label : 'Year');
  const backYearBtn = createEl('button', 'library-back-btn', '\u2190');
  backYearBtn.setAttribute('aria-label', `Back to ${backLabel}`);
  backYearBtn.type = 'button';
  backYearBtn.addEventListener('click', () => {
    logAppEvent('navigation_back', {
      from_view: 'library',
      subject_name: selectedSubject,
      year_id: selectedYearId || 'root',
      pyq_year: selectedPyqYear || null,
      qbank_year: selectedQbankYear || null,
      destination: isPyqMode ? 'pyq' : isQbankMode ? 'qbank' : (selectedYearId ? 'year' : 'home')
    });
    selectedSubject = null;
    render();
  });
  const title = createEl('h2', 'library-title', libraryLabel);
  header.append(backYearBtn, title);
  const list = createEl('div', 'book-list');
  if (!resources.length) {
    const empty = createEl('div', 'book-item empty-item', 'No books added yet.');
    empty.setAttribute('aria-disabled', 'true');
    list.appendChild(empty);
  } else {
    resources.forEach((book) => {
      const btn = createEl('button', 'book-item', book.title);
      btn.type = 'button';
      btn.style.setProperty('--list-delay', `${70 + list.children.length * 55}ms`);
      btn.addEventListener('click', () => {
        openBookViewer(
          {
            ...book,
            subject: selectedSubject,
            yearId: selectedYearId || '',
            yearLabel: year ? year.label : 'Root Library'
          },
          isPyqMode ? 'pyq_library' : isQbankMode ? 'qbank_library' : 'library'
        );
      });
      list.appendChild(btn);
    });
  }
  container.append(header, list);
  nodeLayer.appendChild(container);
}

function render() {
  const isHome = !selectedYearId && !selectedSubject && !selectedPyqYear && !selectedQbankYear;
  updateInstallHint(isHome);
  updateSearchVisibility(isHome);
  if (isHome && globalSearch) {
    renderSearchResults(globalSearch.value);
  }

  if (selectedSubject) {
    renderSubjectLibrary();
  } else if (selectedPyqYear) {
    renderPyqSubjects();
  } else if (selectedQbankYear) {
    renderQbankSubjects();
  } else if (selectedYearId) {
    renderYear();
  } else {
    renderHome();
  }

  const screenName = selectedSubject ? 'library_view' : selectedPyqYear ? 'pyq_view' : selectedQbankYear ? 'qbank_view' : selectedYearId ? 'year_view' : 'home_view';
  const screenKey = `${screenName}:${selectedYearId || 'root'}:${selectedPyqYear || 'none'}:${selectedQbankYear || 'none'}:${selectedSubject || 'none'}`;
  if (screenKey !== lastTrackedScreen) {
    lastTrackedScreen = screenKey;
    trackScreen(screenName, {
      year_id: selectedYearId || 'root',
      pyq_year: selectedPyqYear || 'none',
      qbank_year: selectedQbankYear || 'none',
      subject_name: selectedSubject || 'none'
    });
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

if (globalSearch) {
  globalSearch.addEventListener('input', (event) => {
    renderSearchResults(event.target.value);
  });
}

hydrateStateFromUrl();
render();
document.documentElement.classList.remove('pre-route');

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    warmupAnalytics();
  }, { timeout: 2000 });
} else {
  window.setTimeout(() => {
    warmupAnalytics();
  }, 400);
}
