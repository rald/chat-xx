import * from './calc.mjs'

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

export default Touch
