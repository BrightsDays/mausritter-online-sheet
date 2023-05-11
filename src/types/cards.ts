import { Stats } from './character'
import { BodyIndexes, Condition, HirelingBody, HirelingPack, Item, ItemType, PackIndexes } from './inventory'

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
  warband: string | null
}

export interface SimpleCard {
  index?: number
  name?: string
  level: number
  exp: number
  stats: Stats
  bodyBack: HirelingBody
  packBack: HirelingPack
  details?: string
}

export interface CardCell {
  name: 'Main Paw' | 'Second Paw' | 'Main Body' | 'Second Body' | '1' | '2' | '3' | '4' | '5' | '6'
  item: Item | Condition | null
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