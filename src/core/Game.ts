import { config } from "../config"
import { es } from "../utils"

export default class Game implements kk.Canvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  scene?: kk.Canvas
  runLoop: boolean
  loopTimeId: number | null
  w: number
  h: number
  constructor(selector: string) {
    this.canvas = es(selector) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.w = this.canvas.width
    this.h = this.canvas.height
  }

  update() {
    if (this.scene) {
      this.scene.update()
    }
  }

  draw() {
    if (this.scene) {
      this.scene.draw()
    }
  }

  // 一步步来
  step() {
    // 更新数据
    this.update()
    // 绘制
    this.draw()
  }

  run() {
    if (this.runLoop) return
    this.runLoop = true
    const loop = () => {
      if (this.runLoop) {
        this.loopTimeId = setTimeout(() => {
          this.step()
          loop()
        }, 1000 / config.fps);
      }
    }
    loop()
  }

  stop() {
    this.runLoop = false
    this.loopTimeId && clearTimeout(this.loopTimeId)
    this.loopTimeId = null
  }

  // 装载场景
  load(scene: kk.Canvas) {
    this.reset()
    this.scene = scene
  }

  reset() {
    this.ctx.clearRect(0, 0, this.w, this.h)
  }
}