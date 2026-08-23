(function () {
  var STORAGE_KEY = 'lp-theme';
  var THEMES = ['light', 'neutral', 'dark'];

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var toggle = document.querySelector('.lp-theme-toggle');
    if (!toggle) return;
    var buttons = toggle.querySelectorAll('button[data-theme-choice]');
    buttons.forEach(function (btn) {
      var active = btn.getAttribute('data-theme-choice') === theme;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setTheme(theme) {
    if (THEMES.indexOf(theme) === -1) return;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    applyTheme(theme);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.lp-theme-toggle');
    if (!toggle) return;
    applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    toggle.addEventListener('click', function (event) {
      var btn = event.target.closest('button[data-theme-choice]');
      if (!btn) return;
      setTheme(btn.getAttribute('data-theme-choice'));
    });
  });
})();
