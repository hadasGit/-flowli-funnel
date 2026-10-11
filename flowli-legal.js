/* ═══════════════════════════════════════════════
   flowli-legal.js
   כפתור נגישות + הצהרת נגישות + פופאפ עוגיות
   כולל CSS inline - קובץ אחד לכל הדפים
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
      background: #1A1A1A;
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
      <p>הזירה האינטרנטית היא פלטפורמה לביטוי וייצוג עצמי - זירה חברתית שבה אנחנו רוכשים, מוכרים, עובדים ונחשפים יותר מבעבר. ככזו, ישנה מחויבות לאפשר לכלל הציבור חוויית גלישה מהנה וקלה.</p>
      <p style="margin-top:10px">אנו ב-Flowli משקיעים משאבים רבים להנגשת האתר, מתוך אמונה בכבוד האדם וחירותו - כולנו שווי זכויות ושווים במהותנו.</p>

      <h3>רמת נגישות</h3>
      <p>האתר מונגש בהתאם לתקן הישראלי 5568 ולרמת AA של WCAG 2.1 (הנחיות W3C לנגישות תכנים באינטרנט).</p>

      <h3>תאימות דפדפנים ומכשירים</h3>
      <p>האתר מותאם לגלישה מהדפדפנים המובילים (Chrome, Firefox, Safari) ולכלל המכשירים הניידים.</p>

      <h3>קיצורי מקלדת שימושיים</h3>
      <ul>
        <li><strong>Ctrl +</strong> - הגדלת טקסט</li>
        <li><strong>Ctrl -</strong> - הקטנת טקסט</li>
        <li><strong>Ctrl 0</strong> - חזרה לגודל מקורי</li>
        <li><strong>F11</strong> - מסך מלא</li>
        <li><strong>Tab</strong> - מעבר בין אלמנטים אינטראקטיביים</li>
        <li><strong>Esc</strong> - סגירת תפריטים ופופאפים</li>
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
      <h2 id="priv-title">מדיניות פרטיות - Flowli</h2>
      <p style="font-size:13px;color:#999;margin-bottom:4px">עודכן לאחרונה: אוקטובר 2026</p>

      <h3>1. כללי</h3>
      <p>מדיניות זו מסבירה איזה מידע Flowli אוספת באתר flowli.co.il ובאבחון map.flowli.co.il, למה היא אוספת אותו, ומה הזכויות שלך. האחראית על המידע: הדס גרינברג, Flowli.</p>

      <h3>2. איזה מידע נאסף</h3>
      <ul><li>פרטים שמסרת בטופס: שם, טלפון וכתובת מייל.</li><li>תשובות האבחון והטקסט החופשי שכתבת בו. הם נשמרים בדפדפן שלך וגם במערכת של Flowli.</li><li>מדידת שימוש אנונימית: צפיות בשלבי האבחון ולחיצות על כפתורים, בלי שם ובלי פרטי קשר.</li><li>מידע טכני שנשלח אוטומטית בכל גלישה, כמו כתובת IP וסוג הדפדפן. בכתובת ה-IP אנחנו משתמשים בצורה מעורבלת (hash) ולזמן קצר, רק כדי לחסום הצפה של הטפסים.</li></ul>

      <h3>3. האם חובה למסור מידע</h3>
      <p>אין חובה חוקית למסור מידע. המסירה תלויה ברצונך ובהסכמתך. בלי פרטי קשר לא נוכל לחזור אליך, ותוצאות האבחון מוצגות אחרי מילוי הפרטים.</p>

      <h3>4. למה המידע משמש</h3>
      <ul><li>לחזור אליך בעקבות פנייה ולתאם שיחה.</li><li>להציג ולשלוח לך את תוצאות האבחון והתייחסות אישית אליהן.</li><li>לשלוח תכנים מקצועיים ועדכונים, רק אם סימנת שזה מעניין אותך.</li><li>לשפר את האתר והשירות על בסיס נתונים מצטברים ואנונימיים.</li><li>לעמוד בדרישות החוק.</li></ul>

      <h3>5. דיוור</h3>
      <p>תכנים שיווקיים נשלחים רק למי שאישר.ה זאת בנפרד, בתיבת סימון שאינה חובה. אפשר להסיר את עצמך בכל עת, בקישור ההסרה שבמייל או בפנייה אלינו.</p>

      <h3>6. שימוש בטכנולוגיות AI</h3>
      <p>השירות עושה שימוש בטכנולוגיות בינה מלאכותית לניתוח תשובות האבחון והתאמת ההמלצות. המידע אינו משמש לאימון ציבורי של מודלים. אין לראות בתוצאות האבחון ייעוץ מקצועי, משפטי, פיננסי או רפואי.</p>

      <h3>7. עוגיות ואחסון בדפדפן</h3>
      <p>אנחנו לא מפעילים באתר עוגיות פרסום. בדפדפן שלך נשמרים (localStorage) תשובות האבחון, הפרטים שמילאת וההעדפות שלך, כדי שלא יהיה צורך למלא אותם שוב. את המדידה האנונימית אפשר לבטל בלחיצה על "לא תודה" בחלונית שמופיעה בכניסה לאתר. רכיבים של צד שלישי, המפורטים בסעיף הבא, עשויים לשמור מידע משלהם.</p>

      <h3>8. למי המידע מועבר</h3>
      <p>המידע לא נמכר. הוא מעובד אצל ספקי השירות שמשמשים אותנו להפעלת האתר והשירות:</p><ul><li>Supabase - מסד הנתונים.</li><li>Cloudflare - אחסון האתר.</li><li>Make - אוטומציה של הטיפול בפניות.</li><li>Google - תיבת המייל (Gmail) וגופנים (Google Fonts).</li><li>Telegram - התראה פנימית אלינו כשמתבקשת שיחה חוזרת.</li><li>Calendly - תיאום פגישה, אם בחרת לקבוע דרכו.</li><li>WhatsApp - אם פנית אלינו דרכו.</li><li>נגישות (negishot.co.il) - תוסף הנגישות.</li><li>ספקי AI - כמפורט בסעיף על טכנולוגיות AI.</li></ul><p>חלק מהספקים מאחסנים ומעבדים מידע מחוץ לישראל.</p>

      <h3>9. כמה זמן המידע נשמר</h3>
      <p>המידע נשמר כל עוד הוא נדרש למטרות שלשמן נמסר, או עד שתתקבל ממך בקשה למחוק אותו.</p>

      <h3>10. זכויותיך</h3>
      <ul><li>לעיין במידע האישי שלך.</li><li>לבקש תיקון של מידע שגוי.</li><li>לבקש מחיקה של המידע.</li><li>לבטל את ההסכמה לדיוור.</li><li>לבקש העברה של המידע.</li></ul>

      <h3>11. אבטחת מידע</h3>
      <p>אנו נוקטים באמצעים טכנולוגיים וארגוניים סבירים לאבטחת המידע. אין אבטחה מוחלטת.</p>

      <h3>12. קטינים</h3>
      <p>השירות מיועד לגיל 18 ומעלה. לא נאסף ביודעין מידע מקטינים.</p>

      <h3>13. שינויים במדיניות</h3>
      <p>Flowli רשאית לעדכן מדיניות זו מעת לעת. הגרסה המעודכנת תפורסם באתר ותחייב מרגע פרסומה.</p>

      <p style="margin-top:16px;font-size:13px;color:#999;">הדס גרינברג · Flowli · hadas@flowli.co.il</p>

      <div class="modal-footer">
        <button class="btn-orange" onclick="flowliCloseModal('flowli-privacy-modal')">הבנתי, סגור</button>
      </div>
    </div>
  `;
  document.body.appendChild(privOverlay);

  /* ════════════════════════════════════
     מודל תנאי שימוש
  ════════════════════════════════════ */
  const tosOverlay = document.createElement('div');
  tosOverlay.className = 'flowli-modal-overlay';
  tosOverlay.id = 'flowli-tos-modal';
  tosOverlay.setAttribute('role', 'dialog');
  tosOverlay.setAttribute('aria-modal', 'true');
  tosOverlay.setAttribute('aria-labelledby', 'tos-title');
  tosOverlay.innerHTML = `
    <div class="flowli-modal">
      <button class="modal-close" onclick="flowliCloseModal('flowli-tos-modal')" aria-label="סגור">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-tag">תנאים</div>
      <h2 id="tos-title">תנאי שימוש</h2>
      <p style="font-size:13px;color:#999;margin-bottom:4px">עודכן לאחרונה: יוני 2026</p>
      <p>השימוש באתר Flowli ובכל התכנים המופיעים בו כפוף לתנאי שימוש אלו.</p>
      <ol style="padding-right:20px;line-height:1.8;margin:12px 0">
        <li>האתר נועד לספק מידע כללי על שירותי Flowli וכלים לאבחון תהליכים עסקיים.</li>
        <li>תוצאות האבחון, ההמלצות והתכנים באתר נועדו למטרות מידע בלבד ואינם מהווים ייעוץ עסקי, משפטי, פיננסי או מקצועי מכל סוג.</li>
        <li>השימוש באתר ובאבחון הינו באחריות המשתמש בלבד.</li>
        <li>Flowli אינה מתחייבת לתוצאות עסקיות, לחיסכון כספי או לשיפור ביצועים כתוצאה משימוש באתר, באבחון או בשירותים המוצגים בו.</li>
        <li>כל התכנים באתר, לרבות טקסטים, עיצובים, תמונות, מסמכים ותהליכים, מוגנים בזכויות יוצרים ואין להעתיקם או לעשות בהם שימוש ללא אישור מראש.</li>
        <li>Flowli רשאית לעדכן את תנאי השימוש מעת לעת. המשך השימוש באתר מהווה הסכמה לגרסה המעודכנת.</li>
      </ol>
      <p style="margin-top:16px;font-size:13px;color:#999;">לשאלות ניתן לפנות: הדס גרינברג · hadas@flowli.co.il</p>
      <div class="modal-footer">
        <button class="btn-orange" onclick="flowliCloseModal('flowli-tos-modal')">הבנתי, סגור</button>
      </div>
    </div>
  `;
  document.body.appendChild(tosOverlay);

  /* ════════════════════════════════════
     פוטר משפטי דק - בכל הדפים
  ════════════════════════════════════ */
  const footStyle = document.createElement('style');
  footStyle.textContent = `
    #flowli-legal-footer {
      position: relative; z-index: 9;
      text-align: center; padding: 14px 16px 18px;
      font-family: 'Assistant', system-ui, sans-serif;
      font-size: 12.5px; color: #8A8378;
    }
    #flowli-legal-footer a {
      color: #8A8378; text-decoration: none; cursor: pointer;
      transition: color .2s;
    }
    #flowli-legal-footer a:hover { color: #D45A12; }
    #flowli-legal-footer .sep { margin: 0 7px; color: #DBC9A9; }
  `;
  document.head.appendChild(footStyle);

  const legalFooter = document.createElement('footer');
  legalFooter.id = 'flowli-legal-footer';
  legalFooter.setAttribute('role', 'contentinfo');
  legalFooter.innerHTML = `
    <span>© 2026 flowli</span>
    <span class="sep">·</span>
    <a onclick="flowliOpenModal('flowli-privacy-modal')" tabindex="0" onkeydown="if(event.key==='Enter')flowliOpenModal('flowli-privacy-modal')">מדיניות פרטיות</a>
    <span class="sep">·</span>
    <a onclick="flowliOpenModal('flowli-tos-modal')" tabindex="0" onkeydown="if(event.key==='Enter')flowliOpenModal('flowli-tos-modal')">תנאי שימוש</a>
    <span class="sep">·</span>
    <a onclick="flowliOpenModal('flowli-a11y-modal')" tabindex="0" onkeydown="if(event.key==='Enter')flowliOpenModal('flowli-a11y-modal')">הצהרת נגישות</a>
  `;
  document.body.appendChild(legalFooter);

  /* כפתור נגישות - מוחלף ע"י negishot widget */

  /* ════════════════════════════════════
     פופאפ עוגיות
  ════════════════════════════════════ */
  const cookieBar = document.createElement('div');
  cookieBar.id = 'flowli-cookie-bar';
  cookieBar.setAttribute('role', 'region');
  cookieBar.setAttribute('aria-label', 'הסכמה למדידת שימוש');
  cookieBar.innerHTML = `
    <p>
      אנחנו מודדים שימוש באתר באופן אנונימי כדי לשפר אותו, ושומרים בדפדפן שלך העדפות. אפשר לסרב למדידה.
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
