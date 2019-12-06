import Game from "./Game";

export default class Scene implements kk.Canvas {
  private elements: kk.Canvas[] = []
  w: number
  h: number
  ctx: CanvasRenderingContext2D
  constructor(public game: Game) {
    this.w = this.game.w
    this.h = this.game.h
    this.ctx = this.game.ctx
  }
  update() {
    this.elements.forEach(element => {
      element.update()
    })
  }  
  draw() {
    this.elements.forEach(element => {
      element.draw()
    })
  }

  addElement(ele: kk.Canvas) {
    this.elements.push(ele)
  }

  delElement(ele: kk.Canvas) {
    const idx = this.elements.indexOf(ele)
    if (idx !== -1) {
      this.elements.splice(idx, 1)
    }
  }

  onClick(x: number, y: number) {}
  
}