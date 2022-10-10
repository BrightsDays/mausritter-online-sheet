export enum ItemStat {
  Small = 'd6',
  Medium = 'd6/d8',
  None = ''
}

export enum ItemType {
  Improvised = 'Improvised',
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
  LightRanged = 'Light ranged',
  HeavyRanged = 'Heavy ranged',
  LightArmor = 'Light armor',
  HeavyArmor = 'Heavy armor',
  Ammunition = 'Ammunition',
  Utility = 'Utility'
}

export interface Background {
  background: string,
  itemA: string,
  itemB: string
}

export interface Condition {
  title: string
  description: string
  clear: string
  group: 'conditions'
}

export interface Item {
  title: string
  stat: ItemStat
  image: string
  type: ItemType
  group: 'items'
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

export interface CardCell {
  name: 'Main Paw' | 'Second Paw' | 'Main Body' | 'Second Body' | '1' | '2' | '3' | '4' | '5' | '6'
  item: string | null
  used: 0 | 1 | 2 | 3
}

export interface BodyBack {
  'Main Paw': CardCell,
  'Main Body': CardCell,
  'Second Paw': CardCell,
  'Second Body': CardCell
}

export interface StoreBodyBack {
  value: BodyBack
}

export interface PackBack {
  1: CardCell
  2: CardCell
  3: CardCell
  4: CardCell
  5: CardCell
  6: CardCell
}

export interface HirelingBody {
  'Main Paw': CardCell,
  'Second Paw': CardCell
}

export interface HirelingPack {
  1: CardCell
  2: CardCell
  3: CardCell
  4: CardCell
}

export interface Hireling {
  index: number
  name: string
  exp: number
  stats: Stats
  bodyBack: HirelingBody
  packBack: HirelingPack
  details: string
}

export interface Character {
  name: string
  exp: number
  stats: Stats
  startPips: number
  pips: number
  background: string
  bodyBack: BodyBack
  packBack: PackBack
  hirelings: Hireling[]
  birthSign: string
  coat: string
  details: string
  grit: number
}

export interface Popup {
  type: PopupTypes
}

export type BodyIndexes = 'Main Paw'| 'Main Body'| 'Second Paw'| 'Second Body'

export type PackIndexes = '1' | '2' | '3' | '4' | '5' | '6'

export type PopupTypes = 'new' | 'full' | 'addHireling' |null

export type StatKeys = 'str' | 'dex' | 'wil' | 'hp'

export type ValueKeys = 'exp' | 'pips' | 'startPips'

export type DescriptionKeys = 'name' | 'background' | 'birthSign' | 'coat' | 'details'

export type BackgroundKeys = 1 | 2 | 3 | 4 | 5 | 6