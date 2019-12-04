export default {
  fps: 500,
  dieColor: '#3e3e3e',
  liveColor: '#ff0000',
  // 值越大, 生成的越多
  threshold: 50
}

interface Config {
  name: string
  show: string
  type: 'range'
  min: number
  max: number
  value: number
}

type LiteralUnion<T extends F, F = string> = T | (F & {});

type KeyUnion<T> = LiteralUnion<Extract<keyof T, string>>;

interface Answers extends Record<string, any> { }

interface Question<T extends Answers = Answers> {
  name: KeyUnion<T>
  show: string
  type: string
  value: number
  min: number
  max: number
}

interface RangeQuestion<T extends Answers = Answers> extends Question<T> {
  type: 'input'
}

interface QuestionMap<T extends Answers = Answers> {
  range: RangeQuestion<T>
}

type DistinctConfig<T extends Answers = Answers> = QuestionMap<T>[keyof QuestionMap<T>]

type QuestionCollection<T extends Answers = Answers> =
        | DistinctConfig<T>
        | ReadonlyArray<DistinctConfig<T>>

// function createConfig<T> (configs: QuestionCollection<T>): T {
//   // 为毛这里不能 识别出configs ?
// }

export const config = [
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
    value: 400,
    min: 100,
    max: 2500,
    type: 'range'
  }
]



// export const kkConfig = createConfig(config)

// 如何取出数组里面每个