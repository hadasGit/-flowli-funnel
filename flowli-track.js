/* מדידת משפך האבחון: שולח אירועים אנונימיים (בלי פרטים אישיים) ל-funnel_events.
   צפייה בדף נרשמת אוטומטית; צעדים אחרים נקראים ידנית עם flowliTrack('event'). */
(function () {
  var URL = 'https://whuuevjoqitwslnykvgd.supabase.co/rest/v1/rpc/funnel_track';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndodXVldmpvcWl0d3NsbnlrdmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMTk3NDQsImV4cCI6MjA5NDY5NTc0NH0.r_lxvPFY275H7ODxYGHs0-NvqfQd8_e3fKHYy4sgq34';

  function store(k, v) {
    try { if (v !== undefined) sessionStorage.setItem(k, v); return sessionStorage.getItem(k); } catch (e) { return null; }
  }

  /* source נקלט גם כאן, כדי שיגיע כבר לאירוע הצפייה הראשון */
  try {
    var src = new URLSearchParams(location.search).get('source');
    if (src) store('flowli_source', src);
  } catch (e) {}

  var sid = store('flowli_sid');
  if (!sid) sid = store('flowli_sid', Date.now().toString(36) + Math.random().toString(36).slice(2, 10)) || 'nostore';

  /* בדיקות מקומיות לא נספרות, כדי לא לזהם את נתוני הקמפיין */
  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';

  window.flowliTrack = function (event) {
    if (isLocal) return;
    try { if (localStorage.getItem('flowli_cookies') === 'declined') return; } catch (e) {}
    try {
      fetch(URL, {
        method: 'POST',
        keepalive: true,
        headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_session: sid, p_event: event, p_source: store('flowli_source'), p_page: location.pathname })
      }).catch(function () {});
    } catch (e) {}
  };

  /* Cloudflare Pages מגיש כתובות בלי .html - לכן משווים לפי שם הדף בלי הסיומת */
  var views = {
    'flowli-diagnose-intro': 'intro_view',
    'flowli-diagnose-step1': 'questions_view',
    'flowli-diagnose-loading': 'loading_view',
    'flowli-diagnose-page': 'lead_form_view',
    'flowli-diagnose-results': 'results_view'
  };
  var view = views[location.pathname.split('/').pop().replace(/\.html$/, '')];
  if (view) window.flowliTrack(view);
})();
