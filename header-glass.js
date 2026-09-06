// Liquid glass header adapted from https://whatsub.equal2.app/assets/site-nav.js
(function () {
  'use strict';
  var el = document.querySelector('.site-header');
  if (!el) return;
  if (!/Chrome\//.test(navigator.userAgent)) { el.classList.add('glass-frost'); return; }
  var SMALL = window.innerWidth < 768;
  var EDGE = 18, SCALE = Math.round(EDGE * (SMALL ? 0.95 : 1.4)), CHROMA = SMALL ? 0.03 : 0.045;    
  function lensMapURL(w, h, radius, edge, m) {
    var W = w + m * 2, H = h + m * 2;
    var cv = document.createElement('canvas');
    cv.width = Math.max(2, Math.round(W)); cv.height = Math.max(2, Math.round(H));
    var ctx = cv.getContext('2d');
    var img = ctx.createImageData(cv.width, cv.height), px = img.data;
    var hw = w / 2, hh = h / 2, r = Math.min(radius, hw, hh);
    function sd(x, y) {
      var qx = Math.abs(x) - (hw - r), qy = Math.abs(y) - (hh - r);
      var ax = Math.max(qx, 0), ay = Math.max(qy, 0);
      return Math.min(Math.max(qx, qy), 0) + Math.sqrt(ax * ax + ay * ay) - r;
    }
    var maxD = Math.min(hw, hh);
    for (var iy = 0; iy < cv.height; iy++) {
      for (var ix = 0; ix < cv.width; ix++) {
        var x = (ix / cv.width) * W - m - hw, y = (iy / cv.height) * H - m - hh;
        var d = sd(x, y), amt = 0;
        if (d < 0) {
          var u = 1 - Math.min(1, -d / maxD);
          amt = 0.32 * Math.pow(u, 1.25);
          if (d > -edge) { var t = (d + edge) / edge; amt += 0.85 * t * t * (3 - 2 * t); }
          amt = Math.min(1, amt);
        }
        var gx = 0, gy = 0;
        if (amt > 0) {
          var e = 0.8;
          gx = sd(x + e, y) - sd(x - e, y); gy = sd(x, y + e) - sd(x, y - e);
          var len = Math.sqrt(gx * gx + gy * gy) || 1; gx /= len; gy /= len;
        }
        var gxDome = 0;
        if (d < 0) {
          var nx = Math.max(-1, Math.min(1, x / hw));
          var dome = nx * Math.pow(Math.abs(nx), 0.6);
          var dyE = Math.max(0, hh - Math.abs(y));
          var vMod = 0.25 + 0.75 * Math.pow(1 - Math.min(1, dyE / hh), 1.4);
          gxDome = 0.5 * dome * vMod;
        }
        var o = (iy * cv.width + ix) * 4;
        px[o] = Math.max(0, Math.min(255, 128 - (gx * amt + gxDome) * 127));
        px[o + 1] = Math.max(0, Math.min(255, 128 - gy * amt * 127));
        px[o + 2] = 128; px[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return cv.toDataURL();
  }
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;pointer-events:none';
  var defs = document.createElementNS(NS, 'defs'); svg.appendChild(defs); document.body.appendChild(svg);
  var f = document.createElementNS(NS, 'filter');
  f.setAttribute('id', 'portfolio-glass'); f.setAttribute('filterUnits', 'userSpaceOnUse');
  f.setAttribute('color-interpolation-filters', 'sRGB');
  var feImg = document.createElementNS(NS, 'feImage'); feImg.setAttribute('result', 'map'); f.appendChild(feImg);
  var CH = [['dR', '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0', 1 - CHROMA],
            ['dG', '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0', 1],
            ['dB', '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0', 1 + CHROMA]];
  var disps = [];
  CH.forEach(function (ch) {
    var fd = document.createElementNS(NS, 'feDisplacementMap');
    fd.setAttribute('in', 'SourceGraphic'); fd.setAttribute('in2', 'map');
    fd.setAttribute('xChannelSelector', 'R'); fd.setAttribute('yChannelSelector', 'G');
    fd.setAttribute('scale', String(Math.round(SCALE * ch[2]))); fd.setAttribute('result', ch[0] + 'raw');
    f.appendChild(fd); disps.push(fd);
    var fm = document.createElementNS(NS, 'feColorMatrix');
    fm.setAttribute('in', ch[0] + 'raw'); fm.setAttribute('type', 'matrix');
    fm.setAttribute('values', ch[1]); fm.setAttribute('result', ch[0]); f.appendChild(fm);
  });
  function mkComp(a, b, result) {
    var fc = document.createElementNS(NS, 'feComposite');
    fc.setAttribute('in', a); fc.setAttribute('in2', b); fc.setAttribute('operator', 'arithmetic');
    fc.setAttribute('k1', '0'); fc.setAttribute('k2', '1'); fc.setAttribute('k3', '1'); fc.setAttribute('k4', '0');
    if (result) fc.setAttribute('result', result);
    f.appendChild(fc);
  }
  mkComp('dR', 'dG', 'dRG'); mkComp('dRG', 'dB');
  defs.appendChild(f);
  var key = '';
  function fit() {
    var w = Math.round(el.clientWidth), h = Math.round(el.clientHeight);
    if (!w || !h) return;
    var m = Math.ceil(SCALE * (1 + CHROMA) / 2) + 6;
    f.setAttribute('x', String(-m)); f.setAttribute('y', String(-m));
    f.setAttribute('width', String(w + m * 2)); f.setAttribute('height', String(h + m * 2));
    feImg.setAttribute('x', String(-m)); feImg.setAttribute('y', String(-m));
    feImg.setAttribute('width', String(w + m * 2)); feImg.setAttribute('height', String(h + m * 2));
    var k = w + 'x' + h;
    if (k !== key) { key = k; feImg.setAttribute('href', lensMapURL(w, h, Math.min(26, h / 2), EDGE, m)); }
    el.style.backdropFilter = 'url(#portfolio-glass) saturate(1.35)';
    el.style.webkitBackdropFilter = el.style.backdropFilter;
  }
  var raf = 0;
  new ResizeObserver(function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); }).observe(el);
  fit();
})();
