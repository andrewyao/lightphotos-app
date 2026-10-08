(function () {
  var STORAGE_KEY = 'lp-theme';
  var THEMES = ['light', 'neutral', 'dark'];

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.lp-theme-menu [data-theme-choice]').forEach(function (item) {
      var active = item.getAttribute('data-theme-choice') === theme;
      item.setAttribute('aria-checked', active ? 'true' : 'false');
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
    var button = document.querySelector('.lp-theme-btn');
    var menu = document.querySelector('.lp-theme-menu');
    if (!button || !menu) return;
    var items = Array.prototype.slice.call(menu.querySelectorAll('[data-theme-choice]'));
    applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');

    function open() {
      menu.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      var checked = menu.querySelector('[aria-checked="true"]') || items[0];
      checked.focus();
    }

    function close(refocus) {
      if (menu.hidden) return;
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      if (refocus) button.focus();
    }

    button.addEventListener('click', function () {
      if (menu.hidden) open();
      else close(false);
    });

    menu.addEventListener('click', function (event) {
      var item = event.target.closest('[data-theme-choice]');
      if (!item) return;
      setTheme(item.getAttribute('data-theme-choice'));
      close(true);
    });

    menu.addEventListener('keydown', function (event) {
      var i = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        var step = event.key === 'ArrowDown' ? 1 : -1;
        items[(i + step + items.length) % items.length].focus();
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        items[event.key === 'Home' ? 0 : items.length - 1].focus();
      } else if (event.key === 'Tab') {
        close(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close(true);
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.lp-theme-toggle')) close(false);
    });
  });
})();
