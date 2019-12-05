import { CellGroup } from './core'
import { config } from './config'
import { es } from './utils'
import { debug } from './debug'

const canvas: HTMLCanvasElement = es('#canvas') as HTMLCanvasElement
const generateBtn = es('#generate') as HTMLButtonElement
const nextBtn = es('#next') as HTMLButtonElement
const runBtn = es('#run') as HTMLButtonElement
const stopBtn = es('#stop') as HTMLButtonElement

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
const w = canvas.width
const h = canvas.height

let runGame = false
let loopID: number | null = null
let cellGroup: CellGroup | null

// 绘制页面
function draw() {
  cellGroup!.draw()
}

// 下一回合
function next() {
  console.log('下一回合')
  cellGroup!.nextRound()
  draw()
}

// 运行
function run() {
  console.log('运行')
  if (runGame) return
  runGame = true
  const loop = () => {
    loopID = setTimeout(() => {
      next()
      runGame && loop()
    }, config.fps);
  }
  loop()
}

// 暂停
function stopGame() {
  console.log('暂停')
  loopID && clearTimeout(loopID)
  runGame = false
}

// 生成
function generate() {
  console.log('生成')
  ctx.clearRect(0, 0, w, h)
  cellGroup = new CellGroup(ctx, config.count, config.count, w, h)
  draw()
}

debug('#config')

generateBtn.onclick = generate
nextBtn.onclick = next
runBtn.onclick = run
stopBtn.onclick = stopGame
