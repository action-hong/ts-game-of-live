import config from './config'

const random = () => Math.random() * 100 < config.threshold ? 1 : 0

const cellColors = [config.dieColor, config.liveColor]

const calFuncTime = function (func: Function) {
  let time = new Date().getTime()
  func()
  return new Date().getTime() - time
}

type CellState = 1 | 0

export class Cell {
  private x: number
  private y: number
  constructor(
    private ctx: CanvasRenderingContext2D,
    private cg: CellGroup,
    public state: CellState,
    private row: number, // 第几行
    private col: number, // 第几列
    private w: number,
    private h: number,
    private preState: CellState | null = null
  ) {
    this.x = col * w
    this.y = row * h
  }

  changeState(state: CellState) {
    this.preState = this.state
    this.state = state
  }

  update() {
    this.cg.liveCell += this.state
  }

  draw() {
    if (this.state === this.preState) return
    this.cg.roundDraw++
    this.ctx.fillStyle = cellColors[this.state]
    this.ctx.fillRect(this.x, this.y, this.w - 1, this.h - 1)
  }
}

// 整个集合
export class CellGroup {
  // 第几行, 第几列
  cells: Array<Array<Cell>> = []
  private cellW: number
  private cellH: number
  // 每回合绘制的个数
  roundDraw = 0
  // 活着的
  liveCell = 0
  // 当前回合
  round = 0
  constructor(
    private ctx: CanvasRenderingContext2D,
    private row: number,
    private col: number,
    private width: number,
    private height: number
  ) {
    this.cellW = this.width / this.col
    this.cellH = this.height / this.row
    for (let i = 0; i < this.row; i++) {
      const arr: Array<Cell> = []
      for (let j = 0; j < this.col; j++) {
        arr.push(new Cell(this.ctx, this, random(), i, j, this.cellW, this.cellH))
      }
      this.cells.push(arr)
    }
  }

  draw() {
    this.round++
    console.log(`第${this.round}回合`)
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.cells[i][j].draw()
      }
    }
    // const msg = this.cells.map(items => {
    //   return '\n' + items.map(({ state }) => {
    //     return state === 1 ? 'o' : 'x'
    //   }).join(' | ') + '\n' + items.map(_ => '_').join('   ')
    // }).join('\n')
    // console.log(msg)
  }

  nextRound() {
    this.liveCell = 0
    // 计算每个点下一轮的命运
    const nexStates: CellState[][] = []
    for (let i = 0; i < this.row; i++) {
      let cs: CellState[] = []
      for (let j = 0; j < this.col; j++) {
        cs.push(this._nextState(i, j))
      }
      nexStates.push(cs)
    }
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.cells[i][j].changeState(nexStates[i][j])
      }
    }
  }

  /**
   * 判断该点下一个状态是死是活
   * 周围表示围着该点的8个点
   * 如果该点事活细胞, 且周围有2或3个活细胞, 则存活, 否则死
   * 如果该点是死洗过, 周围有3个细胞, 则活, 否则继续死
   * @param row 
   * @param col 
   */
  _nextState(row: number, col: number): CellState {
    const count = this._calAroundLive(row, col)
    if (this.cells[row][col].state === 1) {
      if (count === 3 || count === 2) return 1
      return 0
    } else if (count === 3) {
      return 1
    }
    return 0
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
      lr[col] && count++
      lr[col + 1] && lr[col + 1].state && count++
    }

    if (nr) {
      nr[col - 1] && nr[col - 1].state && count++
      nr[col] && count++
      nr[col + 1] && nr[col + 1].state && count++
    }

    cr[col - 1] && cr[col - 1].state && count++
    cr[col + 1] && cr[col + 1].state && count++

    return count
  }
}