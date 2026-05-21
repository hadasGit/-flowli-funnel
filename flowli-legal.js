/* ═══════════════════════════════════════════════
   flowli-legal.js
   כפתור נגישות + הצהרת נגישות + פופאפ עוגיות
   כולל CSS inline — קובץ אחד לכל הדפים
═══════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    /* ── כפתור נגישות ── */
    #flowli-a11y-btn {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9000;
      width: 48px; height: 48px;
      border-radius: 50%;
      background: #B8966A;
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,.22);
      transition: transform .2s, box-shadow .2s;
    }
    #flowli-a11y-btn:hover { transform: scale(1.08); box-shadow: 0 6px 22px rgba(0,0,0,.3); }
    #flowli-a11y-btn svg { width: 24px; height: 24px; fill: #fff; }
    #flowli-a11y-btn:focus-visible { outline: 3px solid #F26B1F; outline-offset: 3px; }

    /* ── מודל בסיס ── */
    .flowli-modal-overlay {
      position: fixed; inset: 0; z-index: 9100;
      background: rgba(26,26,26,.55);
      backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      opacity: 0; pointer-events: none;
      transition: opacity .25s;
    }
    .flowli-modal-overlay.open { opacity: 1; pointer-events: auto; }

    .flowli-modal {
      background: #FAFAF7;
      border-radius: 20px;
      max-width: 560px; width: 100%;
      max-height: 82vh;
      overflow-y: auto;
      padding: 36px 32px 28px;
      position: relative;
      box-shadow: 0 24px 60px rgba(0,0,0,.18);
      font-family: 'Assistant', system-ui, sans-serif;
      direction: rtl; text-align: right;
    }
    .flowli-modal h2 {
      font-size: 22px; font-weight: 800; color: #1A1A1A;
      margin-bottom: 16px; line-height: 1.25;
    }
    .flowli-modal h3 {
      font-size: 16px; font-weight: 700; color: #1A1A1A;
      margin: 20px 0 8px;
    }
    .flowli-modal p, .flowli-modal li {
      font-size: 15px; color: #444; line-height: 1.75;
    }
    .flowli-modal ul { padding-right: 18px; margin: 8px 0; }
    .flowli-modal li { margin-bottom: 4px; }
    .flowli-modal .modal-close {
      position: absolute; top: 16px; left: 16px;
      background: none; border: none; cursor: pointer;
      width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: #888; transition: background .2s, color .2s;
    }
    .flowli-modal .modal-close:hover { background: #f0ede6; color: #1A1A1A; }
    .flowli-modal .modal-close svg { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 2.5; stroke-linecap: round; }
    .flowli-modal .modal-footer {
      margin-top: 24px; padding-top: 16px;
      border-top: 1px solid #E8E4D6;
      display: flex; gap: 10px; flex-wrap: wrap;
    }
    .flowli-modal .btn-orange {
      background: #F26B1F; color: #fff;
      border: none; border-radius: 10px;
      padding: 12px 24px; font-family: 'Assistant', sans-serif;
      font-weight: 700; font-size: 15px; cursor: pointer;
      transition: background .2s;
    }
    .flowli-modal .btn-orange:hover { background: #D45A12; }
    .flowli-modal .btn-ghost {
      background: transparent; color: #888;
      border: 1.5px solid #D8D0BE; border-radius: 10px;
      padding: 11px 20px; font-family: 'Assistant', sans-serif;
      font-weight: 600; font-size: 14px; cursor: pointer;
      transition: border-color .2s, color .2s;
    }
    .flowli-modal .btn-ghost:hover { border-color: #888; color: #1A1A1A; }
    .modal-tag {
      display: inline-block;
      background: #FEF0E7; color: #D45A12;
      border: 1px solid #FDDDBD;
      border-radius: 20px; padding: 3px 12px;
      font-size: 11px; font-weight: 700; letter-spacing: .04em;
      text-transform: uppercase; margin-bottom: 14px;
      font-family: 'JetBrains Mono', monospace;
    }

    /* ── פופאפ עוגיות ── */
    #flowli-cookie-bar {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 8900;
      background: #1A1A1A;
      color: #fff;
      padding: 16px 24px;
      display: flex; align-items: center; gap: 16px;
      flex-wrap: wrap;
      font-family: 'Assistant', system-ui, sans-serif;
      direction: rtl;
      transform: translateY(100%);
      transition: transform .4s cubic-bezier(.4,0,.2,1);
    }
    #flowli-cookie-bar.show { transform: translateY(0); }
    #flowli-cookie-bar p {
      flex: 1; font-size: 14px; line-height: 1.55; color: #ccc;
      margin: 0;
    }
    #flowli-cookie-bar a {
      color: #F26B1F; text-decoration: underline; cursor: pointer;
    }
    #flowli-cookie-bar .cookie-btns {
      display: flex; gap: 10px; flex-shrink: 0;
    }
    #flowli-cookie-bar .btn-accept {
      background: #F26B1F; color: #fff; border: none;
      border-radius: 8px; padding: 10px 20px;
      font-family: 'Assistant', sans-serif; font-weight: 700;
      font-size: 14px; cursor: pointer; transition: background .2s;
    }
    #flowli-cookie-bar .btn-accept:hover { background: #D45A12; }
    #flowli-cookie-bar .btn-decline {
      background: transparent; color: #888;
      border: 1.5px solid #444; border-radius: 8px;
      padding: 9px 16px; font-family: 'Assistant', sans-serif;
      font-weight: 600; font-size: 13px; cursor: pointer;
      transition: border-color .2s, color .2s;
    }
    #flowli-cookie-bar .btn-decline:hover { border-color: #888; color: #ccc; }

    /* ── skip link ── */
    #flowli-skip-link {
      position: fixed; top: -100px; right: 24px; z-index: 9999;
      background: #F26B1F; color: #fff;
      padding: 10px 20px; border-radius: 0 0 10px 10px;
      font-family: 'Assistant', sans-serif; font-weight: 700;
      font-size: 15px; text-decoration: none;
      transition: top .2s;
    }
    #flowli-skip-link:focus { top: 0; }
  `;
  document.head.appendChild(style);

  /* ── Skip link ── */
  const skip = document.createElement('a');
  skip.id = 'flowli-skip-link';
  skip.href = '#main-content';
  skip.textContent = 'דלג לתוכן הראשי';
  document.body.prepend(skip);
  // סמן main אם לא קיים
  const main = document.querySelector('main, .page-wrap');
  if (main && !main.id) main.id = 'main-content';

  /* ════════════════════════════════════
     מודל נגישות
  ════════════════════════════════════ */
  const a11yOverlay = document.createElement('div');
  a11yOverlay.className = 'flowli-modal-overlay';
  a11yOverlay.id = 'flowli-a11y-modal';
  a11yOverlay.setAttribute('role', 'dialog');
  a11yOverlay.setAttribute('aria-modal', 'true');
  a11yOverlay.setAttribute('aria-labelledby', 'a11y-title');
  a11yOverlay.innerHTML = `
    <div class="flowli-modal">
      <button class="modal-close" onclick="flowliCloseModal('flowli-a11y-modal')" aria-label="סגור">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-tag">נגישות</div>
      <h2 id="a11y-title">הצהרת נגישות</h2>

      <h3>מבוא</h3>
      <p>הזירה האינטרנטית היא פלטפורמה לביטוי וייצוג עצמי — זירה חברתית שבה אנחנו רוכשים, מוכרים, עובדים ונחשפים יותר מבעבר. ככזו, ישנה מחויבות לאפשר לכלל הציבור חוויית גלישה מהנה וקלה.</p>
      <p style="margin-top:10px">אנו ב-Flowli משקיעים משאבים רבים להנגשת האתר, מתוך אמונה בכבוד האדם וחירותו — כולנו שווי זכויות ושווים במהותנו.</p>

      <h3>רמת נגישות</h3>
      <p>האתר מונגש בהתאם לתקן הישראלי 5568 ולרמת AA של WCAG 2.1 (הנחיות W3C לנגישות תכנים באינטרנט).</p>

      <h3>תאימות דפדפנים ומכשירים</h3>
      <p>האתר מותאם לגלישה מהדפדפנים המובילים (Chrome, Firefox, Safari) ולכלל המכשירים הניידים.</p>

      <h3>קיצורי מקלדת שימושיים</h3>
      <ul>
        <li><strong>Ctrl +</strong> — הגדלת טקסט</li>
        <li><strong>Ctrl –</strong> — הקטנת טקסט</li>
        <li><strong>Ctrl 0</strong> — חזרה לגודל מקורי</li>
        <li><strong>F11</strong> — מסך מלא</li>
        <li><strong>Tab</strong> — מעבר בין אלמנטים אינטראקטיביים</li>
        <li><strong>Esc</strong> — סגירת תפריטים ופופאפים</li>
      </ul>

      <h3>מגבלות ידועות</h3>
      <p>ייתכן שחלק מהתכנים המוטמעים מגורמים שלישיים אינם נגישים במלואם. אנו פועלים לשיפור מתמיד וללא פשרות.</p>

      <h3>פנייה בנושא נגישות</h3>
      <p>נתקלת.ם בקושי בגלישה? נשמח לדעת ולתקן.<br>
      <strong>רכזת נגישות:</strong> הדס גרינברג<br>
      <strong>מייל:</strong> <a href="mailto:hadas@flowli.co.il">hadas@flowli.co.il</a><br>
      <strong>זמן מענה:</strong> עד 5 ימי עסקים</p>

      <p style="margin-top:16px;font-size:13px;color:#999;">עדכון אחרון: מאי 2026 · הצהרה תקפה לפי תקן ישראלי 5568</p>

      <div class="modal-footer">
        <button class="btn-orange" onclick="flowliCloseModal('flowli-a11y-modal')">הבנתי, סגור</button>
      </div>
    </div>
  `;
  document.body.appendChild(a11yOverlay);

  /* ════════════════════════════════════
     מודל מדיניות פרטיות
  ════════════════════════════════════ */
  const privOverlay = document.createElement('div');
  privOverlay.className = 'flowli-modal-overlay';
  privOverlay.id = 'flowli-privacy-modal';
  privOverlay.setAttribute('role', 'dialog');
  privOverlay.setAttribute('aria-modal', 'true');
  privOverlay.setAttribute('aria-labelledby', 'priv-title');
  privOverlay.innerHTML = `
    <div class="flowli-modal">
      <button class="modal-close" onclick="flowliCloseModal('flowli-privacy-modal')" aria-label="סגור">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-tag">פרטיות</div>
      <h2 id="priv-title">מדיניות פרטיות – Flowli</h2>
      <p style="font-size:13px;color:#999;margin-bottom:4px">עודכן לאחרונה: מאי 2026</p>

      <h3>1. כללי</h3>
      <p>ברוכים הבאים ל-Flowli (להלן: "האתר", "השירות", "החברה"). מדיניות פרטיות זו מסבירה כיצד נאסף, נשמר, מעובד ומשמש מידע אישי של משתמשים. השימוש בשירות מהווה הסכמה למדיניות זו במלואה.</p>

      <h3>2. איזה מידע אנו אוספים</h3>
      <p><strong>מידע שנמסר על-ידך:</strong></p>
      <ul>
        <li>שם מלא, כתובת דוא"ל ומספר טלפון</li>
        <li>תשובות שאלון האבחון — נשמרות בשרתי Flowli לצורך מתן שירות מותאם אישית</li>
        <li>תכנים שנכתבים בשדות הטקסט החופשי</li>
      </ul>
      <p style="margin-top:8px"><strong>מידע טכני ואוטומטי:</strong></p>
      <ul>
        <li>כתובת IP, סוג דפדפן, מערכת הפעלה</li>
        <li>נתוני אנליטיקה ושימוש אנונימיים</li>
        <li>עוגיות (Cookies) — ראה סעיף 5</li>
      </ul>

      <h3>3. שימוש במידע</h3>
      <ul>
        <li>יצירת קשר לצורך תיאום שיחת ייעוץ</li>
        <li>שליחת תכנים מקצועיים ועדכונים (בהתאם להסכמתך)</li>
        <li>שיפור השירות על בסיס נתונים מצטברים ואנונימיים</li>
        <li>עמידה בדרישות חוקיות ורגולטוריות</li>
      </ul>

      <h3>4. שימוש בטכנולוגיות AI</h3>
      <p>השירות עושה שימוש בטכנולוגיות בינה מלאכותית לניתוח תשובות האבחון והתאמת ההמלצות. המידע אינו משמש לאימון ציבורי של מודלים. אין לראות בתוצאות האבחון ייעוץ מקצועי, משפטי, פיננסי או רפואי.</p>

      <h3>5. Cookies ועוגיות</h3>
      <ul>
        <li><strong>חיוניות</strong> — להפעלת האתר</li>
        <li><strong>פונקציונליות</strong> — לשיפור חוויית שימוש</li>
        <li><strong>אנליטיות</strong> — ניתוח תנועה אנונימי</li>
      </ul>
      <p>ניתן לחסום עוגיות דרך הגדרות הדפדפן.</p>

      <h3>6. שיתוף מידע</h3>
      <p>המידע עשוי להיות משותף עם ספקי שירות חיוניים (מערכות דיוור, אנליטיקה, ספקי AI). המידע לא נמכר לצדדים שלישיים. העברת מידע לחו"ל עשויה להתבצע בהסכמתך.</p>

      <h3>7. זכויותיך</h3>
      <ul>
        <li>לעיין במידע האישי שלך</li>
        <li>לבקש תיקון מידע שגוי</li>
        <li>לבקש מחיקת מידע</li>
        <li>לבטל הסכמה לדיוור</li>
        <li>לבקש העברת מידע</li>
      </ul>
      <p>לפנייה: <a href="mailto:hadas@flowli.co.il">hadas@flowli.co.il</a> · מענה עד 5 ימי עסקים</p>

      <h3>8. אבטחת מידע</h3>
      <p>אנו נוקטים באמצעים טכנולוגיים ואורגניזציוניים סבירים לאבטחת המידע. עם זאת, אין אבטחה מוחלטת ולא ניתן להבטיח חסינות מלאה.</p>

      <h3>9. קטינים</h3>
      <p>השירות מיועד לגיל 18 ומעלה. לא נאסף ביודעין מידע מקטינים.</p>

      <h3>10. שינויים במדיניות</h3>
      <p>החברה רשאית לעדכן מדיניות זו מעת לעת. הגרסה המעודכנת תפורסם באתר ותחייב מרגע פרסומה.</p>

      <p style="margin-top:16px;font-size:13px;color:#999;">הדס גרינברג · Flowli · hadas@flowli.co.il</p>

      <div class="modal-footer">
        <button class="btn-orange" onclick="flowliCloseModal('flowli-privacy-modal')">הבנתי, סגור</button>
      </div>
    </div>
  `;
  document.body.appendChild(privOverlay);

  /* ════════════════════════════════════
     כפתור נגישות
  ════════════════════════════════════ */
  const a11yBtn = document.createElement('button');
  a11yBtn.id = 'flowli-a11y-btn';
  a11yBtn.setAttribute('aria-label', 'הצהרת נגישות');
  a11yBtn.title = 'נגישות';
  a11yBtn.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6c1.1 0 2 .9 2 2v4l1.5 3H16a1 1 0 1 1 0 2h-1.5l-1-2h-3l-1 2H8a1 1 0 1 1 0-2h.5L10 14v-4c0-1.1.9-2 2-2z"/></svg>`;
  a11yBtn.onclick = () => flowliOpenModal('flowli-a11y-modal');
  document.body.appendChild(a11yBtn);

  /* ════════════════════════════════════
     פופאפ עוגיות
  ════════════════════════════════════ */
  const cookieBar = document.createElement('div');
  cookieBar.id = 'flowli-cookie-bar';
  cookieBar.setAttribute('role', 'region');
  cookieBar.setAttribute('aria-label', 'הסכמה לעוגיות');
  cookieBar.innerHTML = `
    <p>
      אנחנו משתמשים בעוגיות לצורך שיפור חוויית המשתמש וניתוח שימוש אנונימי.
      <a onclick="flowliOpenModal('flowli-privacy-modal')" tabindex="0">מדיניות פרטיות</a>
    </p>
    <div class="cookie-btns">
      <button class="btn-accept" onclick="flowliAcceptCookies()">מסכימ.ה ✓</button>
      <button class="btn-decline" onclick="flowliDeclineCookies()">לא תודה</button>
    </div>
  `;
  document.body.appendChild(cookieBar);

  // הצג עוגיות אם לא הוחלט עדיין
  if (!localStorage.getItem('flowli_cookies')) {
    setTimeout(() => cookieBar.classList.add('show'), 1200);
  }

  /* ════════════════════════════════════
     פונקציות גלובליות
  ════════════════════════════════════ */
  window.flowliOpenModal = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
    // focus ראשון
    setTimeout(() => {
      const first = el.querySelector('button, [tabindex]');
      if (first) first.focus();
    }, 50);
  };

  window.flowliCloseModal = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.flowliAcceptCookies = function() {
    localStorage.setItem('flowli_cookies', 'accepted');
    document.getElementById('flowli-cookie-bar').classList.remove('show');
  };

  window.flowliDeclineCookies = function() {
    localStorage.setItem('flowli_cookies', 'declined');
    document.getElementById('flowli-cookie-bar').classList.remove('show');
  };

  // סגירה בלחיצה על overlay
  document.querySelectorAll('.flowli-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) flowliCloseModal(this.id);
    });
  });

  // סגירה ב-Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.flowli-modal-overlay.open').forEach(el => {
        flowliCloseModal(el.id);
      });
    }
  });

})();
