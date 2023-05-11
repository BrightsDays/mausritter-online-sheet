import { CardCell } from './cards'

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

export type BodyIndexes = 'Main Paw'| 'Main Body'| 'Second Paw'| 'Second Body'

export type PackIndexes = '1' | '2' | '3' | '4' | '5' | '6'

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
  'Utility' |
  'Heavy utility' |
  'Wide utility' |
  'Big utility'