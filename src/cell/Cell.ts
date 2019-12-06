import LiveScene from "../scene/LiveScene";
import config from '../config'

const cellColors = [config.dieColor, config.liveColor]

export default class Cell implements kk.Canvas {
  constructor (
    public scene: LiveScene,
    private nextState: kk.CellState, // 因为所有update需要依赖周围细胞的状态, 如果直接修改state, 那么下一个细胞其实就相当于依然下一回合的状态了
    public x: number,
    public y: number,
    public w: number,
    public row: number,
    public col: number,
    public state: kk.CellState | null = null,
  ) {}

  update() {
    if (this.state === null) return // 第一次
    // 更新状态
    this.nextState = this.scene.getNextState(this.row, this.col)
  }

  draw() {
    if (this.state === this.nextState) return
    this.state = this.nextState
    this.scene.ctx.fillStyle = cellColors[this.nextState]
    this.scene.ctx.fillRect(this.x, this.y, this.w, this.w)
  }
}