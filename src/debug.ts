import { descriptions, config } from './config'
import { es } from './utils'

export const debug = (selector: string) => {
  const elem = es(selector)
  let html = ''
  descriptions.forEach(v => {
    html += `<div><label><input class="auto_slider" max="${v.max}" min="${v.min}" type="${v.type}" data-value="${v.name}">${v.show} : <span class="kk_label">${v.value}</span></label></div>`
  })
  elem!.innerHTML = html

  descriptions.forEach(v => {
    const input = es(`input[data-value=${v.name}]`) as HTMLInputElement
    const value = input.valueAsNumber
    config[v.name] = value
    const label = input.closest('label')!.querySelector('.kk_label')
    label!.innerHTML = input.value
  })
  
}
