import Scene from "../core/Scene";
import Game from "../core/Game";
import Cell from "../cell/Cell";
import { random } from "../utils";

// 标题栏高度50
const titleHeight = 50

export default class LiveScene extends Scene {
  cells: Cell[][] = []
  // 当前回合
  currentRound = 1
  // 总共的数
  cellCount = 0
  // 当前回合绘制数(如果是0的话, 显然就没必要再运行了)
  drawCount = 0
  cellW = 0
  constructor(
    public game: Game,
    public count: number
  ) {
    super(game)
    this.init()
  }
  init() {
    this.cellCount = this.count * this.count
    // 计算每个的宽度
    this.cellW = this.w / this.count
    for (let i = 0; i < this.count; i++) {
      const rows: Cell[] = []
      for (let j = 0; j < this.count; j++) {
        const cell = new Cell(
          this,
          random(),
          j * this.cellW,
          i * this.cellW + titleHeight,
          this.cellW - 1,
          i,
          j
        )
        rows.push(cell)
        this.addElement(cell)
      }
      this.cells.push(rows)
    }
  }

  update () {
    this.drawCount = 0
    super.update()
  }

  getNextState(row: number, col: number): kk.CellState {
    const count = this._calAroundLive(row, col)
    if (this.cells[row][col].state === 1) {
      if (count === 3 || count === 2) return 1
      return 0
    } else if (count === 3) {
      return 1
    }
    return 0
  }

  onClick(x: number, y: number) {
    // 找出各个点
    y -= titleHeight
    const row = Math.floor(y / this.cellW)
    const col = Math.floor(x / this.cellW)
    const cell = this.cells[row][col]
    cell.changeState()
  }

  /**
   * 计算该点周围有多少个活的
   * @param row 
   * @param col 
   */
  _calAroundLive(row: number, col: number): number {
    let count = 0
    const lr = this.cells[row - 1]
    const cr = this.cells[row]
    const nr = this.cells[row + 1]

    if (lr) {
      lr[col - 1] && lr[col - 1].state && count++
      lr[col].state && count++
      lr[col + 1] && lr[col + 1].state && count++
    }

    if (nr) {
      nr[col - 1] && nr[col - 1].state && count++
      nr[col].state && count++
      nr[col + 1] && nr[col + 1].state && count++
    }

    cr[col - 1] && cr[col - 1].state && count++
    cr[col + 1] && cr[col + 1].state && count++

    return count
  }
}