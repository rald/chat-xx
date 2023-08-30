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

export default Term 
