let analyticsInstancePromise = null;
let queuedEvents = [];

function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}

function loadAnalytics() {
  if (analyticsInstancePromise) return analyticsInstancePromise;

  analyticsInstancePromise = Promise.all([
    import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js'),
    import('./firebase-config.js')
  ])
    .then(async ([appModule, analyticsModule, configModule]) => {
      const firebaseApp = appModule.initializeApp(configModule.firebaseConfig);
      const supported = await analyticsModule.isSupported().catch(() => false);
      if (!supported) return null;
      return {
        analytics: analyticsModule.getAnalytics(firebaseApp),
        logEvent: analyticsModule.logEvent
      };
    })
    .catch(() => null)
    .then((instance) => {
      if (instance && queuedEvents.length) {
        queuedEvents.forEach(({ name, params }) => {
          instance.logEvent(instance.analytics, name, params);
        });
      }
      queuedEvents = [];
      return instance;
    });

  return analyticsInstancePromise;
}

export function warmupAnalytics() {
  loadAnalytics();
}

export function logAppEvent(name, params = {}) {
  const safeParams = cleanParams(params);
  const payload = { name, params: safeParams };

  if (!analyticsInstancePromise) {
    queuedEvents.push(payload);
    return;
  }

  analyticsInstancePromise.then((instance) => {
    if (!instance) return;
    instance.logEvent(instance.analytics, name, safeParams);
  });
}

export function trackScreen(screenName, params = {}) {
  logAppEvent('screen_view', {
    firebase_screen: screenName,
    screen_name: screenName,
    ...params
  });
}

