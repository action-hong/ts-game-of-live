import { config } from './config'
import { es } from './utils'
import { debug } from './debug'
import Game from './core/Game'
import LiveScene from './scene/LiveScene'

// const canvas: HTMLCanvasElement = es('#canvas') as HTMLCanvasElement
const generateBtn = es('#generate') as HTMLButtonElement
const nextBtn = es('#next') as HTMLButtonElement
const runBtn = es('#run') as HTMLButtonElement
const stopBtn = es('#stop') as HTMLButtonElement

const game = new Game('#canvas')

// 下一回合
function next() {
  game.step()
}

// 运行
function run() {
  game.run()
}

// 暂停
function stopGame() {
  game.stop()
}

// 生成
function generate() {
  game.stop()
  const scene = new LiveScene(game, config.count)
  game.load(scene)
  game.step()
}

debug('#config')

generateBtn.onclick = generate
nextBtn.onclick = next
runBtn.onclick = run
stopBtn.onclick = stopGame
