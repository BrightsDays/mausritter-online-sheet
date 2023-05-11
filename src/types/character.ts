import { BodyBack, PackBack } from './inventory'
import { SimpleCard, Bank, GritList } from './cards'

export interface Character {
  name: string
  exp: number
  stats: Stats
  startPips: number
  pips: number
  background: string
  bodyBack: BodyBack
  packBack: PackBack
  hirelings: SimpleCard[]
  hirelingIndex?: number
  birthSign: string
  coat: string
  details: string
  grit: GritList
  bank: Bank[]
  portrait: string | null
  warband: SimpleCard | null
}

export interface Stats {
  str: {
    name: 'str'
    max: number,
    current: number
  },
  dex: {
    name: 'dex'
    max: number,
    current: number
  },
  wil: {
    name: 'wil'
    max: number,
    current: number
  },
  hp: {
    name: 'hp'
    max: number,
    current: number
  }
}

export interface Background {
  background: string,
  itemA: string,
  itemB: string
}

export interface ChangeStatEvent {
  stat: StatKeys
  maxValue: number
}

export type StatKeys = 'str' | 'dex' | 'wil' | 'hp'

export type ValueKeys = 'exp' | 'pips' | 'startPips'

export type DescriptionKeys = 'name' | 'background' | 'birthSign' | 'coat' | 'details'

export type BackgroundKeys = 1 | 2 | 3 | 4 | 5 | 6