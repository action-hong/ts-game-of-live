import { config } from './config'

export const es = (e: string) => document.querySelector(e)

export const esa = (e: string) => document.querySelectorAll(e)

export const bindAll = (e: string, event: keyof HTMLElementEventMap, callback: (e: Event) => void) => {
  const all = esa(e) as NodeListOf<HTMLInputElement>
  all.forEach(ele => {
    ele.addEventListener(event, callback)
  })
}

export const random = () => Math.random() * 100 < config.thresold ? 1 : 0