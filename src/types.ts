export interface Background {
  background: string,
  itemA: string,
  itemB: string
}

export interface Card {
  id: null | BodyIndexes | PackIndexes
  title: string
  stat?: null | 'd6' | 'd6/d8' | 'd10'
  image: string
  type?: null | ItemType
  description?: null | string
  clear?: null | string
  group: 'items' | 'conditions'
  used:  0 | 1 | 2 | 3
  hirelingIndex: string | null
}

export interface Condition {
  title: string
  description: string
  clear: string
  group: 'conditions'
}

export interface Item {
  title: string
  stat: '' | 'd6' | 'd6/d8' | 'd10'
  image: string
  type: ItemType
  group: 'items'
  used?:  0 | 1 | 2 | 3
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
  item: Item | Condition | null
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
  level: number
  exp: number
  stats: Stats
  bodyBack: HirelingBody
  packBack: HirelingPack
  details: string
}

export interface GritList {
  'grit__1': Grit,
  'grit__2': Grit,
  'grit__3': Grit
}

export interface Grit {
  name: string
  item: Condition | null
}

export interface Bank {
  name: string
  item: Item | null
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
  grit: GritList
  bank: Bank[]
}

export interface Popup {
  type: PopupTypes
}

export type BodyIndexes = 'Main Paw'| 'Main Body'| 'Second Paw'| 'Second Body'

export type PackIndexes = '1' | '2' | '3' | '4' | '5' | '6'

export type PopupTypes = 'new' | 'full' | 'addHireling' | 'levelUp' | null

export type StatKeys = 'str' | 'dex' | 'wil' | 'hp'

export type ValueKeys = 'exp' | 'pips' | 'startPips'

export type DescriptionKeys = 'name' | 'background' | 'birthSign' | 'coat' | 'details'

export type BackgroundKeys = 1 | 2 | 3 | 4 | 5 | 6

export type ItemType =
  '' |
  'Improvised' |
  'Light' |
  'Medium' |
  'Heavy' |
  'Light ranged' |
  'Heavy ranged' |
  'Light armor' |
  'Heavy armor' |
  'Ammunition' |
  'Utility'