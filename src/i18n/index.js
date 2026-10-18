import en from './en.js';
import zh from './zh.js';

// Register new languages here. The first entry is the default.
export const languages = [
  { code: 'en', label: 'EN', dict: en },
  { code: 'zh', label: '中文', dict: zh },
];
const KEY = 'lang';
const byCode = Object.fromEntries(languages.map((l) => [l.code, l.dict]));

let current = 'en';
try { const saved = localStorage.getItem(KEY); if (saved && byCode[saved]) current = saved; } catch { /* storage unavailable */ }

export const getLang = () => current;
export const locale = () => byCode[current];
export const t = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), locale().ui);

export function setLang(code) {
  if (!byCode[code] || code === current) return false;
  current = code;
  try { localStorage.setItem(KEY, code); } catch { /* ignore */ }
  return true;
}

/** Writes translated text into every [data-i18n] / [data-i18n-html] element and the document head. */
export function applyStatic() {
  const L = locale();
  document.documentElement.lang = L.htmlLang;
  document.title = t('meta.title');
  const setMeta = (sel, v) => document.querySelector(sel)?.setAttribute('content', v);
  setMeta('meta[name="description"]', t('meta.description'));
  setMeta('meta[property="og:title"]', t('meta.title'));
  setMeta('meta[property="og:description"]', t('meta.description'));
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    let v = t(el.dataset.i18n);
    if (el.dataset.repeat) v = (v + ' · ').repeat(+el.dataset.repeat);
    el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const [attr, key] = el.dataset.i18nAttr.split(':');
    el.setAttribute(attr, t(key));
  });
}
