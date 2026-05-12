(function () {
  if (localStorage.getItem('cookieConsent')) return;

  var lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  var policyLink = lang === 'en' ? 'cookie-policy_en.html' : 'politica-cookies.html';

  var msg       = lang === 'en'
    ? 'We use cookies to improve your browsing experience. <a href="' + policyLink + '">Learn more</a>.'
    : 'Usamos cookies para mejorar tu experiencia. <a href="' + policyLink + '">Más información</a>.';
  var acceptTxt = lang === 'en' ? 'Accept' : 'Aceptar';
  var rejectTxt = lang === 'en' ? 'Reject' : 'Rechazar';

  var style = document.createElement('style');
  style.textContent = [
    '#ck-banner{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);',
    'background:#1c1c1c;color:#ccc;border-radius:14px;padding:14px 18px;',
    'display:flex;align-items:center;gap:14px;max-width:620px;width:calc(100% - 32px);',
    'box-shadow:0 8px 40px rgba(0,0,0,0.35);z-index:99999;',
    'font-family:Inter,sans-serif;font-size:13.5px;line-height:1.45;',
    'animation:ck-in .35s ease;}',
    '@keyframes ck-in{from{opacity:0;transform:translateX(-50%) translateY(18px)}',
    'to{opacity:1;transform:translateX(-50%) translateY(0)}}',
    '#ck-banner p{margin:0;flex:1;color:rgba(255,255,255,0.55);}',
    '#ck-banner a{color:#81C784;text-decoration:underline;}',
    '#ck-banner .ck-btns{display:flex;gap:8px;flex-shrink:0;}',
    '#ck-banner .ck-ok{background:#4caf50;color:#fff;border:none;',
    'padding:8px 20px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;}',
    '#ck-banner .ck-no{background:transparent;color:#888;border:1px solid #444;',
    'padding:8px 14px;border-radius:8px;cursor:pointer;font-size:13px;white-space:nowrap;}',
    '#ck-banner .ck-ok:hover{background:#43a047;}',
    '#ck-banner .ck-no:hover{color:#ccc;border-color:#666;}',
    '@media(max-width:520px){#ck-banner{flex-direction:column;align-items:flex-start;gap:12px;}}'
  ].join('');
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'ck-banner';
  banner.innerHTML =
    '<p>' + msg + '</p>' +
    '<div class="ck-btns">' +
      '<button class="ck-no" id="ck-reject">' + rejectTxt + '</button>' +
      '<button class="ck-ok" id="ck-accept">' + acceptTxt + '</button>' +
    '</div>';
  document.body.appendChild(banner);

  function dismiss(val) {
    localStorage.setItem('cookieConsent', val);
    banner.style.transition = 'opacity .3s, transform .3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateX(-50%) translateY(18px)';
    setTimeout(function () { banner.remove(); }, 320);
  }

  document.getElementById('ck-accept').addEventListener('click', function () { dismiss('accepted'); });
  document.getElementById('ck-reject').addEventListener('click', function () { dismiss('rejected'); });
})();
