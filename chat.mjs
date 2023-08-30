import * from './calc.mjs'
import font from './font.mjs'
import Color from './Color.mjs'
import palette from './palette.mjs'
import Term from './Term.mjs'
import Pad from './Pad.mjs'

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

//  -------------------
//  --- End Program ---
//  -------------------

export default init;
