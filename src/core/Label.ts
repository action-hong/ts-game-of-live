import Game from "./Game";

export default class Label implements kk.Canvas {
  constructor(
    public game: Game,
    public title: string,
    public x: number,
    public y: number
  ) {}

  update() {

  }

  draw() {
    this.game.ctx.fillText(this.title, this.x, this.y)
  }
}