export default {
  dieColor: '#3e3e3e',
  liveColor: '#ff0000'
}

interface Config<T extends string> {
  name: T
  show: string
  type: 'range'
  min: number
  max: number
  value: number
}

type ResultObject<T extends string> = {
  [K in T]: number
}

function generate<T extends string>(configs: Config<T>[]): ResultObject<T> {
  const obj = {} as ResultObject<T>
  configs.forEach(c => {
    obj[c.name] = c.value
  })
  return obj
}

function wrap<T extends string>(configs: Config<T>[]) {
  return configs
}

export const descriptions = wrap([
  {
    name: 'fps',
    show: '演变速度',
    type: 'range',
    value: 500,
    min: 10,
    max: 1000
  },
  {
    name: 'thresold',
    show: '生成细胞阈值',
    type: 'range',
    value: 50,
    min: 1,
    max: 100
  },
  {
    name: 'count',
    show: '生成细胞数',
    value: 20,
    min: 10,
    max: 50,
    type: 'range'
  }
])

export const config = generate(descriptions)

// 如何取出数组里面每个