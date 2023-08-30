//  ----------------------
//  --- Calc Functions ---
//  ----------------------

const doc = document
const body = doc.body
const PI = Math.PI
const d2r = PI / 180.0
const r2d = 180 / PI
const sqrt = (x) => Math.sqrt(x)
const rnd = (x) => Math.round(x)
const abs = (x) => Math.abs(x)
const sgn = (x) => x < 0 ? -1 : x > 0 ? 1 : 0
const ceil = (x) => Math.ceil(x)
const flr = (x) => Math.floor(x)
const trc = (x) => Math.trunc(x)
const clamp = (x, b, e) => x <= b ? b : x >= e ? e : x
const say = (x) => doc.write(x + '<br>')
const ask = (m) => window.prompt(m)
const sayl = (x) => console.log(x)
const str = (n, b = 10) => n.toString(b)
const pars = (s, b) => parseInt(s, b)
const pflt = (s) => parseFloat(s)
const ran = (x) => flr(Math.random() * x)
const ranr = (b, e) => rnd(flr(e) - flr(b) + 1) + flr(b)
const div = (x, y) => flr(x / y)
const mod = (x, y) => flr(x % y)
const chr = (c) => String.fromCharCode(c)
const ord = (s, i = 0) => s.charCodeAt(i)
const sin = (x) => Math.sin(x)
const cos = (x) => Math.cos(x)
const tan = (x) => Math.tan(x)
const log = (x) => Math.log(x)
const base = (x, y) => log(y) / log(x)
const make = (e) => doc.createElement(e)
const append = (o, e) => o.append(e)
const ani = f => window.requestAnimationFrame(f)
const sint = (f, t) => window.setInterval(f, t)
const sout = (f, t) => window.setTimeout(f, t)
const fac = (n) => { let r = n; if (n === 0 || n === 1) return 1; while (n > 1) { n--; r *= n } return r }
const nPr = (n, r) => fac(n) / fac(n - r)
const nCr = (n, r) => fac(n) / fac(r) * fac(n - r)
const perp = (n, N) => (n / N) * 100
const pern = (p, N) => (p * N) / 100
const trim = (s) => s.trim()
const mxm = (a) => { let l = a[0]; for (let i = 1; i < a.length; i++) if (l < a[i]) l = a[i]; return l }
const mnm = (a) => { let l = a[0]; for (let i = 1; i < a.length; i++) if (l > a[i]) l = a[i]; return l }
const sum = (a) => { return a.reduce((b, c) => b + c, 0) }

// --------------------------
// --- graphics functions ---
// --------------------------

const gctx = (c) => c.getContext('2d')
const txt = (c, t, x, y, f) => { c.fillStyle = f; c.fillText(t, x, y) }
const pset = (c, x, y, s, f) => { c.fillStyle = f; c.fillRect(x * s, y * s, s, s) }
const pget = (c, x, y) => { const d = c.getImageData(); return new Color(d.data[0], d.data[1], d.data[2], d.data[3]) }
const clear = (c, f) => { c.fillStyle = f; c.fillRect(0, 0, c.canvas.width, c.canvas.height) }
const rgba = (c) => `rgba(${c.r},${c.g},${c.b},${c.a})`
const line = (c, x0, y0, x1, y1, s) => { c.beginPath(); c.strokeStyle = s; c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.closePath() }
const rect = (c, x, y, w, h, s) => { c.beginPath(); c.strokeStyle = s; c.rect(x, y, w, h); c.stroke(); c.closePath() }
const circ = (c, x, y, r, s) => { c.beginPath(); c.strokeStyle = s; c.arc(x, y, r, 0, Math.PI * 2); c.stroke(); c.closePath() }
const inrect = (x, y, rx, ry, rw, rh) => x >= rx && x <= rx + rw && y >= ry && y <= ry + rw
const incirc = (x, y, rx, ry, rr) => x * x - y * y <= rr * rr
const dist = (x0, y0, x1, y1) => { const dx = x1 - x0; const dy = y1 - y0; return sqrt(dx * dx + dy * dy) }
const frect = (c, x, y, w, h, f) => { c.fillStyle = f; c.fillRect(x, y, w, h) }
