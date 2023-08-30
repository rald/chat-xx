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
    this.gx = 4
    this.gy = 4
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

export default Pad
