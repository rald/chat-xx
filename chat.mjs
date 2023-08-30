import font from './font.mjs'

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

//  -------------------
//  --- Color Class ---
//  -------------------

class Color {
  constructor (r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }
}

//  ---------------------
//  --- Color Palette ---
//  ---------------------

// sweetie-16 color palette by GrafxKid
const pal = [
  new Color(26, 28, 44, 1),
  new Color(93, 39, 93, 1),
  new Color(177, 62, 83, 1),
  new Color(239, 125, 87, 1),
  new Color(255, 205, 117, 1),
  new Color(167, 240, 112, 1),
  new Color(56, 183, 100, 1),
  new Color(37, 113, 121, 1),
  new Color(41, 54, 111, 1),
  new Color(59, 93, 201, 1),
  new Color(65, 166, 246, 1),
  new Color(115, 239, 247, 1),
  new Color(244, 244, 244, 1),
  new Color(148, 176, 194.1),
  new Color(86, 108, 134, 1),
  new Color(51, 60, 87, 1)
]

//  ---------------------
//  --- Program Below ---
//  ---------------------

let ter = null
let pad = null

const dchr = (c, f, l, x, y, s, p) => {
  for (let j = 0; j < f.h; j++) {
    for (let i = 0; i < f.w; i++) {
      const k = f.p[l * f.w * f.h + j * f.w + i]
      if (k === 1) pset(c, i + x, j + y, s, p)
    }
  }
}

class Touch {
  static me
  constructor (canvas) {
    Touch.me = this
    Touch.me.canvas = canvas
    Touch.me.touches = null
    Touch.me.touchX = 0
    Touch.me.touchY = 0
    Touch.me.touchDown = 0
    canvas.addEventListener('touchstart', Touch.me.touchStart)
    canvas.addEventListener('touchmove', Touch.me.touchMove)
    canvas.addEventListener('touchend', Touch.me.touchEnd)
  }

  getPos (e, d) {
    Touch.me.touches = e.touches
    Touch.me.touchDown = 0
    if (Touch.me.touches.length > 0) {
      const r = Touch.me.canvas.getBoundingClientRect()
      Touch.me.touchX = Touch.me.touches[Touch.me.touches.length - 1].clientX - r.x
      Touch.me.touchY = Touch.me.touches[Touch.me.touches.length - 1].clientY - r.y
      Touch.me.touchDown = d
    }
  }

  touchStart (e) {
    Touch.me.getPos(e, 1)
  }

  touchMove (e) {
    Touch.me.getPos(e, 1)
  }

  touchEnd (e) {
    Touch.me.getPos(e, 0)
  }
}

// ------------------
// --- Term Class ---
// ------------------

class Term {
  constructor (font, w, h) {
    this.ps = 2
    this.font = font
    this.w = w
    this.h = h
    this.x = 0
    this.y = 0

    this.canvas = make('canvas')
    this.canvas.width = w * font.w * this.ps + 2
    this.canvas.height = h * font.h * this.ps + 2
    const tcx = flr((window.innerWidth - this.canvas.width) / 2)
    const tcy = 8

    this.canvas.style.position = 'absolute'
    this.canvas.style.left = `${tcx}px`
    this.canvas.style.top = `${tcy}px`

    append(body, this.canvas)

    this.ctx = gctx(this.canvas)

    clear(this.ctx, rgba(pal[0]))
    this.ctx.translate(0.5, 0.5)

    this.mem = new Uint8Array(w * h)
    for (let i = 0; i < this.mem.length; i++) this.mem[i] = 0
  }

  draw (ox, oy) {
    clear(this.ctx, rgba(pal[0]))

    for (let k = 0; k < this.mem.length; k++) {
      const i = k % this.w
      const j = flr(k / this.w)
      dchr(this.ctx, this.font, this.mem[j * this.w + i], i * this.font.w + ox, j * this.font.h + oy, this.ps, rgba(pal[6]))
    }

    rect(this.ctx, this.x * this.font.w * this.ps, this.y * this.font.h * this.ps, this.font.w * this.ps, this.font.h * this.ps, rgba(pal[6]))
  }
}

//  -----------------
//  --- Pad Class ---
//  -----------------

class Pad {
  constructor (ter) {
    this.ter = ter
    this.w = flr(320 / 16)
    this.h = flr(240 / 16)

    this.C = make('canvas')
    this.C.width = 320
    this.C.height = 240

    this.c = gctx(this.C)

    const tcx = (window.innerWidth - this.w * 16) / 2
    const tcy = 8 + 8 + 256

    this.C.style.position = 'absolute'
    this.C.style.left = `${tcx}px`
    this.C.style.top = `${tcy}px`

    append(body, this.C)

    this.t = new Touch(this.C)

    clear(this.c, rgba(pal[0]))
    this.c.translate(0.5, 0.5)

    this.x = 0
    this.y = 0
    this.m = 0
    this.sx = 28
    this.sy = 32
    this.gx = 2
    this.gy = 2
    this.ro = 5
    this.hd = 0
    this.ksh = 0
    this.kcl = 0
    this.kal = 0
    this.kfn = 0
    this.key = 0
    this.kp = 0

    this.b = [
      [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ENT'],
        ['SHF', 'TAB', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BCK'],
        ['CTL', 'ALT', 'FN', 'SPC', ',', '.', '/', 'FN', 'ALT', 'CTL'],
        ['LF', 'DN', 'UP', 'RT']
      ],

      [
        ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENT'],
        ['SHF', 'TAB', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BCK'],
        ['CTL', 'ALT', 'FN', 'SPC', ',', '.', '/', 'FN', 'ALT', 'CTL'],
        ['LF', 'DN', 'UP', 'RT']
      ],

      [
        ['ESC', '', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'BRK', 'BCK'],
        ['', '', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'INS', 'PUP'],
        ['"', '~', '_', '+', '{', '}', '|', ':', 'DEL', 'PDN'],
        ["'", '`', '-', '=', '[', ']', '\\', ';', 'HME', 'END'],
        ['CTL', 'ALT', 'FN', 'SPC', ',', '.', '/', 'FN', 'ALT', 'CTL'],
        ['LF', 'DN', 'UP', 'RT']
      ]
    ]
  }

  draw (ox, oy) {
    clear(this.c, rgba(pal[0]))

    for (let j = 0; j < this.b[this.m].length; j++) {
      const cx = flr((this.C.width - this.b[this.m][j].length * (this.sx + this.gx)) / 2)
      const cy = flr((this.C.height - this.b[this.m].length * (this.sy + this.gy)) / 2)
      for (let i = 0; i < this.b[this.m][j].length; i++) {
        const kk = this.b[this.m][j][i]

        if (trim(kk).length > 0) {
          if (
            (this.ksh === 1 && kk === 'SHF') ||
            (this.kcl === 1 && kk === 'CTL') ||
            (this.kal === 1 && kk === 'ALT')
          ) frect(this.c, (this.sx + this.gx) * i + ox + cx, (this.sy + this.gy) * j + oy + cy, this.sx, this.sy, rgba(pal[8]))

          if (this.t.touchDown) {
            if (inrect(this.t.touchX, this.t.touchY, (this.sx + this.gx) * i + ox + cx, (this.sy + this.gy) * j + oy + cy, this.sx, this.sy)) {
              this.kp = 1

              frect(this.c, (this.sx + this.gx) * i + ox + cx, (this.sy + this.gy) * j + oy + cy, this.sx, this.sy, rgba(pal[8]))

              if (this.hd === 0) {
                this.hd = 1
                this.key = ord(kk)
                if (kk === 'SHF') {
                  this.key = 0
                  this.m = this.m === 1 ? 0 : 1
                  this.ksh = 1 - this.ksh
                } else if (kk === 'CTL') {
                  this.key = 0
                  this.kcl = 1 - this.kcl
                } else if (kk === 'ALT') {
                  this.key = 0
                  this.kal = 1 - this.kal
                } else if (kk === 'FN') {
                  this.key = 0
                  this.m = this.m === 2 ? 0 : 2
                } else if (kk === 'LF') {
                  this.key = 0
                  if (this.ter.x > 0) {
                    this.ter.x--
                  } else if (this.ter.y > 0) {
                    this.ter.x = this.ter.w - 1
                    this.ter.y--
                  }
                } else if (kk === 'DN') {
                  this.key = 0
                  if (this.ter.y < this.ter.h - 1) {
                    this.ter.y++
                    if (this.ter.y > this.ter.h - 1) this.ter.y = this.ter.h - 1
                  }
                } else if (kk === 'UP') {
                  this.key = 0
                  if (this.ter.y > 0) this.ter.y--
                } else if (kk === 'RT') {
                  if (this.m === 1) this.m = 0
                  this.key = 0
                  this.ter.x++
                  if (this.ter.x > this.ter.w - 1) {
                    this.ter.y++
                    if (this.ter.y < this.ter.h - 1) {
                      this.ter.x = 0
                    } else {
                      this.ter.x = this.ter.w - 1
                      this.ter.y = this.ter.h - 1
                    }
                  }
                } else if (kk === 'SPC') {
                  this.key = 32
                  this.ter.mem[this.ter.y * this.ter.w + this.ter.x] = this.key

                  if (this.ter.x === this.ter.w - 1 && this.ter.y === this.ter.h - 1) {
                    this.ter.x = 0
                    this.ter.y = this.ter.h - 1
                    for (let ui = 0, uj = 16; uj < 256; ui++, uj++) {
                      this.ter.mem[ui] = this.ter.mem[uj]
                      this.ter.mem[uj] = 0
                    }
                  } else {
                    this.ter.x++
                    if (this.ter.x > this.ter.w - 1) {
                      this.ter.x = 0
                      if (this.ter.y < this.ter.h - 1) this.y++
                    }
                  }
                } else if (kk === 'TAB') {
                  this.key = 32

                  if (this.ter.x < this.ter.w - 2) {
                    this.ter.mem[this.ter.y * this.ter.w + this.ter.x] = this.key

                    this.ter.mem[this.ter.y * this.ter.w + this.ter.x + 1] = this.key

                    this.ter.x += 2
                  } else if (this.ter.y < this.ter.h - 1) {
                    this.ter.x = 0
                    this.ter.y++
                  } else {
                    this.ter.x = 0
                    for (let ui = 0, uj = 16; uj < 256; ui++, uj++) {
                      this.ter.mem[ui] = this.ter.mem[uj]
                      this.ter.mem[uj] = 0
                    }
                  }
                } else if (kk === 'ENT') {
                  this.key = 0
                  this.ter.x = 0
                  if (this.ter.y < this.ter.h - 1) {
                    this.ter.y++
                  } else {
                    for (let ui = 0, uj = 16; uj < 256; ui++, uj++) {
                      this.ter.mem[ui] = this.ter.mem[uj]
                      this.ter.mem[uj] = 0
                    }
                  }
                } else if (kk === 'BCK') {
                  if (this.ter.x > 0) {
                    this.ter.x--
                  } else if (this.ter.y > 0) {
                    this.ter.x = this.ter.w - 1
                    this.ter.y--
                  } else {
                    this.ter.x = 0
                    this.ter.y = 0
                  }
                  this.key = 32
                  this.ter.mem[this.ter.y * this.ter.w + this.ter.x] = this.key
                } else {
                  this.ter.mem[this.ter.y * this.ter.w + this.ter.x] = this.key

                  if (this.ter.x === this.ter.w - 1 && this.ter.y === this.ter.h - 1) {
                    this.ter.x = 0
                    this.ter.y = this.ter.h - 1
                    for (let ui = 0, uj = 16; uj < this.ter.mem.length; ui++, uj++) {
                      this.ter.mem[ui] = this.ter.mem[uj]
                      this.ter.mem[uj] = 0
                    }
                  } else {
                    this.ter.x++
                    if (this.ter.x > this.ter.w - 1) {
                      this.ter.x = 0
                      if (this.ter.y < this.ter.h - 1) this.ter.y++
                    }
                  }
                }
              }
            }
          } else {
            this.hd = 0
            this.key = ''
            this.kp = 0
          }

          rect(this.c, (this.sx + this.gx) * i + ox + cx, (this.sy + this.gy) * j + oy + cy, this.sx, this.sy, rgba(pal[6]))

          this.c.font = 'bold 12px sans'
          this.c.textAlign = 'center'
          this.c.textBaseline = 'middle'

          txt(this.c, kk, (this.sx + this.gx) * i + ox + cx + this.sx / 2, (this.sy + this.gy) * j + oy + cy + this.sy / 2, rgba(pal[6]))
        }
      }
    }
  }
}

const draw = () => {
  ter.draw(0, 0)
  pad.draw(0, 0)
  ani(draw)
}

const init = () => {
  body.style.background = rgba(pal[15])
  ter = new Term(font, 16, 16)
  pad = new Pad(ter)
  ani(draw)
}

init()

//  -------------------
//  --- End Program ---
//  -------------------
