// Generative zen ambience: no audio files. Everything is synthesised with the Web Audio API
// (soft drone, wind, hirajoshi-scale plucks and an occasional temple bowl) through a long reverb.
const NOTES = [293.66, 329.63, 349.23, 440, 466.16, 587.33, 659.25, 698.46]; // D hirajoshi, two octaves-ish

export function createZen() {
  let ctx = null, master = null, wet = null, dry = null, on = false, timer = 0, bowlTimer = 0, started = false;

  const impulse = (seconds, decay) => {
    const len = ctx.sampleRate * seconds, buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return buf;
  };

  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const reverb = ctx.createConvolver(); reverb.buffer = impulse(4.5, 2.6);
    wet = ctx.createGain(); wet.gain.value = .7; dry = ctx.createGain(); dry.gain.value = .55;
    reverb.connect(wet); wet.connect(master); dry.connect(master);
    const bus = ctx.createGain(); bus.connect(dry); bus.connect(reverb); // everything plays through the bus
    ctx._bus = bus;

    // drone: D2 + A2, slowly breathing
    [[73.42, .05], [110, .03], [146.83, .016]].forEach(([f, g], i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const gn = ctx.createGain(); gn.gain.value = g;
      const lfo = ctx.createOscillator(); lfo.frequency.value = .045 + i * .02;
      const lg = ctx.createGain(); lg.gain.value = g * .6;
      lfo.connect(lg); lg.connect(gn.gain); o.connect(gn); gn.connect(bus); o.start(); lfo.start();
    });

    // wind: band-passed noise that slowly sweeps
    const nb = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate), nd = nb.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource(); noise.buffer = nb; noise.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 520; bp.Q.value = .7;
    const wg = ctx.createGain(); wg.gain.value = .014;
    const l1 = ctx.createOscillator(); l1.frequency.value = .06; const l1g = ctx.createGain(); l1g.gain.value = 260;
    const l2 = ctx.createOscillator(); l2.frequency.value = .09; const l2g = ctx.createGain(); l2g.gain.value = .01;
    l1.connect(l1g); l1g.connect(bp.frequency); l2.connect(l2g); l2g.connect(wg.gain);
    noise.connect(bp); bp.connect(wg); wg.connect(bus); noise.start(); l1.start(); l2.start();
  }

  function pluck(freq, vel = 1) {
    const t = ctx.currentTime, g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2400;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16 * vel, t + .012); g.gain.exponentialRampToValueAtTime(.0008, t + 3.4);
    [['triangle', 1, 1], ['sine', 2, .35], ['sine', 3.01, .12]].forEach(([type, mult, amp]) => {
      const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq * mult;
      const og = ctx.createGain(); og.gain.value = amp; o.connect(og); og.connect(g); o.start(t); o.stop(t + 3.6);
    });
    g.connect(lp); lp.connect(ctx._bus);
  }
  function bowl() {
    const t = ctx.currentTime, g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09, t + .05); g.gain.exponentialRampToValueAtTime(.0005, t + 9);
    [[146.83, 1], [146.83 * 2.76, .25], [146.83 * 5.4, .08]].forEach(([f, a]) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const og = ctx.createGain(); og.gain.value = a; o.connect(og); og.connect(g); o.start(t); o.stop(t + 9.2);
    });
    g.connect(ctx._bus);
  }
  const pick = () => NOTES[Math.floor(Math.random() * NOTES.length)];
  function phrase() {
    if (!on) return;
    pluck(pick(), .6 + Math.random() * .6);
    if (Math.random() < .28) setTimeout(() => on && pluck(pick(), .5), 350 + Math.random() * 500);
    timer = setTimeout(phrase, 2600 + Math.random() * 4200);
  }
  function bowls() { if (!on) return; bowl(); bowlTimer = setTimeout(bowls, 22000 + Math.random() * 14000); }

  async function start() {
    if (!ctx) build();
    // browsers keep the context suspended until the visitor interacts with the page
    await Promise.race([ctx.resume().catch(() => {}), new Promise((r) => setTimeout(r, 250))]);
    if (ctx.state !== 'running') return false;
    on = true;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(.55, ctx.currentTime + 2.5);
    if (!started) { started = true; setTimeout(bowls, 1200); }
    else bowls();
    phrase();
    return true;
  }
  function stop() {
    on = false; clearTimeout(timer); clearTimeout(bowlTimer);
    if (!ctx) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    setTimeout(() => { if (!on) ctx.suspend(); }, 1400);
  }
  document.addEventListener('visibilitychange', () => {
    if (!ctx || !on) return;
    if (document.hidden) ctx.suspend(); else ctx.resume();
  });
  return { start, stop, isOn: () => on };
}
